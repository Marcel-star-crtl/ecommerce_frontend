import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../api/api'; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart products from Redux store
  const { products: cartProducts, cartId } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  
  // Calculate order totals
  const subtotal = cartProducts?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0;
  const deliveryCost = 0; // Free delivery
  const discount = 0; // No discount by default
  const totalPay = subtotal + deliveryCost - discount;

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    city: user?.city || '',
    address: user?.address || '',
    postalCode: user?.postalCode || '',
    paymentMethod: 'card', // Default to card payment
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    saveCard: false,
    acceptTerms: false
  });

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '',
        city: user.city || '',
        address: user.address || '',
        postalCode: user.postalCode || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.acceptTerms) {
//       alert('Please accept the terms and conditions');
//       return;
//     }
  
//     try {
//       const orderData = {
//         cartId,
//         products: cartProducts.map(item => ({
//           productId: item.id || item._id,
//           name: item.name || item.title,
//           quantity: item.quantity || 1,
//           price: item.price,
//           image: item.images?.[0]?.url || item.image
//         })),
//         totalAmount: totalPay,
//         currency: "USD",
//         shippingAddress: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           country: formData.country,
//           city: formData.city,
//           address: formData.address,
//           postalCode: formData.postalCode
//         },
//         paymentMethod: 'card' 
//       };
  
//       const response = await api.post('/orders/create-checkout-session', orderData);
      
//       if (response.data.url) {
//         window.location.href = response.data.url;
//       } else {
//         navigate('/checkout/success', { 
//           state: { 
//             orderId: response.data.orderId,
//             amount: totalPay
//           } 
//         });
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       alert(error.response?.data?.message || 'Payment failed. Please try again.');
//     }
//   };


const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
  
    try {
      const orderData = {
        cartId,
        products: cartProducts.map(item => ({
          productId: item.id || item._id,
          name: item.name || item.title,
          quantity: item.quantity || 1,
          price: item.price,
          image: item.images?.[0]?.url || item.image
        })),
        totalAmount: totalPay,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          address: formData.address,
          postalCode: formData.postalCode
        }
      };
  
      const response = await api.post('/orders/create-order', orderData);
      
      if (response.data.success) {
        // Redirect to success page for COD
        navigate('/checkout/success', { 
          state: { 
            orderId: response.data.orderId,
            amount: totalPay,
            paymentMethod: 'Cash on Delivery'
          } 
        });
      } else {
        throw new Error(response.data.message || 'Order creation failed');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert(error.response?.data?.message || 'Order failed. Please try again.');
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    // This would typically update the cart, but for checkout we'll just show current quantities
    console.log('Update quantity:', productId, newQuantity);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          minHeight: '100vh'
        }}>
          {/* Left Column - Form */}
          <div style={{
            padding: '40px',
            borderRight: '1px solid #e5e5e5'
          }}>
            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '20px',
                  borderBottom: '1px solid #e5e5e5',
                  paddingBottom: '10px'
                }}>
                  Contact Information
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      placeholder="First name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      placeholder="Last name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px'
                }}>
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="Email"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="Phone Number"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Method */}
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '20px',
                  borderBottom: '1px solid #e5e5e5',
                  paddingBottom: '10px'
                }}>
                  Delivery Method
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px'
                }}>
                  <div>
                    <input 
                      type="text" 
                      placeholder="First Name"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="First Name"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Information */}
              <section style={{ marginBottom: '40px' }}>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: '20px',
                  borderBottom: '1px solid #e5e5e5',
                  paddingBottom: '10px'
                }}>
                  Shipping Information
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <input 
                      type="text" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange} 
                      placeholder="Country"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="city" 
                      value={formData.city} 
                      onChange={handleChange} 
                      placeholder="City"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px'
                }}>
                  <div>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder="Address"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="postalCode" 
                      value={formData.postalCode} 
                      onChange={handleChange} 
                      placeholder="Postal Code"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section style={{ marginBottom: '30px' }}>
                {/* Payment Method Selection */}
                <section style={{ marginBottom: '30px' }}>
                <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '20px',
                    borderBottom: '1px solid #e5e5e5',
                    paddingBottom: '10px'
                }}>
                    Payment Method
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: formData.paymentMethod === 'cod' ? '#f8f9ff' : 'white'
                    }}>
                    <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={formData.paymentMethod === 'cod'} 
                        onChange={handleChange}
                        style={{ marginRight: '10px' }}
                    />
                    <span style={{ fontWeight: '500' }}>Cash on Delivery</span>
                    </label>
                </div>
                
                {formData.paymentMethod === 'cod' && (
                    <div style={{
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px',
                    marginBottom: '20px'
                    }}>
                    <p style={{ margin: 0, color: '#666' }}>
                        You'll pay when you receive your order
                    </p>
                    </div>
                )}
                </section>

                {/* Card Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <input 
                      type="text" 
                      name="cardNumber" 
                      value={formData.cardNumber} 
                      onChange={handleChange} 
                      placeholder="Card Number"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="cardName" 
                      value={formData.cardName} 
                      onChange={handleChange} 
                      placeholder="Cardholder Full Name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div>
                    <input 
                      type="text" 
                      name="cardExpiry" 
                      value={formData.cardExpiry} 
                      onChange={handleChange} 
                      placeholder="MM/YY"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      name="cardCvv" 
                      value={formData.cardCvv} 
                      onChange={handleChange} 
                      placeholder="CVV"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                    />
                  </div>
                </div>
                
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}>
                  
                  login to save card information for next orders
                </label>
              </section>

              {/* Terms and Conditions */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer'
                }}>
                  <input 
                    type="checkbox" 
                    name="acceptTerms" 
                    checked={formData.acceptTerms} 
                    onChange={handleChange}
                    required
                    style={{ marginRight: '8px', marginTop: '2px' }}
                  />
                  <span>
                    By proceeding I accept the{' '}
                    <a href="#" style={{ color: '#e91e63', textDecoration: 'none' }}>
                      Terms & Conditions
                    </a>
                  </span>
                </label>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '40px 30px'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '30px'
            }}>
              Order Summary
            </h2>
            
            {/* Product Items */}
            <div style={{ marginBottom: '30px' }}>
              {cartProducts.map((item, index) => (
                <div key={item.id || index} style={{
                  display: 'flex',
                  gap: '15px',
                  marginBottom: '20px',
                  paddingBottom: '20px',
                  borderBottom: index < cartProducts.length - 1 ? '1px solid #e5e5e5' : 'none'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}
                      alt={item.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333',
                      margin: '0 0 5px 0'
                    }}>
                      {item.name || 'Shyneen Glow'}
                    </h3>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: '0 0 5px 0',
                      lineHeight: '1.3'
                    }}>
                      {item.description || 'Celestial Nightly Skin Repair for firming, Hydrating and Restoring'}
                    </p>
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: '0 0 10px 0'
                    }}>
                      Size: {item.size || '1 oz/30 mL'}
                    </p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          style={{
                            width: '20px',
                            height: '20px',
                            border: '1px solid #ddd',
                            backgroundColor: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '2px'
                          }}
                        >
                          −
                        </button>
                        <span style={{
                          fontSize: '12px',
                          minWidth: '15px',
                          textAlign: 'center',
                          fontWeight: '500'
                        }}>
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          style={{
                            width: '20px',
                            height: '20px',
                            border: '1px solid #ddd',
                            backgroundColor: 'white',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '2px'
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <button style={{
                          background: 'none',
                          border: 'none',
                          color: '#e91e63',
                          fontSize: '12px',
                          cursor: 'pointer',
                          padding: '2px 8px',
                          borderRadius: '2px'
                        }}>
                          REMOVE
                        </button>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          ${(item.price || 65).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div style={{
              borderTop: '1px solid #e5e5e5',
              paddingTop: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Subtotal</span>
                <span style={{ fontSize: '14px', color: '#333' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Delivery Cost</span>
                <span style={{ fontSize: '14px', color: '#333' }}>${deliveryCost.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Discount</span>
                <span style={{ fontSize: '14px', color: '#333' }}>${discount.toFixed(2)}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '15px',
                borderTop: '1px solid #e5e5e5'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>Total Pay</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>${totalPay.toFixed(2)}</span>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#E8A5C4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#E8A5C4'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
            >
              Pay Now
            </button>
            
            {/* Terms and Conditions */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  fontSize: '14px',
                  color: '#666',
                  cursor: 'pointer',
                  marginTop: '15px'
                }}>
                  <input 
                    type="checkbox" 
                    name="acceptTerms" 
                    checked={formData.acceptTerms} 
                    onChange={handleChange}
                    required
                    style={{ marginRight: '8px', marginTop: '2px' }}
                  />
                  <span>
                    By proceeding I accept the{' '}
                    <a href="#" style={{ color: '#E8A5C4', textDecoration: 'none' }}>
                      Terms & Conditions
                    </a>
                  </span>
                </label>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import api from '../../api/api';

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Get cart products from Redux store
//   const { products: cartProducts, cartId } = useSelector((state) => state.cart);
//   const user = useSelector((state) => state.auth.user);
  
//   // Calculate order totals
//   const subtotal = cartProducts?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0;
//   const deliveryCost = 0; // Free delivery
//   const discount = 0; // No discount by default
//   const totalPay = subtotal + deliveryCost - discount;

//   const [formData, setFormData] = useState({
//     firstName: user?.firstName || '',
//     lastName: user?.lastName || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     country: user?.country || '',
//     city: user?.city || '',
//     address: user?.address || '',
//     postalCode: user?.postalCode || '',
//     paymentMethod: 'card', // Default to card payment
//     cardNumber: '',
//     cardName: '',
//     cardExpiry: '',
//     cardCvv: '',
//     saveCard: false,
//     acceptTerms: false
//   });

//   // Pre-fill user data if available
//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         firstName: user.firstName || '',
//         lastName: user.lastName || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         country: user.country || '',
//         city: user.city || '',
//         address: user.address || '',
//         postalCode: user.postalCode || ''
//       }));
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.acceptTerms) {
//       alert('Please accept the terms and conditions');
//       return;
//     }

//     try {
//       // Prepare order data
//       const orderData = {
//         cartId,
//         products: cartProducts.map(item => ({
//           productId: item.id || item._id,
//           name: item.name || item.title,
//           quantity: item.quantity || 1,
//           price: item.price,
//           image: item.images?.[0]?.url || item.image
//         })),
//         totalAmount: totalPay,
//         currency: "USD",
//         shippingAddress: {
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           email: formData.email,
//           phone: formData.phone,
//           country: formData.country,
//           city: formData.city,
//           address: formData.address,
//           postalCode: formData.postalCode
//         },
//         paymentMethod: formData.paymentMethod
//       };

//       // Call your payment endpoint
//       const response = await api.post('/api/orders/create-checkout-session', orderData);
      
//       if (response.data.url) {
//         // Redirect to payment gateway
//         window.location.href = response.data.url;
//       } else {
//         // Handle direct payment success
//         navigate('/checkout/success', { 
//           state: { 
//             orderId: response.data.orderId,
//             amount: totalPay
//           } 
//         });
//       }
//     } catch (error) {
//       console.error('Payment error:', error);
//       alert(error.response?.data?.message || 'Payment failed. Please try again.');
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f8f9fa',
//       padding: '20px',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         overflow: 'hidden',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 400px',
//           minHeight: '100vh'
//         }}>
//           {/* Left Column - Form */}
//           <div style={{
//             padding: '40px',
//             borderRight: '1px solid #e5e5e5'
//           }}>
//             <form onSubmit={handleSubmit}>
//               {/* Contact Information */}
//               <section style={{ marginBottom: '40px' }}>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: '600',
//                   color: '#333',
//                   marginBottom: '20px',
//                   borderBottom: '1px solid #e5e5e5',
//                   paddingBottom: '10px'
//                 }}>
//                   Contact Information
//                 </h2>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="firstName" 
//                       value={formData.firstName} 
//                       onChange={handleChange} 
//                       placeholder="First name"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="lastName" 
//                       value={formData.lastName} 
//                       onChange={handleChange} 
//                       placeholder="Last name"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="email" 
//                       name="email" 
//                       value={formData.email} 
//                       onChange={handleChange} 
//                       placeholder="Email"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="tel" 
//                       name="phone" 
//                       value={formData.phone} 
//                       onChange={handleChange} 
//                       placeholder="Phone Number"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//               </section>

//               {/* Shipping Information */}
//               <section style={{ marginBottom: '40px' }}>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: '600',
//                   color: '#333',
//                   marginBottom: '20px',
//                   borderBottom: '1px solid #e5e5e5',
//                   paddingBottom: '10px'
//                 }}>
//                   Shipping Information
//                 </h2>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="country" 
//                       value={formData.country} 
//                       onChange={handleChange} 
//                       placeholder="Country"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="city" 
//                       value={formData.city} 
//                       onChange={handleChange} 
//                       placeholder="City"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="address" 
//                       value={formData.address} 
//                       onChange={handleChange} 
//                       placeholder="Address"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="postalCode" 
//                       value={formData.postalCode} 
//                       onChange={handleChange} 
//                       placeholder="Postal Code"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//               </section>

//               {/* Payment Method */}
//               <section style={{ marginBottom: '30px' }}>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: '600',
//                   color: '#333',
//                   marginBottom: '20px',
//                   borderBottom: '1px solid #e5e5e5',
//                   paddingBottom: '10px'
//                 }}>
//                   Payment Method
//                 </h2>
                
//                 {/* Payment Options */}
//                 <div style={{ marginBottom: '20px' }}>
//                   <label style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '15px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     marginBottom: '10px',
//                     cursor: 'pointer',
//                     backgroundColor: formData.paymentMethod === 'card' ? '#f8f9ff' : 'white'
//                   }}>
//                     <input 
//                       type="radio" 
//                       name="paymentMethod" 
//                       value="card" 
//                       checked={formData.paymentMethod === 'card'} 
//                       onChange={handleChange}
//                       style={{ marginRight: '10px' }}
//                     />
//                     <span style={{ fontWeight: '500' }}>Credit/Debit Card</span>
//                   </label>
//                 </div>

//                 {/* Card Details */}
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardNumber" 
//                       value={formData.cardNumber} 
//                       onChange={handleChange} 
//                       placeholder="Card Number"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardName" 
//                       value={formData.cardName} 
//                       onChange={handleChange} 
//                       placeholder="Cardholder Full Name"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardExpiry" 
//                       value={formData.cardExpiry} 
//                       onChange={handleChange} 
//                       placeholder="MM/YY"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardCvv" 
//                       value={formData.cardCvv} 
//                       onChange={handleChange} 
//                       placeholder="CVV"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
                
//                 <label style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   fontSize: '14px',
//                   color: '#666',
//                   cursor: 'pointer',
//                   marginBottom: '20px'
//                 }}>
//                   <input 
//                     type="checkbox" 
//                     name="saveCard" 
//                     checked={formData.saveCard} 
//                     onChange={handleChange}
//                     style={{ marginRight: '8px' }}
//                   />
//                   Save card information for next orders
//                 </label>
//               </section>

//               {/* Terms and Conditions */}
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{
//                   display: 'flex',
//                   alignItems: 'flex-start',
//                   fontSize: '14px',
//                   color: '#666',
//                   cursor: 'pointer'
//                 }}>
//                   <input 
//                     type="checkbox" 
//                     name="acceptTerms" 
//                     checked={formData.acceptTerms} 
//                     onChange={handleChange}
//                     required
//                     style={{ marginRight: '8px', marginTop: '2px' }}
//                   />
//                   <span>
//                     By proceeding I accept the{' '}
//                     <a href="#" style={{ color: '#E8A5C4', textDecoration: 'none' }}>
//                       Terms & Conditions
//                     </a>
//                   </span>
//                 </label>
//               </div>
//             </form>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div style={{
//             backgroundColor: '#f8f9fa',
//             padding: '40px 30px'
//           }}>
//             <h2 style={{
//               fontSize: '18px',
//               fontWeight: '600',
//               color: '#333',
//               marginBottom: '30px'
//             }}>
//               Order Summary
//             </h2>
            
//             {/* Product Items */}
//             <div style={{ marginBottom: '30px' }}>
//               {cartProducts?.map((item, index) => (
//                 <div key={item.id || index} style={{
//                   display: 'flex',
//                   gap: '15px',
//                   marginBottom: '20px',
//                   paddingBottom: '20px',
//                   borderBottom: index < cartProducts.length - 1 ? '1px solid #e5e5e5' : 'none'
//                 }}>
//                   <div style={{
//                     width: '80px',
//                     height: '80px',
//                     backgroundColor: 'white',
//                     borderRadius: '8px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexShrink: 0,
//                     overflow: 'hidden'
//                   }}>
//                     <img 
//                       src={item.images?.[0]?.url || item.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}
//                       alt={item.name}
//                       style={{
//                         width: '60px',
//                         height: '60px',
//                         objectFit: 'contain'
//                       }}
//                     />
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <h3 style={{
//                       fontSize: '14px',
//                       fontWeight: '500',
//                       color: '#333',
//                       margin: '0 0 5px 0'
//                     }}>
//                       {item.name || 'Product Name'}
//                     </h3>
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 5px 0',
//                       lineHeight: '1.3'
//                     }}>
//                       {item.description || 'Product description'}
//                     </p>
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 10px 0'
//                     }}>
//                       Qty: {item.quantity || 1}
//                     </p>
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between'
//                     }}>
//                       <span style={{
//                         fontSize: '14px',
//                         fontWeight: '600',
//                         color: '#333'
//                       }}>
//                         ${(item.price || 0).toFixed(2)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Totals */}
//             <div style={{
//               borderTop: '1px solid #e5e5e5',
//               paddingTop: '20px',
//               marginBottom: '30px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '12px'
//               }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Subtotal</span>
//                 <span style={{ fontSize: '14px', color: '#333' }}>${subtotal.toFixed(2)}</span>
//               </div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '12px'
//               }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Delivery Cost</span>
//                 <span style={{ fontSize: '14px', color: '#333' }}>${deliveryCost.toFixed(2)}</span>
//               </div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '20px'
//               }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Discount</span>
//                 <span style={{ fontSize: '14px', color: '#333' }}>${discount.toFixed(2)}</span>
//               </div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 paddingTop: '15px',
//                 borderTop: '1px solid #e5e5e5'
//               }}>
//                 <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>Total Pay</span>
//                 <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>${totalPay.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Pay Now Button */}
//             <button
//               onClick={handleSubmit}
//               style={{
//                 width: '100%',
//                 padding: '15px',
//                 backgroundColor: '#E8A5C4',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontSize: '16px',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.2s',
//                 marginBottom: '20px'
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
//               onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
//             >
//               Pay Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

















// import React, { useState } from 'react';

// const CheckoutPage = () => {
//   // Mock data for demonstration - replace with your actual data source
//   const cartProducts = [
//     {
//       id: 1,
//       name: 'Shyneen Glow',
//       description: 'Celestial Nightly Skin Repair for firming, Hydrating and Restoring',
//       size: '1 oz/30 mL',
//       price: 65.00,
//       quantity: 1,
//       image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
//     },
//     {
//       id: 2,
//       name: 'Shyneen Glow',
//       description: 'Celestial Nightly Skin Repair for firming, Hydrating and Restoring',
//       size: '1 oz/30 mL',
//       price: 65.00,
//       quantity: 1,
//       image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
//     },
//     {
//       id: 3,
//       name: 'Shyneen Glow',
//       description: 'Celestial
  
//   const [formData, setFormData] = useState({
//     firstName: userInfo?.firstName || user?.firstName || '',
//     lastName: userInfo?.lastName || user?.lastName || '',
//     email: userInfo?.email || user?.email || '',
//     phone: userInfo?.phone || user?.phone || '',
//     country: '',
//     city: '',
//     address: '',
//     postalCode: '',
//     paymentMethod: 'visa',
//     cardNumber: '',
//     cardName: '',
//     cardExpiry: '',
//     cardCvv: '',
//     saveCard: false,
//     acceptTerms: false
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.acceptTerms) {
//       alert('Please accept the terms and conditions');
//       return;
//     }
//     // Process payment and submit order
//     navigate('/checkout/success');
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     // This would typically update the cart, but for checkout we'll just show current quantities
//     console.log('Update quantity:', productId, newQuantity);
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f8f9fa',
//       padding: '20px',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//     }}>
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         backgroundColor: 'white',
//         borderRadius: '8px',
//         overflow: 'hidden',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr 400px',
//           minHeight: '100vh'
//         }}>
//           {/* Left Column - Form */}
//           <div style={{
//             padding: '40px',
//             borderRight: '1px solid #e5e5e5'
//           }}>
//             <form onSubmit={handleSubmit}>
//               {/* Contact Information */}
//               <section style={{ marginBottom: '40px' }}>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: '600',
//                   color: '#333',
//                   marginBottom: '20px',
//                   borderBottom: '1px solid #e5e5e5',
//                   paddingBottom: '10px'
//                 }}>
//                   Contact Information
//                 </h2>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="firstName" 
//                       value={formData.firstName} 
//                       onChange={handleChange} 
//                       placeholder="First name"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="lastName" 
//                       value={formData.lastName} 
//                       onChange={handleChange} 
//                       placeholder="Last name"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="email" 
//                       name="email" 
//                       value={formData.email} 
//                       onChange={handleChange} 
//                       placeholder="Email"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="tel" 
//                       name="phone" 
//                       value={formData.phone} 
//                       onChange={handleChange} 
//                       placeholder="Phone Number"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//               </section>

//               {/* Delivery Method */}
//               <section style={{ marginBottom: '40px' }}>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: '600',
//                   color: '#333',
//                   marginBottom: '20px',
//                   borderBottom: '1px solid #e5e5e5',
//                   paddingBottom: '10px'
//                 }}>
//                   Delivery Method
//                 </h2>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       placeholder="First Name"
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       placeholder="First Name"
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//               </section>

//               {/* Shipping Information */}
//               <section style={{ marginBottom: '40px' }}>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: '600',
//                   color: '#333',
//                   marginBottom: '20px',
//                   borderBottom: '1px solid #e5e5e5',
//                   paddingBottom: '10px'
//                 }}>
//                   Shipping Information
//                 </h2>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="country" 
//                       value={formData.country} 
//                       onChange={handleChange} 
//                       placeholder="Country"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="city" 
//                       value={formData.city} 
//                       onChange={handleChange} 
//                       placeholder="City"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="address" 
//                       value={formData.address} 
//                       onChange={handleChange} 
//                       placeholder="Address"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="postalCode" 
//                       value={formData.postalCode} 
//                       onChange={handleChange} 
//                       placeholder="Postal Code"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//               </section>

//               {/* Payment Method */}
//               <section style={{ marginBottom: '30px' }}>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: '600',
//                   color: '#333',
//                   marginBottom: '20px',
//                   borderBottom: '1px solid #e5e5e5',
//                   paddingBottom: '10px'
//                 }}>
//                   Payment Method
//                 </h2>
                
//                 {/* Payment Options */}
//                 <div style={{ marginBottom: '20px' }}>
//                   <label style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '15px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     marginBottom: '10px',
//                     cursor: 'pointer',
//                     backgroundColor: formData.paymentMethod === 'visa' ? '#f8f9ff' : 'white'
//                   }}>
//                     <input 
//                       type="radio" 
//                       name="paymentMethod" 
//                       value="visa" 
//                       checked={formData.paymentMethod === 'visa'} 
//                       onChange={handleChange}
//                       style={{ marginRight: '10px' }}
//                     />
//                     <span style={{ color: '#1a73e8', fontWeight: '500' }}>Visa</span>
//                   </label>
                  
//                   <label style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '15px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     marginBottom: '10px',
//                     cursor: 'pointer',
//                     backgroundColor: formData.paymentMethod === 'mastercard' ? '#f8f9ff' : 'white'
//                   }}>
//                     <input 
//                       type="radio" 
//                       name="paymentMethod" 
//                       value="mastercard" 
//                       checked={formData.paymentMethod === 'mastercard'} 
//                       onChange={handleChange}
//                       style={{ marginRight: '10px' }}
//                     />
//                     <span style={{ fontWeight: '500' }}>Master Card</span>
//                   </label>
                  
//                   <label style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     padding: '15px',
//                     border: '1px solid #ddd',
//                     borderRadius: '4px',
//                     cursor: 'pointer',
//                     backgroundColor: formData.paymentMethod === 'mastercard2' ? '#f8f9ff' : 'white'
//                   }}>
//                     <input 
//                       type="radio" 
//                       name="paymentMethod" 
//                       value="mastercard2" 
//                       checked={formData.paymentMethod === 'mastercard2'} 
//                       onChange={handleChange}
//                       style={{ marginRight: '10px' }}
//                     />
//                     <span style={{ fontWeight: '500' }}>Master Card</span>
//                   </label>
//                 </div>

//                 {/* Card Details */}
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardNumber" 
//                       value={formData.cardNumber} 
//                       onChange={handleChange} 
//                       placeholder="Card Number"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardName" 
//                       value={formData.cardName} 
//                       onChange={handleChange} 
//                       placeholder="Cardholder Full Name"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <div style={{
//                   display: 'grid',
//                   gridTemplateColumns: '1fr 1fr',
//                   gap: '15px',
//                   marginBottom: '15px'
//                 }}>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardExpiry" 
//                       value={formData.cardExpiry} 
//                       onChange={handleChange} 
//                       placeholder="MM/YY"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <input 
//                       type="text" 
//                       name="cardCvv" 
//                       value={formData.cardCvv} 
//                       onChange={handleChange} 
//                       placeholder="CVV"
//                       required
//                       style={{
//                         width: '100%',
//                         padding: '12px',
//                         border: '1px solid #ddd',
//                         borderRadius: '4px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         transition: 'border-color 0.2s'
//                       }}
//                     />
//                   </div>
//                 </div>
                
//                 <label style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   fontSize: '14px',
//                   color: '#666',
//                   cursor: 'pointer',
//                   marginBottom: '20px'
//                 }}>
//                   <input 
//                     type="checkbox" 
//                     name="saveCard" 
//                     checked={formData.saveCard} 
//                     onChange={handleChange}
//                     style={{ marginRight: '8px' }}
//                   />
//                   to save card information for next orders
//                 </label>
//               </section>

//               {/* Terms and Conditions */}
//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{
//                   display: 'flex',
//                   alignItems: 'flex-start',
//                   fontSize: '14px',
//                   color: '#666',
//                   cursor: 'pointer'
//                 }}>
//                   <input 
//                     type="checkbox" 
//                     name="acceptTerms" 
//                     checked={formData.acceptTerms} 
//                     onChange={handleChange}
//                     required
//                     style={{ marginRight: '8px', marginTop: '2px' }}
//                   />
//                   <span>
//                     By proceeding I accept the{' '}
//                     <a href="#" style={{ color: '#e91e63', textDecoration: 'none' }}>
//                       Terms & Conditions
//                     </a>
//                   </span>
//                 </label>
//               </div>
//             </form>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div style={{
//             backgroundColor: '#f8f9fa',
//             padding: '40px 30px'
//           }}>
//             <h2 style={{
//               fontSize: '18px',
//               fontWeight: '600',
//               color: '#333',
//               marginBottom: '30px'
//             }}>
//               Order Summary
//             </h2>
            
//             {/* Product Items */}
//             <div style={{ marginBottom: '30px' }}>
//               {cartProducts.map((item, index) => (
//                 <div key={item.id || index} style={{
//                   display: 'flex',
//                   gap: '15px',
//                   marginBottom: '20px',
//                   paddingBottom: '20px',
//                   borderBottom: index < cartProducts.length - 1 ? '1px solid #e5e5e5' : 'none'
//                 }}>
//                   <div style={{
//                     width: '80px',
//                     height: '80px',
//                     backgroundColor: 'white',
//                     borderRadius: '8px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     flexShrink: 0,
//                     overflow: 'hidden'
//                   }}>
//                     <img 
//                       src={item.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}
//                       alt={item.name}
//                       style={{
//                         width: '60px',
//                         height: '60px',
//                         objectFit: 'contain'
//                       }}
//                     />
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <h3 style={{
//                       fontSize: '14px',
//                       fontWeight: '500',
//                       color: '#333',
//                       margin: '0 0 5px 0'
//                     }}>
//                       {item.name || 'Shyneen Glow'}
//                     </h3>
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 5px 0',
//                       lineHeight: '1.3'
//                     }}>
//                       {item.description || 'Celestial Nightly Skin Repair for firming, Hydrating and Restoring'}
//                     </p>
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 10px 0'
//                     }}>
//                       Size: {item.size || '1 oz/30 mL'}
//                     </p>
//                     <div style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'space-between'
//                     }}>
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}>
//                         <button
//                           onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
//                           style={{
//                             width: '20px',
//                             height: '20px',
//                             border: '1px solid #ddd',
//                             backgroundColor: 'white',
//                             fontSize: '12px',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             borderRadius: '2px'
//                           }}
//                         >
//                           −
//                         </button>
//                         <span style={{
//                           fontSize: '12px',
//                           minWidth: '15px',
//                           textAlign: 'center',
//                           fontWeight: '500'
//                         }}>
//                           {item.quantity || 1}
//                         </span>
//                         <button
//                           onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
//                           style={{
//                             width: '20px',
//                             height: '20px',
//                             border: '1px solid #ddd',
//                             backgroundColor: 'white',
//                             fontSize: '12px',
//                             cursor: 'pointer',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             borderRadius: '2px'
//                           }}
//                         >
//                           +
//                         </button>
//                       </div>
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}>
//                         <button style={{
//                           background: 'none',
//                           border: 'none',
//                           color: '#e91e63',
//                           fontSize: '12px',
//                           cursor: 'pointer',
//                           padding: '2px 8px',
//                           borderRadius: '2px'
//                         }}>
//                           REMOVE
//                         </button>
//                         <span style={{
//                           fontSize: '14px',
//                           fontWeight: '600',
//                           color: '#333'
//                         }}>
//                           ${(item.price || 65).toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order Totals */}
//             <div style={{
//               borderTop: '1px solid #e5e5e5',
//               paddingTop: '20px',
//               marginBottom: '30px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '12px'
//               }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Subtotal</span>
//                 <span style={{ fontSize: '14px', color: '#333' }}>${subtotal.toFixed(2)}</span>
//               </div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '12px'
//               }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Delivery Cost</span>
//                 <span style={{ fontSize: '14px', color: '#333' }}>${deliveryCost.toFixed(2)}</span>
//               </div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '20px'
//               }}>
//                 <span style={{ fontSize: '14px', color: '#666' }}>Discount</span>
//                 <span style={{ fontSize: '14px', color: '#333' }}>${discount.toFixed(2)}</span>
//               </div>
//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 paddingTop: '15px',
//                 borderTop: '1px solid #e5e5e5'
//               }}>
//                 <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>Total Pay</span>
//                 <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>${totalPay.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Pay Now Button */}
//             <button
//               onClick={handleSubmit}
//               style={{
//                 width: '100%',
//                 padding: '15px',
//                 backgroundColor: '#e91e63',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 fontSize: '16px',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.2s'
//               }}
//               onMouseOver={(e) => e.target.style.backgroundColor = '#d81b60'}
//               onMouseOut={(e) => e.target.style.backgroundColor = '#e91e63'}
//             >
//               Pay Now
//             </button>
            
//             <div style={{
//               textAlign: 'center',
//               marginTop: '15px',
//               fontSize: '12px',
//               color: '#666'
//             }}>
//               By proceeding I accept the{' '}
//               <a href="#" style={{ color: '#e91e63', textDecoration: 'none' }}>
//                 Terms & Conditions
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;