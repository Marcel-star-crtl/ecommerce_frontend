import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../order/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';
import api from '../../api/api'; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { products: cartProducts, cartId } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  
  const subtotal = cartProducts?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0;
  const deliveryCost = 0; 
  const discount = 0; 
  const totalPay = subtotal + deliveryCost - discount;

  const CLOUDINARY_CLOUD_NAME = 'ddlhwv65t';

  const getCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) {
      console.log('No imageUrl provided');
      return '';
    }
    
    console.log('Processing imageUrl:', imageUrl);
    
    if (imageUrl.includes('res.cloudinary.com')) {
      console.log('Already a Cloudinary URL');
      return imageUrl;
    }
    
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 1];
    const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
    console.log('Constructed Cloudinary URL:', cloudinaryUrl);
    return cloudinaryUrl;
  };

  const getCheckoutItemImageUrl = (item) => {
    console.log('Checkout item data:', item); 
    
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      const firstImage = item.images[0];
      console.log('First image:', firstImage); 
      
      if (firstImage?.url) {
        return getCloudinaryUrl(firstImage.url);
      } else if (firstImage?.image) {
        return getCloudinaryUrl(firstImage.image);
      } else if (typeof firstImage === 'string') {
        return getCloudinaryUrl(firstImage);
      }
    } 
    
    if (item.image) {
      console.log('Using item.image:', item.image);
      return getCloudinaryUrl(item.image);
    }
    
    if (item.product?.images && Array.isArray(item.product.images) && item.product.images.length > 0) {
      const firstImage = item.product.images[0];
      console.log('Using product.images[0]:', firstImage);
      
      if (firstImage?.url) {
        return getCloudinaryUrl(firstImage.url);
      } else if (firstImage?.image) {
        return getCloudinaryUrl(firstImage.image);
      } else if (typeof firstImage === 'string') {
        return getCloudinaryUrl(firstImage);
      }
    }
    
    console.log('No valid image found, using fallback');
    return 'https://via.placeholder.com/80x80/f8f9fa/666666?text=No+Image';
  };

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    city: user?.city || '',
    address: user?.address || '',
    postalCode: user?.postalCode || '',
    paymentMethod: 'card', 
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    saveCard: false,
    acceptTerms: false
  });

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
          image: getCheckoutItemImageUrl(item) 
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
        },
        paymentMethod: formData.paymentMethod
      };
  
      const resultAction = await dispatch(createOrder(orderData));
      
      if (createOrder.fulfilled.match(resultAction)) {
        navigate('/checkout/success', { 
          state: { 
            orderId: resultAction.payload.orderId,
            amount: totalPay,
            paymentMethod: formData.paymentMethod
          } 
        });
      } else {
        throw new Error(resultAction.payload || 'Order creation failed');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert(error.message || 'Order failed. Please try again.');
    }
  };

  const updateQuantity = (productId, newQuantity) => {
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
          <div style={{
            padding: '40px',
            borderRight: '1px solid #e5e5e5'
          }}>
            <form onSubmit={handleSubmit}>
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
                    // borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden', 
                    padding: '0px' 
                  }}>
                    <img 
                      src={getCheckoutItemImageUrl(item)}
                      alt={item.name || item.title || 'Product'}
                      style={{
                        width: '80px',
                        height: '80px',
                        objectFit: 'cover', 
                        display: 'block'
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
                      {item.name || item.title || 'Shyneen Glow'}
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