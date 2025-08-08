import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutButton from "./CheckoutButton";

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

  const updateQuantity = async (id, newQuantity) => {
    if (isUpdating) return; 
    
    if (newQuantity < 1) {
      handleDeleteItem(id);
      return;
    }

    const currentItem = products.find(item => (item.id || item._id) === id);
    if (!currentItem) {
      console.error('Item not found in cart:', id);
      return;
    }

    const currentQuantity = currentItem.quantity || currentItem.count || 1;
    
    try {
      if (newQuantity > currentQuantity) {
        console.log('Incrementing quantity for item:', id);
        await dispatch(incrementCartProduct(id)).unwrap();
        setCartToast('Item added to cart!');
      } else if (newQuantity < currentQuantity) {
        console.log('Decrementing quantity for item:', id);
        await dispatch(decrementCartProduct(id)).unwrap();
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
      console.log('Deleting item:', id);
      await dispatch(deleteCartProduct(id)).unwrap();
      setCartToast('Item removed from cart!');
      setTimeout(() => setCartToast(null), 2000);
    } catch (error) {
      setCartToast('Error removing item!');
      setTimeout(() => setCartToast(null), 2000);
      console.error('Error deleting item:', error);
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
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '60px 40px',
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '32px',
            color: '#ccc'
          }}>
            🛒
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#333',
            margin: '0 0 10px 0'
          }}>
            Your shopping cart looks empty
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: '0 0 25px 0'
          }}>
            What are you waiting for?
          </p>
          <Link
            to="/home"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#E8A5C4',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={componentRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        opacity: isUpdating ? 0.8 : 1,
        transition: 'opacity 0.2s'
      }}
    >
      {cartToast && (
        <div style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#E8A5C4',
          color: 'white',
          padding: '12px 32px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 500,
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
          {cartToast}
        </div>
      )}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '400',
              color: '#333',
              margin: '0',
              display: 'inline-block'
            }}>
              Shopping Cart
            </h1>
            <span style={{
              fontSize: '16px',
              color: '#666',
              marginLeft: '10px'
            }}>
              ({itemCount} items)
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <button 
              onClick={handleEmptyCart}
              disabled={isUpdating || !products?.length}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                color: isUpdating || !products?.length ? '#ccc' : '#dc3545',
                cursor: isUpdating || !products?.length ? 'not-allowed' : 'pointer',
                textDecoration: 'underline'
              }}
            >
              {emptyStatus === 'loading' ? 'Emptying...' : 'Empty Cart'}
            </button>
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              Sort by: <strong>Recently Added</strong>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px'
        }}>
          {/* Cart Items */}
          <div>
            {products?.map((item, index) => {
              const itemId = item.id || item._id;
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
                <div key={itemId} style={{
                  display: 'flex',
                  gap: '20px',
                  paddingBottom: '25px',
                  marginBottom: '25px',
                  borderBottom: index < products.length - 1 ? '1px solid #f0f0f0' : 'none',
                  opacity: isItemUpdating ? 0.6 : 1,
                  transition: 'opacity 0.2s'
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#f8f9fa',
                    // borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden', 
                    padding: '0px' 
                  }}>
                    <Link to={`/product/${itemId}`}>
                      <img
                        src={getItemImageUrl()}
                        alt={item.name || item.title}
                        style={{
                          width: '100px',
                          height: '100px',
                          objectFit: 'cover', 
                          display: 'block'
                        }}
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div style={{ flex: 1 }}>
                    <Link
                      to={`/product/${itemId}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: '#333',
                        margin: '0 0 8px 0'
                      }}>
                        {item.name || item.title}
                      </h3>
                    </Link>
                    <p style={{
                      fontSize: '13px',
                      color: '#666',
                      margin: '0 0 8px 0',
                      lineHeight: '1.4'
                    }}>
                      {item.description || 'Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap'}
                    </p>
                    {item.itemNumber && (
                      <p style={{
                        fontSize: '12px',
                        color: '#999',
                        margin: '0 0 4px 0'
                      }}>
                        ITEM {item.itemNumber}
                      </p>
                    )}
                    {item.size && (
                      <p style={{
                        fontSize: '12px',
                        color: '#666',
                        margin: '0 0 8px 0'
                      }}>
                        Size: {item.size}
                      </p>
                    )}
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: '0 0 12px 0'
                    }}>
                      Sold by Shyneen
                    </p>
                    <button
                      onClick={() => handleDeleteItem(itemId)}
                      disabled={isItemUpdating}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '12px',
                        color: isItemUpdating ? '#ccc' : '#E8A5C4',
                        cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                        textDecoration: 'underline',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Price and Quantity */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    minWidth: '120px'
                  }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: '10px'
                    }}>
                      ${item.price?.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px'
                    }}>
                      <button
                        onClick={() => updateQuantity(itemId, itemQuantity - 1)}
                        disabled={isItemUpdating || itemQuantity <= 1}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #ddd',
                          backgroundColor: isItemUpdating || itemQuantity <= 1 ? '#f5f5f5' : 'white',
                          fontSize: '14px',
                          cursor: isItemUpdating || itemQuantity <= 1 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isItemUpdating || itemQuantity <= 1 ? '#ccc' : '#333'
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        fontSize: '14px',
                        minWidth: '20px',
                        textAlign: 'center',
                        fontWeight: '500'
                      }}>
                        {itemQuantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(itemId, itemQuantity + 1)}
                        disabled={isItemUpdating}
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '1px solid #ddd',
                          backgroundColor: isItemUpdating ? '#f5f5f5' : 'white',
                          fontSize: '14px',
                          cursor: isItemUpdating ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isItemUpdating ? '#ccc' : '#333'
                        }}
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
          <div style={{
            position: 'sticky',
            top: '50px',
            height: 'fit-content'
          }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '25px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#333',
                margin: '0 0 20px 0'
              }}>
                Order Summary
              </h3>

              {/* Coupon Code */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponStatus === 'loading'}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    outline: 'none',
                    opacity: couponStatus === 'loading' ? 0.6 : 1
                  }}
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim() || couponStatus === 'loading'}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: (!couponCode.trim() || couponStatus === 'loading') ? '#ccc' : '#E8A5C4',
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    cursor: (!couponCode.trim() || couponStatus === 'loading') ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.backgroundColor = '#E298BC';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.backgroundColor = '#E8A5C4';
                    }
                  }}
                >
                  {couponStatus === 'loading' ? 'Applying...' : 'Apply'}
                </button>
              </div>
              
              {appliedCoupon && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginBottom: '15px'
                }}>
                  Coupon "{appliedCoupon}" applied successfully!
                </div>
              )}

              <div style={{
                paddingBottom: '15px',
                marginBottom: '15px',
                borderBottom: '1px solid #ddd'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    Subtotal ({itemCount} items)
                  </span>
                  <span style={{ fontSize: '14px', color: '#333' }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Shipping</span>
                  <span style={{ fontSize: '14px', color: '#E8A5C4', fontWeight: '500' }}>
                    Free
                  </span>
                </div>
                
                {totalAfterDiscount && totalAfterDiscount < subtotal && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#28a745' }}>Discount</span>
                    <span style={{ fontSize: '14px', color: '#28a745', fontWeight: '500' }}>
                      -${(subtotal - totalAfterDiscount).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '25px'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                  Total ({itemCount} items)
                </span>
                <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button
                disabled={!products?.length || isUpdating}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: (!products?.length || isUpdating) ? '#ccc' : '#E8A5C4',
                  color: 'white',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: (!products?.length || isUpdating) ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s',
                  marginBottom: '15px'
                }}
                onMouseOver={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#E298BC';
                  }
                }}
                onMouseOut={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#E8A5C4';
                  }
                }}
                onClick={() => navigate("/checkout")}
              >
                {isUpdating ? 'Updating...' : 'Proceed to Checkout'}
              </button>

              {/* Continue Shopping */}
              <Link
                to="/home"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.borderColor = '#ccc';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#ddd';
                }}
              >
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

