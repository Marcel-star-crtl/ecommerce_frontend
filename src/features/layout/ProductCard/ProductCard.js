import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBRipple,
} from "mdb-react-ui-kit";

import ButtonWishList from "../btn/btnwishlist";
import Button from "../btn/btn";
import { Link } from "react-router-dom";

import styles from "./style.module.css";

function ProductCard({ product }) {
  return (
    <div className="p-0" style={{ paddingRight: '10px', paddingLeft: '10px', marginBottom: '20px' }}>
      <div className={`${styles.product}`}>
        <MDBCard 
          className="border-0"
          style={{ 
            borderRadius: '0px',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            boxShadow: 'none',
            height: '100%'
          }}
        >
          {/* Product Image Section */}
          <div 
            className="position-relative d-flex align-items-center justify-content-center"
            style={{ 
              height: '280px', 
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
                    height: '280px',
                    width: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Link>
            </MDBRipple>
          </div>

          {/* Product Details Section */}
          <div className="px-3" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
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
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                {product.title}
              </h5>
            </Link>

            {/* Product Description */}
            <p 
              className="mb-3" 
              style={{ 
                fontSize: '14px',
                color: '#666666',
                fontWeight: '400',
                lineHeight: '1.3',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              {product.description || 'A gently formation'}
            </p>

            {/* Add to Cart Button */}
            <div className="d-grid">
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
              >
                Add to Cart - ${product.price}
              </button>
            </div>

            {/* Hidden original Button component for functionality */}
            <div className="d-none">
              <Button el={product} />
            </div>
          </div>
        </MDBCard>
      </div>
    </div>
  );
}

export default ProductCard;