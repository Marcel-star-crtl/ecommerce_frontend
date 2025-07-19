// import { React, useEffect, useState } from "react";
// import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
// import { Link, useParams } from "react-router-dom";
// import styles from "./stylee.module.css";
// import ProductCard from "../../layout/ProductCard/ProductCard";
// import ProductCardSkeleton from "../../layout/ProductCard/ProductCardSkeleton";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchCategories } from "./categorySlice";
// import {
//   MDBPagination,
//   MDBPaginationItem,
//   MDBPaginationLink,
// } from "mdb-react-ui-kit";

// function CategoryPage() {
//   const { categoryId } = useParams();
//   const dispatch = useDispatch();
//   const { products, status, error, totalProductsCount } = useSelector(
//     (state) => state.category
//   );

//   const [pageSize, setPageSize] = useState(8);
//   const [page, setPage] = useState(1);
//   const [pagesQuantity, setPagesQuantity] = useState(0);
//   useEffect(() => {
//     dispatch(fetchCategories({ categoryId, pageSize, page }));
//   }, [categoryId, dispatch, page, pageSize]);

//   useEffect(() => {
//     // calculate the total number of pages
//     const totalPages = Math.ceil(totalProductsCount / pageSize);

//     setPagesQuantity(totalPages);
//   }, [pageSize, totalProductsCount]);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   useEffect(() => {
//     if (status === "failed") {
//       console.log("categoryPage Error:", error);
//     }
//   }, [status, error]);

//   return (
//     <MDBContainer fluid className="my-5">
//       <h1 className="">
//         {status === "succeeded" && products.length
//           ? products[0].category.name
//           : ""}
//       </h1>
//       <br />
//       <MDBRow>
//         {status === "loading" ? (
//           <>
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//           </>
//         ) : status === "succeeded" && products.length ? (
//           <>
//             {products.map((product) => (
//               <div className="col-md-3">
//                 <ProductCard key={product.id} product={product} />
//               </div>
//             ))}
//             <nav aria-label="..." className={`${styles.pagination}`}>
//               <MDBPagination center size="lg" className="mb-0">
//                 {Array.from({ length: pagesQuantity }, (_, index) => (
//                   <MDBPaginationItem key={index} active={index + 1 === page}>
//                     <MDBPaginationLink
//                       onClick={() => handlePageChange(index + 1)}
//                     >
//                       {index + 1}
//                       {index + 1 === page && (
//                         <span className="visually-hidden">(current)</span>
//                       )}
//                     </MDBPaginationLink>
//                   </MDBPaginationItem>
//                 ))}
//               </MDBPagination>
//             </nav>
//           </>
//         ) : (
//           status === "succeeded" && (
//             <div
//               className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
//             >
//               {/* <img src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"} /> TODO: fix the img */}
//               <h3>There are no products in this category yet</h3>
//               <span className="text-muted">
//                 Check all the other Awesome products we have!
//               </span>
//               <Link
//                 to="/home"
//                 className={`{styles.color} btn btn-primary my-3`}
//               >
//                 Home
//               </Link>
//             </div>
//           )
//         )}
//         {status === "failed" && (
//           <div
//             className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
//           >
//             {/* <img src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"} /> TODO: fix the img */}
//             <h3>
//               OPS, It looks like we have an error on this page, don't worry we
//               will fix it soon enough
//             </h3>
//             <span className="text-muted">
//               In the mean time, Why don't you check all the other Awesome
//               products we have!
//             </span>
//             <Link to="/home" className={`{styles.color} btn btn-primary my-3`}>
//               {" "}
//               Home
//             </Link>
//           </div>
//         )}
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default CategoryPage;











// src/CategoryPage/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { Link, useParams, useLocation } from "react-router-dom"; // Import useLocation
import styles from "./stylee.module.css";
import ProductCard from "../../layout/ProductCard/ProductCard";
import ProductCardSkeleton from "../../layout/ProductCard/ProductCardSkeleton";
import { useSelector, useDispatch } from "react-redux";
// Import the correct thunk for fetching products by category
import { fetchProductsByCategory } from "./categorySlice"; // Ensure this path is correct for your main category slice
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";

function CategoryPage() {
  // *** MODIFICATION: Assume route parameter is :id, common for IDs ***
  const { id } = useParams(); // Extract 'id' from URL parameters
  const categoryId = id; // Assign to categoryId for consistent naming

  const location = useLocation(); // Get location object to access state
  const { categoryName: passedCategoryName } = location.state || {}; // Get categoryName from state

  const dispatch = useDispatch();
  // Access state from the category slice
  const { products, status, error, totalProductsCount, currentCategoryName } = useSelector(
    (state) => state.category // Assuming your root reducer has category: categoryReducer
  );

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  useEffect(() => {
    // *** MODIFICATION: Only dispatch if categoryId is available ***
    if (categoryId) {
      console.log("CategoryPage useEffect: Dispatching fetchProductsByCategory for ID:", categoryId);
      dispatch(fetchProductsByCategory({ categoryId, pageSize, page }));
    } else {
      console.warn("CategoryPage useEffect: categoryId is undefined. Cannot fetch products.");
      // Optional: You might want to redirect the user or show a specific error if ID is missing
      // navigate('/error-page');
    }
  }, [categoryId, dispatch, page, pageSize]); // Depend on categoryId, page, pageSize

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
      console.error("CategoryPage Error:", error); // Use console.error for errors
    }
  }, [status, error]);

  // Use the category name from Redux state (currentCategoryName) or passed via navigation state
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
              <div className="col-md-3" key={product._id}> {/* Use product._id if that's what your backend provides */}
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
        {status === "failed" && ( // This block executes if status is failed
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