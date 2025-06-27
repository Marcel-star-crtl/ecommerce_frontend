// // Wishlist.js
// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchWishlist, deleteWishlistProduct } from "./wishlistSlice";
// import { addToCart } from "../cart/cartSlice";
// import { toast } from "react-toastify";

// export default function Wishlist() {
//   const dispatch = useDispatch();
//   const {
//     products,
//     fetchStatus,
//     deleteStatus,
//     error,
//     totalProductsCount
//   } = useSelector((state) => state.wishlist);

//   useEffect(() => {
//     dispatch(fetchWishlist());
//   }, [dispatch]);

//   const handleDelete = async (productId) => {
//     try {
//       await dispatch(deleteWishlistProduct(productId)).unwrap();
//       toast.success("Removed from wishlist");
//       // Refresh the wishlist after deletion
//       dispatch(fetchWishlist());
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   const handleAddToCart = (product) => {
//     dispatch(addToCart({ 
//       productId: product.id,
//       quantity: 1,
//       price: product.price
//     }));
//     toast.success("Added to cart");
//   };

//   if (fetchStatus === "loading") {
//     return <div className="loading-spinner">Loading...</div>;
//   }

//   if (fetchStatus === "failed") {
//     return <div className="error-message">{error}</div>;
//   }

//   if (fetchStatus === "succeeded" && (!products || products.length === 0)) {
//     return (
//       <div className="empty-wishlist">
//         <h3>Your Wishlist is empty</h3>
//         <p>Start adding some products!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="wishlist-container">
//       <h2>Your Wishlist ({totalProductsCount})</h2>
      
//       <div className="wishlist-items">
//         {products.map((product) => (
//           <div key={product.id} className="wishlist-item">
//             <div className="product-image">
//               <img 
//                 src={product.images[0]?.image || 'default-image.jpg'} 
//                 alt={product.name}
//               />
//             </div>
            
//             <div className="product-details">
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <p>${product.price.toFixed(2)}</p>
//             </div>
            
//             <div className="product-actions">
//               <button 
//                 onClick={() => handleAddToCart(product)}
//                 disabled={product.quantity === 0}
//               >
//                 {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
//               </button>
              
//               <button 
//                 onClick={() => handleDelete(product.id)}
//                 disabled={deleteStatus === "loading"}
//               >
//                 {deleteStatus === "loading" ? "Removing..." : "Remove"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }









import { useEffect, useState } from "react";

// Mock data for demonstration - replace with actual Redux state
const mockWishlistData = [
  {
    id: 1,
    name: "Shyneen Glow",
    description: "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap",
    itemNumber: "2678394",
    size: "1 oz/30 mL",
    price: 65.00,
    images: [{ image: "photo-1620916566398-39f1143ab7be" }]
  },
  {
    id: 2,
    name: "Shyneen Glow",
    description: "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap",
    itemNumber: "2678394",
    size: "1 oz/30 mL",
    price: 65.00,
    images: [{ image: "photo-1620916566398-39f1143ab7be" }]
  },
  {
    id: 3,
    name: "Shyneen Glow",
    description: "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap",
    itemNumber: "2678394",
    size: "1 oz/30 mL",
    price: 65.00,
    images: [{ image: "photo-1620916566398-39f1143ab7be" }]
  }
];

export default function Wishlist() {
  // Mock dispatch for demonstration
  const dispatch = (action) => console.log('Dispatch:', action);
  
  // Use mock data for demo - replace with actual Redux selectors
  const products = mockWishlistData;
  const fetchStatus = "succeeded";
  const error = null;
  const totalProductsCount = 3;

  // Uncomment these lines to use actual Redux state
  // const { products, fetchStatus, error, totalProductsCount } = useSelector(
  //   (state) => state.wishlist
  // );

  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  const deleteItem = (id) => {
    console.log('Deleting wishlist item:', id);
    // dispatch(deleteWishlistProduct(id));
  };

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    // Add your cart logic here
  };

  const toggleWishlist = (id) => {
    console.log('Toggling wishlist for product:', id);
    // Add your wishlist toggle logic here
  };

  useEffect(() => {
    // dispatch(fetchWishlist({ pageSize, page }));
    console.log('Fetching wishlist...');
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (fetchStatus === "failed") {
    return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  // Empty wishlist state
  if (fetchStatus === "succeeded" && (!products || products.length === 0)) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '60px 40px',
          // borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#f0f0f0',
            // borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '32px',
            color: '#ccc'
          }}>
            ❤️
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#333',
            margin: '0 0 10px 0'
          }}>
            Your Wishlist looks empty
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: '0 0 25px 0'
          }}>
            What are you waiting for?
          </p>
          <button
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#E8A5C4',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              // borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
          >
            START SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '400',
            color: '#333',
            margin: '0 0 30px 0'
          }}>
            Loves
          </h1>
          
          {/* Navigation Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '20px',
            borderBottom: '1px solid #e0e0e0'
          }}>
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#333',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Share
            </button>
            
            <div style={{
              fontSize: '14px',
              color: '#666'
            }}>
              Sort by: <strong>Recently Added</strong>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {fetchStatus === "loading" && (
          <div style={{ 
            height: '350px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #E8A5C4',
              // borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}

        {/* Products List */}
        {fetchStatus === "succeeded" && products && products.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1px'
          }}>
            {products.map((product, index) => (
              <div key={product.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '30px 0',
                borderBottom: index < products.length - 1 ? '1px solid #f0f0f0' : 'none',
                gap: '20px'
              }}>
                {/* Product Image */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  backgroundColor: '#f0f4ff',
                  // borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  border: '1px solid #e8f0fe'
                }}>
                  <img 
                    src={`https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80`}
                    alt={product.name}
                    style={{
                      width: '90px',
                      height: '90px',
                      objectFit: 'contain',
                      cursor: 'pointer'
                    }}
                    onClick={() => console.log('Navigate to product:', product.id)}
                  />
                </div>

                {/* Product Details */}
                <div style={{
                  flex: 1,
                  paddingRight: '20px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333',
                    margin: '0 0 8px 0',
                    cursor: 'pointer'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    margin: '0 0 8px 0',
                    lineHeight: '1.5'
                  }}>
                    {product.description}
                  </p>

                  <p style={{
                    fontSize: '13px',
                    color: '#999',
                    margin: '0 0 8px 0',
                    letterSpacing: '0.5px'
                  }}>
                    ITEM {product.itemNumber}
                  </p>

                  <p style={{
                    fontSize: '14px',
                    color: '#333',
                    margin: '0 0 12px 0'
                  }}>
                    Size: {product.size}
                  </p>

                  <button 
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '14px',
                      color: '#4285f4',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: '0',
                      fontWeight: '500'
                    }}
                  >
                    View similar products
                  </button>
                </div>

                {/* Price and Actions */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '15px',
                  minWidth: '200px'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    ${product.price.toFixed(2)}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                  }}>
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#E8A5C4',
                        color: 'white',
                        border: 'none',
                        // borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
                    >
                      ADD TO CART
                    </button>

                    {/* Heart Icon */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        color: '#ff4757',
                        cursor: 'pointer',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination - if needed */}
        {pagesQuantity > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
            gap: '10px'
          }}>
            {Array.from({ length: pagesQuantity }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  backgroundColor: index + 1 === page ? '#E8A5C4' : 'white',
                  color: index + 1 === page ? 'white' : '#333',
                  cursor: 'pointer',
                  // borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add CSS for loading spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}










// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchWishlist, deleteWishlistProduct } from "./wishlistSlice";
// import { Link } from "react-router-dom";
// import { Spinner } from "@chakra-ui/react";

// import {
//   MDBBadge,
//   MDBContainer,
//   MDBCard,
//   MDBRow,
//   MDBCol,
//   MDBCardBody,
//   MDBCardImage,
//   MDBRipple,
//   MDBBtn,
//   MDBPagination,
//   MDBPaginationItem,
//   MDBPaginationLink,
// } from "mdb-react-ui-kit";

// import styles from "./stylee.module.css";
// import Button from "../layout/btn/btn";

// export default function App() {
//   const dispatch = useDispatch();
//   const { products, fetchStatus, error, totalProductsCount } = useSelector(
//     (state) => state.wishlist
//   );

//   const [pageSize, setPageSize] = useState(6);
//   const [page, setPage] = useState(1);
//   const [pagesQuantity, setPagesQuantity] = useState(0);

//   const deletItem = (id) => {
//     dispatch(deleteWishlistProduct(id));
//   };

//   useEffect(() => {
//     dispatch(fetchWishlist({ pageSize, page }));
//   }, [dispatch, page, pageSize]);

//   useEffect(() => {
//     // calculate the total number of pages
//     const totalPages = Math.ceil(totalProductsCount / pageSize);

//     setPagesQuantity(totalPages);
//   }, [pageSize, totalProductsCount]);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   if (fetchStatus === "failed") {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className={styles.body}>
//       <div
//         className={`${styles.whichlistTitle} d-flex mb-5 flex-column align-items-center`}
//       >
//         <i className="fa-regular fa-xl fa-heart my-4"></i>
//         <h1>My wishlist</h1>
//       </div>

//       <MDBContainer
//         fluid
//         className="text-black w-100 m-auto "
//         style={{ borderRadius: "25px" }}
//       >
//         <MDBRow className="justify-content-center mb-0">
//           <MDBCol md="12" xl="10">
//             {fetchStatus === "loading" ? (
//               <div style={{ height: "350px", display: "flex" }}>
//                 <Spinner style={{ margin: "auto" }} />
//               </div>
//             ) : fetchStatus === "succeeded" && products.length ? (
//               <div className={`${styles.whishListTable}`}>
//                 {products.map((el, i) => (
//                   <MDBCard
//                     key={el.id}
//                     className="shadow-0 border rounded-3 mb-3"
//                   >
//                     <MDBCardBody>
//                       <MDBRow>
//                         <MDBCol
//                           md="12"
//                           lg="3"
//                           className="mb-4 mb-lg-0 d-flex align-items-center"
//                         >
//                           <MDBRipple
//                             rippleColor="light"
//                             rippleTag="div"
//                             className="bg-image rounded hover-zoom hover-overlay"
//                           >
//                             <MDBCardImage
//                               src={`https://res.cloudinary.com/ddlhwv65t/${
//                                 el.images.length && el.images[0].image
//                               }`}
//                               fluid
//                               className=""
//                               style={{ width: "300px", height: "160px" }}
//                             />
//                             <Link to={`/product/${el.id}`}>
//                               <div
//                                 className="mask"
//                                 style={{
//                                   backgroundColor: "rgba(251, 251, 251, 0.15)",
//                                 }}
//                               ></div>
//                             </Link>
//                           </MDBRipple>
//                         </MDBCol>
//                         <MDBCol
//                           md="6"
//                           className="d-flex justify-content-between flex-column"
//                         >
//                           <Link to={`/product/${el.id}`}>
//                             <h5>{el.name}</h5>
//                           </Link>
//                           <span>Quantity {el.quantity}</span>

//                           <div className="mt-1 mb-0 text-muted small">
//                             <MDBBadge
//                               pill
//                               color={
//                                 el.quantity === 0
//                                   ? "danger"
//                                   : el.quantity < 11
//                                   ? "warning"
//                                   : "success"
//                               }
//                             >
//                               {el.quantity === 0
//                                 ? "Out of Stock"
//                                 : el.quantity < 11
//                                 ? "limited"
//                                 : "InStock"}
//                             </MDBBadge>
//                           </div>
//                           <p className=" mb-4 mb-md-0">{el.description}</p>
//                         </MDBCol>
//                         <MDBCol
//                           md="6"
//                           lg="3"
//                           className="border-sm-start-none border-start"
//                         >
//                           <div className="d-flex flex-row align-items-center justify-content-between mb-1">
//                             <h4 className="mb-1 me-1">${el.price}</h4>
//                             {/* <span className="text-danger">
//                               <s>$20.99</s>
//                             </span> */}
//                             <button>
//                               <i
//                                 className="fa-solid fa-trash text-secondary"
//                                 onClick={() => deletItem(el.id)}
//                               ></i>
//                             </button>
//                           </div>
//                           <h6 className="text-success">Free shipping</h6>
//                           <div className="d-flex flex-column mt-4 gap-2 w-100">
//                             <Link to={`/product/${el.id}`} className="w-100">
//                               <MDBBtn
//                                 outline
//                                 color="primary"
//                                 size="sm"
//                                 className="w-100"
//                               >
//                                 Details
//                               </MDBBtn>{" "}
//                             </Link>
//                             <Button el={el} />
//                           </div>
//                         </MDBCol>
//                       </MDBRow>
//                     </MDBCardBody>
//                   </MDBCard>
//                 ))}
//                 <nav aria-label="..." className={`${styles.pagination}`}>
//                   <MDBPagination center size="lg" className="mb-0">
//                     {Array.from({ length: pagesQuantity }, (_, index) => (
//                       <MDBPaginationItem
//                         key={index}
//                         active={index + 1 === page}
//                       >
//                         <MDBPaginationLink
//                           onClick={() => handlePageChange(index + 1)}
//                         >
//                           {index + 1}
//                           {index + 1 === page && (
//                             <span className="visually-hidden">(current)</span>
//                           )}
//                         </MDBPaginationLink>
//                       </MDBPaginationItem>
//                     ))}
//                   </MDBPagination>
//                 </nav>
//               </div>
//             ) : (
//               <MDBCard>
//                 <div
//                   className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
//                 >
//                   <img
//                     src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"}
//                     alt="empty-state-cart"
//                   />
//                   <h3>Your Wishlist looks empty</h3>
//                   <span className="text-muted">What are you waiting for?</span>
//                   <Link
//                     to="/home"
//                     className={`{styles.color} btn btn-primary my-3`}
//                   >
//                     START SHOPING
//                   </Link>
//                 </div>
//               </MDBCard>
//             )}
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//   );
// }
