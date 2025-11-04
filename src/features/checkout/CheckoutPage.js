import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../order/ordersSlice';
import { useSelector, useDispatch } from 'react-redux';
import api, { mobileMoneyAPI } from '../../api/api';
import './checkout.css'; 

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
    <div className="checkout-page">
      <div className="checkout-wrapper">
        <div className="checkout-grid">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit}>
              <section className="form-section">
                <h2 className="section-title">
                  Contact Information
                </h2>
                <div className="form-row">
                  <div>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      placeholder="First name"
                      required
                      className="form-input"
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
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="Email"
                      required
                      className="form-input"
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
                      className="form-input"
                    />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <h2 className="section-title">
                  Shipping Information
                </h2>
                <div className="form-row">
                  <div>
                    <input 
                      type="text" 
                      name="country" 
                      value={formData.country} 
                      onChange={handleChange} 
                      placeholder="Country"
                      required
                      className="form-input"
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
                      className="form-input"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      placeholder="Address"
                      required
                      className="form-input"
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
                      className="form-input"
                    />
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-container">
            <h2 className="summary-title">
              Order Summary
            </h2>
            
            {/* Product Items */}
            <div className="products-list">
              {cartProducts.map((item, index) => (
                <div key={item.id || index} className="product-item">
                  <div className="product-image">
                    <img 
                      src={getCheckoutItemImageUrl(item)}
                      alt={item.name || item.title || 'Product'}
                    />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">
                      {item.name || item.title || 'Shyneen Glow'}
                    </h3>
                    <p className="product-description">
                      {item.description || 'Celestial Nightly Skin Repair for firming, Hydrating and Restoring'}
                    </p>
                    <p className="product-size">
                      Size: {item.size || '1 oz/30 mL'}
                    </p>
                    <div className="product-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                          className="quantity-btn"
                          type="button"
                        >
                          −
                        </button>
                        <span className="quantity-value">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="quantity-btn"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <div className="product-price-actions">
                        <button className="remove-btn" type="button">
                          REMOVE
                        </button>
                        <span className="product-price">
                          ${(item.price || 65).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="order-totals">
              <div className="total-row">
                <span className="total-label">Subtotal</span>
                <span className="total-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Delivery Cost</span>
                <span className="total-value">${deliveryCost.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span className="total-label">Discount</span>
                <span className="total-value">${discount.toFixed(2)}</span>
              </div>
            </div>

            <div className="grand-total">
              <span className="grand-total-label">Total Pay</span>
              <span className="grand-total-value">${totalPay.toFixed(2)}</span>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="pay-now-btn"
              type="button"
            >
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </button>
            
            {/* Terms and Conditions */}
            <div className="terms-container">
              <label className="terms-label">
                <input 
                  type="checkbox" 
                  name="acceptTerms" 
                  checked={formData.acceptTerms} 
                  onChange={handleChange}
                  required
                />
                <span>
                  By proceeding I accept the{' '}
                  <a href="#" className="terms-link">
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