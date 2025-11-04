import React, { useEffect, useState, useRef } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import styles from "../Category/CategoryPage/stylee.module.css"; 
import ProductCard from "../../features/layout/ProductCard/ProductCard";
import ProductCardSkeleton from "../../features/layout/ProductCard/ProductCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory, fetchAllCategories } from "../Category/CategoryPage/categorySlice";

const SkinCare = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.category);
  const scrollContainerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [skinCareCategory, setSkinCareCategory] = useState(null);

  const { allCategories, allCategoriesStatus } = useSelector((state) => state.category);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (allCategoriesStatus === 'idle') {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, allCategoriesStatus]);

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      const skinCareCategory = allCategories.find(
        category => category.title.toLowerCase().includes('skin care') || 
                   category.title.toLowerCase().includes('skincare') ||
                   category.title.toLowerCase() === 'skin care' ||
                   category.title.toLowerCase() === 'skincare'
      );
      
      if (skinCareCategory) {
        setSkinCareCategory(skinCareCategory);
      }
    }
  }, [allCategories]);

  useEffect(() => {
    if (skinCareCategory && skinCareCategory._id) {
      console.log("SkinCare: Fetching products for category:", skinCareCategory._id);
      dispatch(fetchProductsByCategory({ 
        categoryId: skinCareCategory._id, 
        pageSize: 20, 
        page: 1 
      }));
    }
  }, [skinCareCategory, dispatch]);

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

  const isLoading = allCategoriesStatus === 'loading' || 
                   (allCategoriesStatus === 'succeeded' && !skinCareCategory) ||
                   status === 'loading';

  const hasError = allCategoriesStatus === 'failed' || 
                  (allCategoriesStatus === 'succeeded' && allCategories.length > 0 && !skinCareCategory) ||
                  status === 'failed';

  return (
    <MDBContainer fluid style={{ padding: '2rem 1rem', minHeight: '100vh' }}>
      <h1 style={{
        marginBottom: '3rem',
        fontWeight: '300',
        color: '#333',
        textAlign: 'center',
        fontSize: windowWidth <= 480 ? '24px' : '32px',
        letterSpacing: '2px',
        textTransform: 'uppercase'
      }}>
        Skin Care
      </h1>

      {isLoading ? (
        <div style={{ display: 'flex', gap: '15px', padding: '10px 0' }}>
          {Array.from({ length: 6 }, (_, index) => (
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
          ))}
        </div>
      ) : hasError ? (
        <div
          className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
          style={{ minHeight: '400px', padding: '60px 20px' }}
        >
          <h3 className="text-dark fw-bold mb-3 text-center">
            {!skinCareCategory 
              ? "Skin Care category not found" 
              : "OPS, It looks like we have an error on this page, don't worry we will fix it soon enough"
            }
          </h3>
          <span className="text-muted mb-4 text-center fs-6">
            In the mean time, Why don't you check all the other Awesome products we have!
          </span>
          <Link 
            to="/home" 
            className="btn text-white fw-medium px-4 py-2 rounded-pill shadow-sm"
            style={{ 
              backgroundColor: '#f8a5c2',
              border: 'none',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
          >
            Home
          </Link>
        </div>
      ) : status === "succeeded" && products && products.length > 0 ? (
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          {/* Left Arrow */}
          {products.length > (windowWidth <= 480 ? 2 : windowWidth <= 768 ? 3 : 5) && (
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
                transition: 'all 0.3s ease',
                fontSize: '24px'
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

          {/* Products Slider */}
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
            {products.map((product) => (
              <div
                key={product._id}
                style={{
                  minWidth: windowWidth <= 480 ? '150px' : 
                           windowWidth <= 768 ? '200px' : '240px',
                  flexShrink: 0
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {products.length > (windowWidth <= 480 ? 2 : windowWidth <= 768 ? 3 : 5) && (
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
                transition: 'all 0.3s ease',
                fontSize: '24px'
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
      ) : (
        <div
          className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
          style={{ minHeight: '400px', padding: '60px 20px' }}
        >
          <h3 className="text-dark fw-bold mb-3 text-center">
            No skin care products available yet
          </h3>
          <span className="text-muted mb-4 text-center fs-6">
            Check all the other Awesome products we have!
          </span>
          <Link 
            to="/home"
            className="btn text-white fw-medium px-4 py-2 rounded-pill shadow-sm"
            style={{ 
              backgroundColor: '#f8a5c2',
              border: 'none',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
          >
            Home
          </Link>
        </div>
      )}

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
    </MDBContainer>
  );
};

export default SkinCare;
