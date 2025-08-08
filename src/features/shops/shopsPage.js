import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import ProductCard from '../layout/ProductCard/ProductCard';
import ProductCardSkeleton from '../layout/ProductCard/ProductCardSkeleton';
import HowToUse from "../components/HowToUse";
import ImageSection from "../components/ImageSection"
import { fetchProducts } from '../ProductDetails/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './shops.module.css';

const Shops = () => {
  const dispatch = useDispatch();
  const { products, status, error, totalProductsCount } = useSelector((state) => state.product);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  // Window resize handler for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive grid columns
  const getColumnProps = () => {
    if (windowWidth <= 480) {
      // Mobile: 2 columns to better use space
      return { xs: "6", sm: "6", className: "mb-3" };
    } else if (windowWidth <= 768) {
      // Tablet: 3 columns
      return { xs: "6", sm: "4", md: "4", className: "mb-3" };
    } else if (windowWidth <= 1024) {
      // Desktop small: 4 columns
      return { sm: "4", md: "3", lg: "3", className: "mb-4" };
    } else {
      // Desktop large: use custom grid
      return null; // Will use custom grid
    }
  };

  const useCustomGrid = windowWidth > 1024;

  useEffect(() => {
    dispatch(fetchProducts({ pageSize, page }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log('Products:', products);
  console.log('Status:', status);
  console.log('Error:', error);

  return (
    <div className={styles.shopWrapper}>
      <MDBContainer 
        fluid 
        className={styles.shopContainer}
        style={{
          padding: windowWidth <= 480 ? "1rem 0.25rem" : 
                   windowWidth <= 768 ? "1.5rem 0.5rem" : 
                   windowWidth <= 1024 ? "2rem 0.75rem" : "2.5rem 1rem",
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

        {/* Products Grid */}
        {useCustomGrid ? (
          // Custom grid for large screens
          <div className={styles.fiveColumnGrid}>
            {status === 'loading' ? (
              // Loading skeletons - responsive count
              Array.from({ length: windowWidth >= 1200 ? 12 : 10 }, (_, index) => (
                <div key={index} className={styles.fiveColumnItem}>
                  <ProductCardSkeleton />
                </div>
              ))
            ) : status === 'succeeded' && Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <div key={product._id || product.id} className={styles.fiveColumnItem}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : status === 'succeeded' && (!Array.isArray(products) || products.length === 0) ? (
              <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
                <div className={styles.emptyContent}>
                  <h3 style={{
                    fontSize: '20px',
                    color: '#666',
                    marginBottom: '1rem'
                  }}>
                    No products found
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#999',
                    marginBottom: '0'
                  }}>
                    Check back later for new arrivals
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.errorState} style={{ gridColumn: '1 / -1' }}>
                <div className={styles.errorContent}>
                  <h3 style={{
                    fontSize: '20px',
                    color: '#e74c3c',
                    marginBottom: '1rem'
                  }}>
                    Error Loading Products
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '0'
                  }}>
                    {error || 'Something went wrong. Please try again later.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Regular MDB grid for smaller screens
          <MDBRow className="g-3 g-md-4">
            {status === 'loading' ? (
              // Loading skeletons - responsive count
              Array.from({ length: windowWidth <= 480 ? 4 : windowWidth <= 768 ? 6 : 8 }, (_, index) => (
                <MDBCol key={index} {...getColumnProps()}>
                  <ProductCardSkeleton />
                </MDBCol>
              ))
            ) : status === 'succeeded' && Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <MDBCol key={product._id || product.id} {...getColumnProps()}>
                  <ProductCard product={product} />
                </MDBCol>
              ))
            ) : status === 'succeeded' && (!Array.isArray(products) || products.length === 0) ? (
              <MDBCol xs="12">
                <div className={styles.emptyState}>
                  <div className={styles.emptyContent}>
                    <h3 style={{
                      fontSize: windowWidth <= 480 ? '18px' : '20px',
                      color: '#666',
                      marginBottom: '1rem'
                    }}>
                      No products found
                    </h3>
                    <p style={{
                      fontSize: windowWidth <= 480 ? '14px' : '16px',
                      color: '#999',
                      marginBottom: '0'
                    }}>
                      Check back later for new arrivals
                    </p>
                  </div>
                </div>
              </MDBCol>
            ) : (
              <MDBCol xs="12">
                <div className={styles.errorState}>
                  <div className={styles.errorContent}>
                    <h3 style={{
                      fontSize: windowWidth <= 480 ? '18px' : '20px',
                      color: '#e74c3c',
                      marginBottom: '1rem'
                    }}>
                      Error Loading Products
                    </h3>
                    <p style={{
                      fontSize: windowWidth <= 480 ? '14px' : '16px',
                      color: '#666',
                      marginBottom: '0'
                    }}>
                      {error || 'Something went wrong. Please try again later.'}
                    </p>
                  </div>
                </div>
              </MDBCol>
            )}
          </MDBRow>
        )}

        {/* Pagination */}
        {pagesQuantity > 1 && status === 'succeeded' && (
          <div className={styles.paginationWrapper}>
            <MDBPagination 
              center 
              size={windowWidth <= 480 ? "sm" : "lg"} 
              className="mb-0"
            >
              {/* Previous Button */}
              <MDBPaginationItem disabled={page === 1}>
                <MDBPaginationLink
                  onClick={() => page > 1 && handlePageChange(page - 1)}
                  style={{ 
                    cursor: page === 1 ? 'not-allowed' : 'pointer',
                    fontSize: windowWidth <= 480 ? '12px' : '14px'
                  }}
                >
                  {windowWidth <= 480 ? '‹' : 'Previous'}
                </MDBPaginationLink>
              </MDBPaginationItem>

              {/* Page Numbers */}
              {Array.from({ length: pagesQuantity }, (_, index) => {
                const pageNum = index + 1;
                // On mobile, show fewer page numbers
                if (windowWidth <= 480) {
                  if (pagesQuantity <= 5 || 
                      pageNum === 1 || 
                      pageNum === pagesQuantity || 
                      Math.abs(pageNum - page) <= 1) {
                    return (
                      <MDBPaginationItem key={pageNum} active={pageNum === page}>
                        <MDBPaginationLink
                          onClick={() => handlePageChange(pageNum)}
                          style={{ fontSize: '12px' }}
                        >
                          {pageNum}
                          {pageNum === page && (
                            <span className="visually-hidden">(current)</span>
                          )}
                        </MDBPaginationLink>
                      </MDBPaginationItem>
                    );
                  }
                  return null;
                }
                
                // Desktop: show all pages
                return (
                  <MDBPaginationItem key={pageNum} active={pageNum === page}>
                    <MDBPaginationLink
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                      {pageNum === page && (
                        <span className="visually-hidden">(current)</span>
                      )}
                    </MDBPaginationLink>
                  </MDBPaginationItem>
                );
              })}

              {/* Next Button */}
              <MDBPaginationItem disabled={page === pagesQuantity}>
                <MDBPaginationLink
                  onClick={() => page < pagesQuantity && handlePageChange(page + 1)}
                  style={{ 
                    cursor: page === pagesQuantity ? 'not-allowed' : 'pointer',
                    fontSize: windowWidth <= 480 ? '12px' : '14px'
                  }}
                >
                  {windowWidth <= 480 ? '›' : 'Next'}
                </MDBPaginationLink>
              </MDBPaginationItem>
            </MDBPagination>
          </div>
        )}

        {/* Additional Components */}
        <div className={styles.additionalSections}>
          <HowToUse />
          <ImageSection />
        </div>
      </MDBContainer>
    </div>
  );
};

export default Shops;
















