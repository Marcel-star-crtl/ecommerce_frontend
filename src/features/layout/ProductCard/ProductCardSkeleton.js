import React from "react";
import { MDBCard, MDBCol } from "mdb-react-ui-kit";
import styles from "./style.module.css";

function ProductCardSkeleton() {
  return (
    <div className="p-2">
      <MDBCol md="12" lg="6" className={`mb-4 mb-lg-0 ${styles.product}`}>
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
          {/* Product Image Section Skeleton */}
          <div 
            className="position-relative d-flex align-items-center justify-content-center"
            style={{ 
              height: '280px',
              backgroundColor: '#f8f9fa',
              padding: '20px'
            }}
          >
            {/* Heart Icon Skeleton - Top Left */}
            <div 
              className="position-absolute"
              style={{ 
                top: '15px', 
                left: '15px', 
                width: '24px', 
                height: '24px',
                backgroundColor: '#e9ecef',
                borderRadius: '50%',
                zIndex: 10
              }}
            />

            {/* Product Image Skeleton */}
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ 
                width: '240px',
                height: '240px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px'
              }}
            />
          </div>

          {/* Product Details Section Skeleton */}
          <div className="p-3" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            {/* Product Name Skeleton */}
            <div 
              className="mb-2"
              style={{ 
                height: '22px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                width: '80%'
              }}
            />
            
            {/* Second line of title if needed */}
            <div 
              className="mb-3"
              style={{ 
                height: '22px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                width: '60%'
              }}
            />

            {/* Product Description Skeleton */}
            <div 
              className="mb-3"
              style={{ 
                height: '16px',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                width: '90%'
              }}
            />

            {/* Add to Cart Button Skeleton */}
            <div
              style={{
                height: '44px',
                backgroundColor: '#e9ecef',
                borderRadius: '0px',
                width: '100%'
              }}
            />
          </div>
        </MDBCard>
      </MDBCol>
    </div>
  );
}

export default ProductCardSkeleton;