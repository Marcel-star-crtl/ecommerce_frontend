import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../order/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';
import api, { mobileMoneyAPI } from '../../api/api'; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { products: cartProducts, cartId } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

    // Validate mobile money phone number
    if ((formData.paymentMethod === 'mobile_money_mtn' || formData.paymentMethod === 'mobile_money_orange') && !formData.phoneNumber) {
      alert('Please provide a phone number for mobile money payment');
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      let paymentResult = null;

      // Handle mobile money payment first
      if (formData.paymentMethod === 'mobile_money_mtn' || formData.paymentMethod === 'mobile_money_orange') {
        const provider = formData.paymentMethod === 'mobile_money_mtn' ? 'mtn' : 'orange';
        
        const paymentData = {
          amount: totalPay,
          phoneNumber: formData.phoneNumber,
          provider: provider,
          currency: 'XAF' // Default currency, can be made configurable
        };

        // Initiate mobile money payment
        const paymentResponse = await mobileMoneyAPI.initiate(paymentData);
        
        if (!paymentResponse.success) {
          throw new Error(paymentResponse.message || 'Mobile money payment failed');
        }

        paymentResult = paymentResponse.data;
      }

      const orderData = {
        cartId,
        products: cartProducts.map(item => ({
          productId: item.product?._id || item.productId || item._id,  // Get the actual product ID
          name: item.product?.title || item.name || item.title,
          quantity: item.count || item.quantity || 1,
          price: item.product?.price || item.price,
          color: item.color || 'default',
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
        paymentMethod: formData.paymentMethod,
        paymentDetails: paymentResult ? {
          transactionId: paymentResult.transactionId,
          provider: paymentResult.provider,
          status: paymentResult.status
        } : null
      };
  
      const resultAction = await dispatch(createOrder(orderData));
      
      if (createOrder.fulfilled.match(resultAction)) {
        const orderId = resultAction.payload.orderId;
        
        // Create WhatsApp message with order details
        const whatsappNumber = '237683340380'; // Cameroon country code + number
        const orderSummary = `Hello! I just placed an order on SHYNEEN.\n\n` +
          `*Order ID:* ${orderId}\n` +
          `*Name:* ${formData.firstName} ${formData.lastName}\n` +
          `*Phone:* ${formData.phone}\n` +
          `*Address:* ${formData.address}, ${formData.city}, ${formData.country}\n` +
          `*Total Amount:* $${totalPay.toFixed(2)}\n` +
          `*Payment Method:* ${formData.paymentMethod}\n\n` +
          `*Products:*\n` +
          cartProducts.map((item, idx) => 
            `${idx + 1}. ${item.product?.title || item.title} x${item.count || item.quantity} - $${((item.product?.price || item.price) * (item.count || item.quantity)).toFixed(2)}`
          ).join('\n') +
          `\n\nPlease confirm my order. Thank you!`;
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(orderSummary);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Navigate to success page
        navigate('/checkout/success', { 
          state: { 
            orderId: orderId,
            amount: totalPay,
            paymentMethod: formData.paymentMethod,
            paymentDetails: paymentResult,
            whatsappSent: true
          } 
        });
      } else {
        throw new Error(resultAction.payload || 'Order creation failed');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert(error.message || 'Order failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { incrementCartProduct, decrementCartProduct } = require('../cart/cartSlice/index');
  const dispatchCart = useDispatch();
  const updateQuantity = (productId, newQuantity) => {
    const item = cartProducts.find(i => (i.id || i._id) === productId);
    if (!item) return;
    const currentQuantity = item.quantity || 1;
    if (newQuantity > currentQuantity) {
      dispatchCart(incrementCartProduct(productId));
    } else if (newQuantity < currentQuantity && currentQuantity > 1) {
      dispatchCart(decrementCartProduct(productId));
    }
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
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: isSubmitting ? '#ccc' : '#E8A5C4',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#E8A5C4')}
              onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#E8A5C4')}
            >
              {isSubmitting ? 'Processing...' : 'Pay Now'}
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