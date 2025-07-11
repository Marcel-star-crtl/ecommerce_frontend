import { React, useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link, useParams } from "react-router-dom";
import styles from "./stylee.module.css";
import ProductCard from "../../layout/ProductCard/ProductCard";
import ProductCardSkeleton from "../../layout/ProductCard/ProductCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./categorySlice";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

function CategoryPage() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { products, status, error, totalProductsCount } = useSelector(
    (state) => state.category
  );

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);
  useEffect(() => {
    dispatch(fetchCategories({ categoryId, pageSize, page }));
  }, [categoryId, dispatch, page, pageSize]);

  useEffect(() => {
    // calculate the total number of pages
    const totalPages = Math.ceil(totalProductsCount / pageSize);

    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (status === "failed") {
      console.log("categoryPage Error:", error);
    }
  }, [status, error]);

  return (
    <MDBContainer fluid className="my-5">
      <h1 className="">
        {status === "succeeded" && products.length
          ? products[0].category.name
          : ""}
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
        ) : status === "succeeded" && products.length ? (
          <>
            {products.map((product) => (
              <div className="col-md-3">
                <ProductCard key={product.id} product={product} />
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
              {/* <img src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"} /> TODO: fix the img */}
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
            {/* <img src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"} /> TODO: fix the img */}
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
