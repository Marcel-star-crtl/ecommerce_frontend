
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link, useParams, useLocation } from "react-router-dom"; 
import styles from "./stylee.module.css";
import ProductCard from "../../layout/ProductCard/ProductCard";
import ProductCardSkeleton from "../../layout/ProductCard/ProductCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsByCategory } from "./categorySlice"; 
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

function CategoryPage() {
  const { id } = useParams(); 
  const categoryId = id;

  const location = useLocation(); 
  const { categoryName: passedCategoryName } = location.state || {};

  const dispatch = useDispatch();
  const { products, status, error, totalProductsCount, currentCategoryName } = useSelector(
    (state) => state.category 
  );

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchProductsByCategory({ categoryId, pageSize, page }));
    } else {
      console.warn("CategoryPage useEffect: categoryId is undefined. Cannot fetch products.");
    }
  }, [categoryId, dispatch, page, pageSize]); 

  useEffect(() => {
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (status === "failed") {
      console.error("CategoryPage Error:", error); 
    }
  }, [status, error]);

  const displayCategoryName = currentCategoryName || passedCategoryName || "Category";

  return (
    <MDBContainer fluid className="my-5">
      <h1 className="">
        {displayCategoryName}
      </h1>
      <br />
      <MDBRow>
        {status === "loading" ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : status === "succeeded" && products && products.length > 0 ? (
          <>
            {products.map((product) => (
              <div className="col-md-3" key={product._id}> 
                <ProductCard product={product} />
              </div>
            ))}
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
          </>
        ) : (
          status === "succeeded" && ( 
            <div
              className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
            >
              <h3>There are no products in this category yet</h3>
              <span className="text-muted">
                Check all the other Awesome products we have!
              </span>
              <Link
                to="/home"
                className={`{styles.color} btn btn-primary my-3`}
              >
                Home
              </Link>
            </div>
          )
        )}
        {status === "failed" && ( 
          <div
            className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
          >
            <h3>
              OPS, It looks like we have an error on this page, don't worry we
              will fix it soon enough
            </h3>
            <span className="text-muted">
              In the mean time, Why don't you check all the other Awesome
              products we have!
            </span>
            <Link to="/home" className={`{styles.color} btn btn-primary my-3`}>
              {" "}
              Home
            </Link>
          </div>
        )}
      </MDBRow>
    </MDBContainer>
  );
}

export default CategoryPage;