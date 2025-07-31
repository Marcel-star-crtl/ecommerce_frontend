import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import styles from "../Category/CategoryPage/stylee.module.css"; 
import ProductCard from "../../features/layout/ProductCard/ProductCard";
import ProductCardSkeleton from "../../features/layout/ProductCard/ProductCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory, fetchAllCategories } from "../Category/CategoryPage/categorySlice";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

const NewArrivals = () => {
  const dispatch = useDispatch();
  
  const { products, status, error, totalProductsCount } = useSelector(
    (state) => state.category
  );

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [newArrivalsCategory, setNewArrivalsCategory] = useState(null);

  const { allCategories, allCategoriesStatus } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (allCategoriesStatus === 'idle') {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, allCategoriesStatus]);

  useEffect(() => {
    if (allCategories && allCategories.length > 0) {
      const newArrivalsCategory = allCategories.find(
        category => category.title.toLowerCase().includes('newarrivals') ||
                   category.title.toLowerCase().includes('new arrivals') ||
                   category.title.toLowerCase().includes('new_arrivals') ||
                   category.title.toLowerCase() === 'newarrivals'
      );
      
      if (newArrivalsCategory) {
        setNewArrivalsCategory(newArrivalsCategory);
        console.log("NewArrivals: Found category:", newArrivalsCategory);
      } else {
        console.log("NewArrivals: Category not found in:", allCategories.map(c => c.title));
      }
    }
  }, [allCategories]);

  useEffect(() => {
    if (newArrivalsCategory && newArrivalsCategory._id) {
      console.log("NewArrivals: Dispatching fetchProductsByCategory for NewArrivals category:", newArrivalsCategory._id);
      dispatch(fetchProductsByCategory({ 
        categoryId: newArrivalsCategory._id, 
        pageSize, 
        page 
      }));
    }
  }, [newArrivalsCategory, dispatch, page, pageSize]);

  useEffect(() => {
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (status === "failed") {
      console.error("NewArrivals Error:", error);
    }
  }, [status, error]);

  const isLoading = allCategoriesStatus === 'loading' || 
                   (allCategoriesStatus === 'succeeded' && !newArrivalsCategory) ||
                   status === 'loading';

  const hasError = allCategoriesStatus === 'failed' || 
                  (allCategoriesStatus === 'succeeded' && allCategories.length > 0 && !newArrivalsCategory) ||
                  status === 'failed';

  return (
    <MDBContainer fluid className="my-5">
      <h1 className="mb-4 fw-bold text-dark">
        New Arrivals
      </h1>
      <br />
      <MDBRow>
        {isLoading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : hasError ? (
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
            style={{ minHeight: '400px', padding: '60px 20px' }}
          >
            <h3 className="text-dark fw-bold mb-3 text-center">
              {!newArrivalsCategory 
                ? "New Arrivals category not found" 
                : "OPS, It looks like we have an error on this page, don't worry we will fix it soon enough"
              }
            </h3>
            <span className="text-muted mb-4 text-center fs-6">
              In the mean time, Why don't you check all the other Awesome
              products we have!
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
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f691b2';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(248, 165, 194, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8a5c2';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              Home
            </Link>
          </div>
        ) : status === "succeeded" && products && products.length > 0 ? (
          <>
            {products.map((product) => (
              <div className="col-md-3" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
            {pagesQuantity > 1 && (
              <nav aria-label="..." className={`${styles.pagination}`}>
                <MDBPagination center size="lg" className="mb-0">
                  {Array.from({ length: pagesQuantity }, (_, index) => (
                    <MDBPaginationItem key={index} active={index + 1 === page}>
                      <MDBPaginationLink
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                        {index + 1 === page && (
                          <span className="visually-hidden">(current)</span>
                        )}
                      </MDBPaginationLink>
                    </MDBPaginationItem>
                  ))}
                </MDBPagination>
              </nav>
            )}
          </>
        ) : (
          status === "succeeded" && (
            <div
              className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
              style={{ minHeight: '400px', padding: '60px 20px' }}
            >
              <h3 className="text-dark fw-bold mb-3 text-center">
                No new arrivals available yet
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
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f691b2';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(248, 165, 194, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#f8a5c2';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                Home
              </Link>
            </div>
          )
        )}
      </MDBRow>
    </MDBContainer>
  );
};

export default NewArrivals;