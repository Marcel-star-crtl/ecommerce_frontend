import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBRipple,
} from "mdb-react-ui-kit";

import ButtonWishList from "../btn/btnwishlist";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "../../cart/cartSlice";

import styles from "./style.module.css";

// Helper function to truncate HTML content
const truncateHTML = (html, maxLength = 100) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  if (text.length <= maxLength) return html;
  
  // Return truncated text with ellipsis
  return text.substring(0, maxLength) + '...';
};

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addStatus } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleAddToCart = async () => {
    console.log('Add to cart clicked for product:', product.title);
    console.log('User logged in:', isLoggedIn);
    
    if (!isLoggedIn) {
      console.log('User not logged in, redirecting to login');
      navigate("/login");
      return;
    }
    
    try {
      console.log('Dispatching addToCart with product:', product._id);
      const result = await dispatch(addToCart({ product, quantity: 1 }));
      
      if (addToCart.fulfilled.match(result)) {
        console.log('Add to cart successful, fetching updated cart');
        dispatch(fetchCart());
        // You can add a success toast here if needed
      } else if (addToCart.rejected.match(result)) {
        console.error('Add to cart failed:', result.payload);
        // You can add an error toast here if needed
      }
    } catch (error) {
      console.error('Error in handleAddToCart:', error);
    }
  };

  return (
    <div className="p-0" style={{ 
      paddingRight: '10px', 
      paddingLeft: '10px', 
      marginBottom: '20px', 
      height: '100%',
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div className={`${styles.product}`} style={{ 
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        <MDBCard 
          className="border-0"
          style={{ 
            borderRadius: '0px',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            boxShadow: 'none',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          {/* Product Image Section */}
          <div 
            className="position-relative d-flex align-items-center justify-content-center"
            style={{ 
              height: '350px', 
              width: '100%',
              backgroundColor: '#f8f9fa',
              padding: '0px',
              margin: '0px'
            }}
          >
            {/* Heart Icon - Top Left */}
            <div 
              className="position-absolute d-flex align-items-center justify-content-center"
              style={{ 
                top: '15px', 
                left: '15px', 
                width: '50px', 
                height: '50px',
                color: 'black',
                zIndex: 10
              }}
            >
              <ButtonWishList product={product} />
            </div>

            {/* Product Image */}
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="d-flex align-items-center justify-content-center"
              style={{ 
                width: '100%', 
                height: '100%',
                padding: '0px',
                margin: '0px'
              }}
            >
              <Link to={`/product/${product._id}`}>
                <MDBCardImage
                  src={product.images.length ? product.images[0].url : ''}
                  alt={product.title}
                  className={`img-fluid ${styles.mainImg}`}
                  style={{ 
                    height: '350px',
                    width: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Link>
            </MDBRipple>
          </div>

          {/* Product Details Section */}
          <div className="px-3" style={{ 
            paddingTop: '20px', 
            paddingBottom: '20px', 
            flex: '1', 
            display: 'flex', 
            flexDirection: 'column',
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            <Link 
              to={`/product/${product._id}`}
              className="text-decoration-none"
            >
              <h5 
                className={`mb-2 fw-normal ${styles.height}`}
                style={{ 
                  fontSize: '18px',
                  color: '#000000',
                  fontWeight: '400',
                  lineHeight: '1.4',
                  fontFamily: 'Arial, sans-serif',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '50px'
                }}
              >
                {product.title}
              </h5>
            </Link>

            {/* Product Description */}
            <div 
              className={`mb-3 ${styles.productDescription}`}
              style={{ 
                fontSize: '14px',
                color: '#666666',
                fontWeight: '400',
                lineHeight: '1.5',
                fontFamily: 'Arial, sans-serif',
                minHeight: '63px',
                maxHeight: '63px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                width: '100%',
                maxWidth: '100%',
                flex: '0 0 auto',
                overflowWrap: 'break-word'
              }}
              dangerouslySetInnerHTML={{ 
                __html: product.description || 'A gently formation' 
              }}
            />

            {/* Add to Cart Button */}
            <div className="d-grid" style={{ marginTop: 'auto' }}>
              <button
                className="btn border-0"
                style={{
                  backgroundColor: '#E8A5C4',
                  color: '#ffffff',
                  borderRadius: '0px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: '400',
                  transition: 'all 0.2s ease',
                  textTransform: 'none',
                  fontFamily: 'Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E298BC';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#E8A5C4';
                }}
                onClick={handleAddToCart}
                disabled={addStatus === 'loading' || product.quantity === 0}
              >
                {addStatus === 'loading'
                  ? "Adding..."
                  : product.quantity === 0
                  ? "Out of Stock"
                  : `Add to Cart - $${product.price}`}
              </button>
            </div>
          </div>
        </MDBCard>
      </div>
    </div>
  );
}

export default ProductCard;