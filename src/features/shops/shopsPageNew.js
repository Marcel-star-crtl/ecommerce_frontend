import React, { useEffect, useState, useRef } from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';
import ProductCard from '../layout/ProductCard/ProductCard';
import ProductCardSkeleton from '../layout/ProductCard/ProductCardSkeleton';
import HowToUse from "../components/HowToUse";
import ImageSection from "../components/ImageSection"
import { fetchProducts } from '../ProductDetails/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './shops.module.css';

const Shops = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.product);
  const scrollContainerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchProducts({ pageSize: 20, page: 1 }));
  }, [dispatch]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = windowWidth <= 480 ? 200 : windowWidth <= 768 ? 300 : 400;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.shopWrapper}>
      <MDBContainer 
        fluid 
        className={styles.shopContainer}
        style={{
          padding: windowWidth <= 480 ? "1rem 0.5rem" : 
                   windowWidth <= 768 ? "1.5rem 1rem" : "2.5rem 2rem",
          minHeight: "100vh",
          maxWidth: "100%"
        }}
      >
        {/* Page Header */}
        <div className={styles.headerSection}>
          <h1 style={{
            fontSize: windowWidth <= 480 ? '24px' : 
                     windowWidth <= 768 ? '28px' : '32px',
            fontWeight: '300',
            color: '#333',
            textAlign: 'center',
            marginBottom: windowWidth <= 480 ? '2rem' : '3rem',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            All Products
          </h1>
        </div>

        {/* Horizontal Slider */}
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          {/* Left Arrow */}
          {products && products.length > (windowWidth <= 480 ? 2 : windowWidth <= 768 ? 3 : 5) && (
            <button
              onClick={() => scroll('left')}
              style={{
                position: 'absolute',
                left: '-15px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'white',
                border: '1px solid #E8A5C4',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#E8A5C4';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#333';
              }}
            >
              ‹
            </button>
          )}

          {/* Products Container */}
          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: windowWidth <= 480 ? '10px' : '15px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '10px 0',
              scrollBehavior: 'smooth'
            }}
            className="hide-scrollbar"
          >
            {status === 'loading' ? (
              Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: windowWidth <= 480 ? '150px' : 
                             windowWidth <= 768 ? '200px' : '240px',
                    flexShrink: 0
                  }}
                >
                  <ProductCardSkeleton />
                </div>
              ))
            ) : status === 'succeeded' && Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id || product.id}
                  style={{
                    minWidth: windowWidth <= 480 ? '150px' : 
                             windowWidth <= 768 ? '200px' : '240px',
                    flexShrink: 0
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div style={{ width: '100%', textAlign: 'center', padding: '40px' }}>
                <h3 style={{ fontSize: '20px', color: '#666' }}>No products found</h3>
                <p style={{ fontSize: '16px', color: '#999' }}>Check back later for new arrivals</p>
              </div>
            )}
          </div>

          {/* Right Arrow */}
          {products && products.length > (windowWidth <= 480 ? 2 : windowWidth <= 768 ? 3 : 5) && (
            <button
              onClick={() => scroll('right')}
              style={{
                position: 'absolute',
                right: '-15px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'white',
                border: '1px solid #E8A5C4',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#E8A5C4';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#333';
              }}
            >
              ›
            </button>
          )}
        </div>

        {/* Additional Components */}
        <div className={styles.additionalSections}>
          <HowToUse />
          <ImageSection />
        </div>
      </MDBContainer>

      {/* Hide Scrollbar CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Shops;
