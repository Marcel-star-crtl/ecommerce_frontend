import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutButton from "./CheckoutButton";
import './cart.css';

import { deleteCartProduct, fetchCart, incrementCartProduct, decrementCartProduct, applyCoupon, emptyCart } from './cartSlice';
import Loader from '../../components/Loader/Loader';

function Cart() {
  const dispatch = useDispatch();

  const { 
    products, 
    cartId, 
    cartCount, 
    totalPrice,
    totalAfterDiscount,
    appliedCoupon,
    fetchStatus,
    incrementStatus,
    decrementStatus,
    deleteStatus,
    couponStatus,
    emptyStatus,
    error
  } = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const componentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [cartToast, setCartToast] = useState(null);

  const CLOUDINARY_CLOUD_NAME = 'ddlhwv65t';

  const getCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) {
      console.log('No imageUrl provided');
      return '';
    }
    
    
    if (imageUrl.includes('res.cloudinary.com')) {
      return imageUrl;
    }
    
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 1];
    const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
    console.log('Constructed Cloudinary URL:', cloudinaryUrl);
    return cloudinaryUrl;
  };

  useEffect(() => {
    if (componentRef.current) {
      setHeight(componentRef.current.clientHeight);
    }
  }, [products]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
      console.log('Fetching cart for logged in user');
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    setIsUpdating(
      incrementStatus === 'loading' || 
      decrementStatus === 'loading' || 
      deleteStatus === 'loading' ||
      emptyStatus === 'loading'
    );
  }, [incrementStatus, decrementStatus, deleteStatus, emptyStatus]);

  const updateQuantity = async (productId, newQuantity) => {
    if (isUpdating) return; 
    
    if (newQuantity < 1) {
      handleDeleteItem(productId);
      return;
    }

    // Find the cart item using the product ID
    const currentItem = products.find(item => 
      (item.product?._id || item.productId || item.id || item._id) === productId
    );
    if (!currentItem) {
      console.error('Item not found in cart:', productId);
      return;
    }

    const currentQuantity = currentItem.quantity || currentItem.count || 1;
    
    try {
      if (newQuantity > currentQuantity) {
        console.log('Incrementing quantity for item:', productId);
        await dispatch(incrementCartProduct(productId)).unwrap();
        setCartToast('Item added to cart!');
      } else if (newQuantity < currentQuantity) {
        console.log('Decrementing quantity for item:', productId);
        await dispatch(decrementCartProduct(productId)).unwrap();
        setCartToast('Item quantity updated!');
      }
      if (newQuantity !== currentQuantity) {
        setTimeout(() => setCartToast(null), 2000);
      }
    } catch (error) {
      setCartToast('Error updating cart!');
      setTimeout(() => setCartToast(null), 2000);
      console.error('Error updating quantity:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    if (isUpdating) return;
    
    try {
      console.log('🗑️ Attempting to delete item with ID:', id);
      console.log('🗑️ Available products in cart:', products?.map(p => ({ 
        id: p.id, 
        _id: p._id, 
        productId: p.product?._id,
        name: p.name || p.title || p.product?.title 
      })));
      
      await dispatch(deleteCartProduct(id)).unwrap();
      setCartToast('Item removed from cart!');
      setTimeout(() => setCartToast(null), 2000);
    } catch (error) {
      setCartToast('Error removing item!');
      setTimeout(() => setCartToast(null), 2000);
      console.error('❌ Error deleting item:', error);
    }
  };

  const subtotal = totalPrice || (products?.reduce((sum, item) => {
    const quantity = item.quantity || item.count || 1;
    const price = item.price || 0;
    return sum + (price * quantity);
  }, 0) || 0);
  
  const finalTotal = totalAfterDiscount || subtotal;
  
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  const itemCount = cartCount || products?.reduce((sum, item) => {
    const quantity = item.quantity || item.count || 1;
    return sum + quantity;
  }, 0) || 0;

  const navigate = useNavigate();

  const handleApplyCoupon = async () => {
    if (couponCode.trim()) {
      try {
        await dispatch(applyCoupon(couponCode)).unwrap();
        setCouponCode('');
      } catch (error) {
        console.error('Error applying coupon:', error);
      }
    }
  };

  const handleEmptyCart = async () => {
    if (window.confirm('Are you sure you want to empty your cart?')) {
      try {
        await dispatch(emptyCart()).unwrap();
        setCartToast('Cart emptied!');
        setTimeout(() => setCartToast(null), 2000);
      } catch (error) {
        setCartToast('Error emptying cart!');
        setTimeout(() => setCartToast(null), 2000);
        console.error('Error emptying cart:', error);
      }
    }
  };

  if (fetchStatus === 'loading') {
    return <Loader fullScreen />;
  }

  if (fetchStatus === 'failed' && error) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3>Error loading cart</h3>
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchCart())}
            style={{
              padding: '10px 20px',
              backgroundColor: '#E8A5C4',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">
            🛒
          </div>
          <h3 className="empty-cart-title">
            Your shopping cart looks empty
          </h3>
          <p className="empty-cart-text">
            What are you waiting for?
          </p>
          <Link to="/home" className="start-shopping-btn">
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={componentRef}
      className={`cart-container ${isUpdating ? 'updating' : ''}`}
    >
      {cartToast && (
        <div className="cart-toast">
          {cartToast}
        </div>
      )}
      <div className="cart-content">
        <div className="cart-header">
          <div className="cart-title-section">
            <h1>
              Shopping Cart
            </h1>
            <span>
              ({itemCount} items)
            </span>
          </div>
          <div className="cart-actions">
            <button 
              onClick={handleEmptyCart}
              disabled={isUpdating || !products?.length}
              className="empty-cart-btn"
            >
              {emptyStatus === 'loading' ? 'Emptying...' : 'Empty Cart'}
            </button>
            <div className="sort-label">
              Sort by: <strong>Recently Added</strong>
            </div>
          </div>
        </div>

        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-items-container">
            {products?.map((item, index) => {
              // Use the product ID for delete operations, not the cart item ID
              const itemId = item.product?._id || item.productId || item.id || item._id;
              const itemQuantity = item.quantity || item.count || 1;
              const isItemUpdating = isUpdating;
              
              const getItemImageUrl = () => {
                console.log('Cart item data:', item);
                
                if (item.images && Array.isArray(item.images) && item.images.length > 0) {
                  const firstImage = item.images[0];
                  
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
                  
                  if (firstImage?.url) {
                    return getCloudinaryUrl(firstImage.url);
                  } else if (firstImage?.image) {
                    return getCloudinaryUrl(firstImage.image);
                  } else if (typeof firstImage === 'string') {
                    return getCloudinaryUrl(firstImage);
                  }
                }
                
                console.log('No valid image found, using fallback');
                return 'https://via.placeholder.com/100x100/f8f9fa/666666?text=No+Image';
              };
              
              return (
                <div key={itemId} className={`cart-item ${isItemUpdating ? 'updating' : ''}`}>
                  <div className="item-image">
                    <Link to={`/product/${itemId}`}>
                      <img
                        src={getItemImageUrl()}
                        alt={item.name || item.title}
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="item-details">
                    <Link
                      to={`/product/${itemId}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <h3 className="item-title">
                        {item.name || item.title}
                      </h3>
                    </Link>
                    <p className="item-description">
                      {item.description || 'Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap'}
                    </p>
                    {item.itemNumber && (
                      <p className="item-info">
                        ITEM {item.itemNumber}
                      </p>
                    )}
                    {item.size && (
                      <p className="item-size">
                        Size: {item.size}
                      </p>
                    )}
                    <p className="item-info">
                      Sold by Shyneen
                    </p>
                    <button
                      onClick={() => handleDeleteItem(itemId)}
                      disabled={isItemUpdating}
                      className="remove-btn"
                    >
                      <i className="fa-solid fa-trash"></i>
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Price and Quantity */}
                  <div className="item-price-section">
                    <div className="item-price">
                      ${item.price?.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(itemId, itemQuantity - 1)}
                        disabled={isItemUpdating || itemQuantity <= 1}
                        className="quantity-btn"
                      >
                        −
                      </button>
                      <span className="quantity-value">
                        {itemQuantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(itemId, itemQuantity + 1)}
                        disabled={isItemUpdating}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary - Sticky */}
          <div className="order-summary">
            <div className="summary-box">
              <h3 className="summary-title">
                Order Summary
              </h3>

              {/* Coupon Code */}
              <div className="coupon-section">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponStatus === 'loading'}
                  className="coupon-input"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim() || couponStatus === 'loading'}
                  className="coupon-btn"
                >
                  {couponStatus === 'loading' ? 'Applying...' : 'Apply'}
                </button>
              </div>
              
              {appliedCoupon && (
                <div className="coupon-success">
                  Coupon "{appliedCoupon}" applied successfully!
                </div>
              )}

              <div className="summary-details">
                <div className="summary-row">
                  <span className="summary-label">
                    Subtotal ({itemCount} items)
                  </span>
                  <span className="summary-value">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value free">
                    Free
                  </span>
                </div>
                
                {totalAfterDiscount && totalAfterDiscount < subtotal && (
                  <div className="summary-row">
                    <span className="summary-label">Discount</span>
                    <span className="summary-value discount">
                      -${(subtotal - totalAfterDiscount).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="summary-total">
                <span className="total-label">
                  Total ({itemCount} items)
                </span>
                <span className="total-value">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                disabled={!products?.length || isUpdating}
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                {isUpdating ? 'Updating...' : 'Proceed to Checkout'}
              </button>

              {/* Continue Shopping */}
              <Link to="/home" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

