// import { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// import styles from "./stylee.module.css";

// import InputQuantity from "../layout/input/inputQuantity";

// import { MDBCard, MDBCardImage, MDBRipple } from "mdb-react-ui-kit";
// import Sticky from "react-stickynode";

// import CheckoutButton from "./CheckoutButton";
// import { deleteCartProduct, fetchCart } from "./cartSlice";

// function Cart() {
//   const dispatch = useDispatch();
//   const { products, cartId, cartCount, totalPrice } = useSelector(
//     (state) => state.cart
//   );

//   const componentRef = useRef(null);
//   const [height, setHeight] = useState();

//   useEffect(() => {
//     if (componentRef.current) {
//       setHeight(componentRef.current.clientHeight);
//     }
//   }, [products]);

//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   useEffect(() => {
//     if (isLoggedIn) {
//       dispatch(fetchCart());
//     }
//   }, [dispatch, isLoggedIn]);

//   const deleteItem = (id) => {
//     dispatch(deleteCartProduct(id));
//   };

//   return (
//     <div
//       className={`${styles.body} container-fluid w-100 sticky-outer`}
//       ref={componentRef}
//     >
//       <div className="title">
//         <h2 className="d-inline-block text-start mb-4">Shopping Cart</h2>
//         <span> ({cartCount} items)</span>
//       </div>

//       {products.length ? (
//         <div
//           className={`d-flex ${styles.parent} flex-column flex-md-row w-100 gap-3 position-relative`}
//         >
//           <div className={`${styles.leftSide} d-flex flex-column`}>
//             <div className="containerProduct d-flex flex-column gap-3">
//               {products.map((el) => (
//                 <div
//                   className={`${styles.product} d-flex gap-4 bg-light p-4 align-items-stretch justify-content-evenly ${styles.boxShadow}`}
//                   key={el.id}
//                 >
//                   <div
//                     className={`${styles.productImage} d-flex w-25 align-items-center justify-content-center`}
//                   >
//                     <MDBRipple
//                       rippleColor="light"
//                       rippleTag="div"
//                       className="bg-image rounded hover-zoom hover-overlay"
//                     >
//                       <MDBCardImage
//                         src={el.images.length && el.images[0]}
//                         fluid
//                         className={`${styles.img}`}
//                       />
//                       <Link to={`/product/${el.id}`}>
//                         <div
//                           className="mask"
//                           style={{
//                             backgroundColor: "rgba(251, 251, 251, 0.15)",
//                           }}
//                         ></div>
//                       </Link>
//                     </MDBRipple>
//                   </div>

//                   <div
//                     className="d-flex gap-4 flex-column flex-md-row 
//               "
//                   >
//                     <div className="productDetails d-flex flex-column justify-content-center ">
//                       <Link to={`/product/${el.id}`}>
//                         <span className="text-muted">{el.name}</span>
//                       </Link>
//                       <p>{el.description}</p>
//                       <span className="text-muted" style={{ fontSize: "14px" }}>
//                         Order Within 24 hr
//                       </span>
//                       <p>Free delivery by Sat, May 6</p>
//                       <span className="text-muted">Sold by Whirlpool</span>
//                       <div>
//                         <button
//                           className="text-start d-inline"
//                           onClick={() => deleteItem(el.id)}
//                         >
//                           <i className="fa-solid fa-trash"></i>{" "}
//                           <span> Remove</span>
//                         </button>
//                       </div>
//                     </div>

//                     <div
//                       className={`py-3 d-flex  flex-md-column flex-row justify-content-between align-items-center`}
//                     >
//                       <h3>$ {el.price}</h3>
//                       <InputQuantity id={el.id} />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <Sticky enabled={true} top={50} bottomBoundary={height + 130}>
//             <div
//               className={`${styles.rightSide} `}
//               style={{
//                 minWidth: "28vw",
//                 willChange: "transform",
//                 transition: "transform 0.3s ease-out",
//               }}
//             >
//               <div
//                 className={`d-flex flex-column gap-2 bg-light p-3 w-100 ${styles.boxShadow}`}
//               >
//                 <h3>Order Summary</h3>
//                 <div className="d-flex">
//                   <input
//                     className="form-control "
//                     type="text"
//                     placeholder="Coupon Code"
//                   />
//                   <button className={`btn btn-primary ${styles.btnColor} `}>
//                     Apply
//                   </button>
//                 </div>
//                 <div className="d-flex gap-2 flex-column border-bottom border-secondary">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="text-muted">
//                       Subtotal ({cartCount} items)
//                     </span>
//                     <h4>$ {totalPrice}</h4>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span className="text-muted">shipping</span>
//                     <h4 className={`${styles.color}`}>Free</h4>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-2 flex-column">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <span>Subtotal ({cartCount} items) </span>
//                     <h4>$ {totalPrice}</h4>
//                   </div>
//                   <CheckoutButton cartId={cartId}></CheckoutButton>
//                 </div>
//               </div>
//             </div>
//           </Sticky>
//         </div>
//       ) : (
//         <MDBCard
//           className="text-black w-75 m-auto "
//           style={{ borderRadius: "25px" }}
//         >
//           <div
//             className={`d-flex flex-column justify-content-center align-items-center ${styles.parent} m-5`}
//           >
//             <img
//               src={process.env.PUBLIC_URL + "assets/empty-state-cart.svg"}
//               alt="empty cart"
//             />
//             <h3>Your shopping cart looks empty</h3>
//             <span className="text-muted">What are you waiting for?</span>
//             <Link to="/home" className={`{styles.color} btn btn-primary my-3`}>
//               START CHOPING
//             </Link>
//           </div>
//         </MDBCard>
//       )}
//     </div>
//   );
// }

// export default Cart;









import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutButton from "./CheckoutButton";

// Assuming these actions exist in your cart slice
import { deleteCartProduct, fetchCart, updateCartQuantity } from './cartSlice';

function Cart() {
  const dispatch = useDispatch();
  
  // Redux state selectors
  const { products, cartId, cartCount, totalPrice } = useSelector(
    (state) => state.cart
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const componentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (componentRef.current) {
      setHeight(componentRef.current.clientHeight);
    }
  }, [products]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
      console.log('Fetching cart for logged in user');
    }
  }, [dispatch, isLoggedIn]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleDeleteItem(id);
      return;
    }
    // dispatch(updateCartQuantity({ id, quantity: newQuantity }));
    console.log('Updating quantity:', { id, quantity: newQuantity });
  };

  const handleDeleteItem = (id) => {
    // dispatch(deleteCartProduct(id));
    console.log('Deleting item:', id);
  };

  // Calculate derived values
  const subtotal = totalPrice || (products?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0);
  const shipping = 0; 
  const tax = subtotal * 0.08; 
  const total = subtotal + shipping + tax;
  const itemCount = cartCount || products?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  // Empty cart state
  if (!products?.length) {
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
          borderRadius: '12px',
          textAlign: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '32px',
            color: '#ccc'
          }}>
            🛒
          </div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '500',
            color: '#333',
            margin: '0 0 10px 0'
          }}>
            Your shopping cart looks empty
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#666',
            margin: '0 0 25px 0'
          }}>
            What are you waiting for?
          </p>
          <Link 
            to="/home"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#E8A5C4',
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
          >
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={componentRef}
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '400',
              color: '#333',
              margin: '0',
              display: 'inline-block'
            }}>
              Shopping Cart
            </h1>
            <span style={{
              fontSize: '16px',
              color: '#666',
              marginLeft: '10px'
            }}>
              ({itemCount} items)
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer',
              textDecoration: 'underline'
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '40px'
        }}>
          {/* Cart Items */}
          <div>
            {products?.map((item, index) => (
              <div key={item.id || item._id} style={{
                display: 'flex',
                gap: '20px',
                paddingBottom: '25px',
                marginBottom: '25px',
                borderBottom: index < products.length - 1 ? '1px solid #f0f0f0' : 'none'
              }}>
                {/* Product Image */}
                <div style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Link to={`/product/${item.id || item._id}`}>
                    <img 
                      src={item.images?.[0]?.url || item.images?.[0] || item.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}
                      alt={item.name || item.title}
                      style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'contain'
                      }}
                    />
                  </Link>
                </div>

                {/* Product Details */}
                <div style={{ flex: 1 }}>
                  <Link 
                    to={`/product/${item.id || item._id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#333',
                      margin: '0 0 8px 0'
                    }}>
                      {item.name || item.title}
                    </h3>
                  </Link>
                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    margin: '0 0 8px 0',
                    lineHeight: '1.4'
                  }}>
                    {item.description || 'Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap'}
                  </p>
                  {item.itemNumber && (
                    <p style={{
                      fontSize: '12px',
                      color: '#999',
                      margin: '0 0 4px 0'
                    }}>
                      ITEM {item.itemNumber}
                    </p>
                  )}
                  {item.size && (
                    <p style={{
                      fontSize: '12px',
                      color: '#666',
                      margin: '0 0 8px 0'
                    }}>
                      Size: {item.size}
                    </p>
                  )}
                  {/* <p style={{
                    fontSize: '12px',
                    color: '#666',
                    margin: '0 0 8px 0'
                  }}>
                    Order Within 24 hr
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    margin: '0 0 8px 0'
                  }}>
                    Free delivery by Sat, May 6
                  </p> */}
                  <p style={{
                    fontSize: '12px',
                    color: '#666',
                    margin: '0 0 12px 0'
                  }}>
                    Sold by Shyneen
                  </p>
                  <button 
                    onClick={() => handleDeleteItem(item.id || item._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '12px',
                      color: '#E8A5C4',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: '0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                    <span>Remove</span>
                  </button>
                </div>

                {/* Price and Quantity */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  minWidth: '120px'
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    ${item.price?.toFixed(2)}
                  </div>
                  
                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '10px'
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) - 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      fontSize: '14px',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) + 1)}
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Sticky */}
          <div style={{
            position: 'sticky',
            top: '50px',
            height: 'fit-content'
          }}>
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '25px',
              border: '1px solid #e0e0e0'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#333',
                margin: '0 0 20px 0'
              }}>
                Order Summary
              </h3>

              {/* Coupon Code */}
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#E8A5C4',
                    color: 'white',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
                >
                  Apply
                </button>
              </div>

              <div style={{
                paddingBottom: '15px',
                marginBottom: '15px',
                borderBottom: '1px solid #ddd'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    Subtotal ({itemCount} items)
                  </span>
                  <span style={{ fontSize: '14px', color: '#333' }}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Shipping</span>
                  <span style={{ fontSize: '14px', color: '#E8A5C4', fontWeight: '500' }}>
                    Free
                  </span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '25px'
              }}>
                <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                  Total ({itemCount} items)
                </span>
                <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <CheckoutButton 
                cartId={cartId}
                products={products}
                totalAmount={total}
                disabled={!products?.length}
              />
              {/* <button
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#E8A5C4',
                  color: 'white',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  marginBottom: '15px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
                onClick={() => console.log('Proceeding to checkout with cartId:', cartId)}
              >
                Proceed to Checkout
              </button> */}

              {/* Continue Shopping */}
              <Link
                to="/home"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  fontSize: '14px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.borderColor = '#ccc';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#ddd';
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;









// import React, { useState, useEffect, useRef } from 'react';

// function Cart() {
//   // Mock Redux state for demonstration
//   const products = [
//     {
//       id: 1,
//       name: "Shyneen Glow",
//       description: "Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap",
//       itemNumber: "2678394",
//       size: "1 oz/30 mL",
//       price: 29.99,
//       quantity: 1,
//       images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"]
//     },
//     {
//       id: 2,
//       name: "Radiant Youth Serum",
//       description: "Advanced Anti-Aging Formula with Vitamin C and Hyaluronic Acid for glowing skin",
//       itemNumber: "2678395",
//       size: "1.5 oz/45 mL",
//       price: 39.99,
//       quantity: 2,
//       images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80"]
//     }
//   ];
  
//   const cartId = "cart_123";
//   const cartCount = products.reduce((sum, item) => sum + item.quantity, 0);
//   const totalPrice = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   const isLoggedIn = true;
  
//   const componentRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (componentRef.current) {
//       setHeight(componentRef.current.clientHeight);
//     }
//   }, [products]);

//   useEffect(() => {
//     if (isLoggedIn) {
//       console.log('Fetching cart for logged in user');
//     }
//   }, [isLoggedIn]);

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) {
//       handleDeleteItem(id);
//       return;
//     }
//     console.log('Updating quantity:', { id, quantity: newQuantity });
//   };

//   const handleDeleteItem = (id) => {
//     console.log('Deleting item:', id);
//   };

//   // Calculate derived values
//   const subtotal = totalPrice || (products?.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) || 0);
//   const shipping = 0; // Free shipping
//   const tax = subtotal * 0.08; // 8% tax
//   const total = subtotal + shipping + tax;
//   const itemCount = cartCount || products?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

//   // Empty cart state
//   if (!products?.length) {
//     return (
//       <div style={{
//         minHeight: '100vh',
//         backgroundColor: '#f8f9fa',
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         <div style={{
//           backgroundColor: 'white',
//           padding: '60px 40px',
//           borderRadius: '12px',
//           textAlign: 'center',
//           boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//           maxWidth: '500px'
//         }}>
//           <div style={{
//             width: '80px',
//             height: '80px',
//             backgroundColor: '#f0f0f0',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             margin: '0 auto 20px',
//             fontSize: '32px',
//             color: '#ccc'
//           }}>
//             🛒
//           </div>
//           <h3 style={{
//             fontSize: '20px',
//             fontWeight: '500',
//             color: '#333',
//             margin: '0 0 10px 0'
//           }}>
//             Your shopping cart looks empty
//           </h3>
//           <p style={{
//             fontSize: '14px',
//             color: '#666',
//             margin: '0 0 25px 0'
//           }}>
//             What are you waiting for?
//           </p>
//           <button
//             style={{
//               display: 'inline-block',
//               padding: '12px 24px',
//               backgroundColor: '#E8A5C4',
//               color: 'white',
//               textDecoration: 'none',
//               fontSize: '14px',
//               fontWeight: '500',
//               borderRadius: '4px',
//               border: 'none',
//               cursor: 'pointer',
//               transition: 'background-color 0.2s'
//             }}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
//           >
//             START SHOPPING
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       ref={componentRef}
//       style={{
//         minHeight: '100vh',
//         backgroundColor: '#f8f9fa',
//         padding: '20px',
//         fontFamily: 'Arial, sans-serif'
//       }}
//     >
//       <div style={{
//         maxWidth: '1200px',
//         margin: '0 auto',
//         backgroundColor: 'white',
//         padding: '30px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
//       }}>
//         {/* Header */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           marginBottom: '30px',
//           paddingBottom: '20px',
//           borderBottom: '1px solid #e0e0e0'
//         }}>
//           <div>
//             <h1 style={{
//               fontSize: '24px',
//               fontWeight: '400',
//               color: '#333',
//               margin: '0',
//               display: 'inline-block'
//             }}>
//               Shopping Cart
//             </h1>
//             <span style={{
//               fontSize: '16px',
//               color: '#666',
//               marginLeft: '10px'
//             }}>
//               ({itemCount} items)
//             </span>
//           </div>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '20px'
//           }}>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               fontSize: '14px',
//               color: '#666',
//               cursor: 'pointer',
//               textDecoration: 'underline'
//             }}>
//               Share
//             </button>
//             <div style={{
//               fontSize: '14px',
//               color: '#666'
//             }}>
//               Sort by: <strong>Recently Added</strong>
//             </div>
//           </div>
//         </div>

//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: '2fr 1fr',
//           gap: '40px'
//         }}>
//           {/* Cart Items */}
//           <div>
//             {products?.map((item, index) => (
//               <div key={item.id || item._id} style={{
//                 display: 'flex',
//                 gap: '20px',
//                 paddingBottom: '25px',
//                 marginBottom: '25px',
//                 borderBottom: index < products.length - 1 ? '1px solid #f0f0f0' : 'none'
//               }}>
//                 {/* Product Image */}
//                 <div style={{
//                   width: '120px',
//                   height: '120px',
//                   backgroundColor: '#f0f4ff',
//                   borderRadius: '8px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   flexShrink: 0,
//                   border: '1px solid #e8f0fe'
//                 }}>
//                   <img 
//                     src={item.images?.[0]?.url || item.images?.[0] || item.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'}
//                     alt={item.name || item.title}
//                     style={{
//                       width: '90px',
//                       height: '90px',
//                       objectFit: 'contain',
//                       cursor: 'pointer'
//                     }}
//                   />
//                 </div>

//                 {/* Product Details */}
//                 <div style={{ flex: 1 }}>
//                   <h3 style={{
//                     fontSize: '18px',
//                     fontWeight: '600',
//                     color: '#333',
//                     margin: '0 0 8px 0',
//                     cursor: 'pointer'
//                   }}>
//                     {item.name || item.title}
//                   </h3>
                  
//                   <p style={{
//                     fontSize: '14px',
//                     color: '#666',
//                     margin: '0 0 12px 0',
//                     lineHeight: '1.5'
//                   }}>
//                     {item.description || 'Celestial Nightly Skin Repair Oil Serum for firming, Hydrating and Restoring + Soap'}
//                   </p>

//                   <p style={{
//                     fontSize: '13px',
//                     color: '#999',
//                     margin: '0 0 8px 0',
//                     letterSpacing: '0.5px'
//                   }}>
//                     ITEM {item.itemNumber || '2678394'}
//                   </p>

//                   <p style={{
//                     fontSize: '14px',
//                     color: '#333',
//                     margin: '0 0 12px 0',
//                     fontWeight: '500'
//                   }}>
//                     Size: {item.size || '1 oz/30 mL'}
//                   </p>

//                   <button 
//                     style={{
//                       background: 'none',
//                       border: 'none',
//                       fontSize: '14px',
//                       color: '#4285f4',
//                       cursor: 'pointer',
//                       textDecoration: 'underline',
//                       padding: '0',
//                       fontWeight: '500'
//                     }}
//                   >
//                     View similar products
//                   </button>

//                   <div style={{ marginTop: '15px' }}>
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 4px 0'
//                     }}>
//                       Order Within 24 hr
//                     </p>
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 4px 0'
//                     }}>
//                       Free delivery by Sat, May 6
//                     </p>
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 12px 0'
//                     }}>
//                       Sold by Shyneen
//                     </p>
//                   </div>

//                   <button 
//                     onClick={() => handleDeleteItem(item.id || item._id)}
//                     style={{
//                       background: 'none',
//                       border: 'none',
//                       fontSize: '12px',
//                       color: '#0066cc',
//                       cursor: 'pointer',
//                       textDecoration: 'underline',
//                       padding: '0',
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '5px'
//                     }}
//                   >
//                     <span>🗑️</span>
//                     <span>Remove</span>
//                   </button>
//                 </div>

//                 {/* Price and Quantity */}
//                 <div style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'flex-end',
//                   justifyContent: 'space-between',
//                   minWidth: '120px'
//                 }}>
//                   <div style={{
//                     fontSize: '18px',
//                     fontWeight: '600',
//                     color: '#333',
//                     marginBottom: '10px'
//                   }}>
//                     ${item.price?.toFixed(2)}
//                   </div>
                  
//                   {/* Quantity Controls */}
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '10px',
//                     marginBottom: '10px'
//                   }}>
//                     <button
//                       onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) - 1)}
//                       style={{
//                         width: '28px',
//                         height: '28px',
//                         border: '1px solid #ddd',
//                         backgroundColor: 'white',
//                         fontSize: '16px',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: '4px'
//                       }}
//                     >
//                       −
//                     </button>
//                     <span style={{
//                       fontSize: '16px',
//                       minWidth: '30px',
//                       textAlign: 'center',
//                       fontWeight: '500'
//                     }}>
//                       {item.quantity || 1}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(item.id || item._id, (item.quantity || 1) + 1)}
//                       style={{
//                         width: '28px',
//                         height: '28px',
//                         border: '1px solid #ddd',
//                         backgroundColor: 'white',
//                         fontSize: '16px',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: '4px'
//                       }}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary - Sticky */}
//           <div style={{
//             position: 'sticky',
//             top: '50px',
//             height: 'fit-content'
//           }}>
//             <div style={{
//               backgroundColor: '#f8f9fa',
//               padding: '25px',
//               border: '1px solid #e0e0e0'
//             }}>
//               <h3 style={{
//                 fontSize: '18px',
//                 fontWeight: '500',
//                 color: '#333',
//                 margin: '0 0 20px 0'
//               }}>
//                 Order Summary
//               </h3>

//               {/* Coupon Code */}
//               <div style={{
//                 display: 'flex',
//                 gap: '10px',
//                 marginBottom: '20px'
//               }}>
//                 <input
//                   type="text"
//                   placeholder="Coupon Code"
//                   style={{
//                     flex: 1,
//                     padding: '8px 12px',
//                     border: '1px solid #ddd',
//                     fontSize: '14px',
//                     outline: 'none'
//                   }}
//                 />
//                 <button
//                   style={{
//                     padding: '8px 16px',
//                     backgroundColor: '#E8A5C4',
//                     color: 'white',
//                     border: 'none',
//                     fontSize: '14px',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.2s'
//                   }}
//                   onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
//                   onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
//                 >
//                   Apply
//                 </button>
//               </div>

//               <div style={{
//                 paddingBottom: '15px',
//                 marginBottom: '15px',
//                 borderBottom: '1px solid #ddd'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginBottom: '12px'
//                 }}>
//                   <span style={{ fontSize: '14px', color: '#666' }}>
//                     Subtotal ({itemCount} items)
//                   </span>
//                   <span style={{ fontSize: '14px', color: '#333' }}>
//                     ${subtotal.toFixed(2)}
//                   </span>
//                 </div>

//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   marginBottom: '12px'
//                 }}>
//                   <span style={{ fontSize: '14px', color: '#666' }}>Shipping</span>
//                   <span style={{ fontSize: '14px', color: '#E8A5C4', fontWeight: '500' }}>
//                     Free
//                   </span>
//                 </div>
//               </div>

//               <div style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 marginBottom: '25px'
//               }}>
//                 <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
//                   Total ({itemCount} items)
//                 </span>
//                 <span style={{ fontSize: '16px', fontWeight: '500', color: '#333' }}>
//                   ${subtotal.toFixed(2)}
//                 </span>
//               </div>

//               {/* Checkout Button */}
//               <button
//                 style={{
//                   width: '100%',
//                   padding: '15px',
//                   backgroundColor: '#E8A5C4',
//                   color: 'white',
//                   border: 'none',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.2s',
//                   marginBottom: '15px'
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
//                 onClick={() => console.log('Proceeding to checkout with cartId:', cartId)}
//               >
//                 Proceed to Checkout
//               </button>

//               {/* Continue Shopping */}
//               <button
//                 style={{
//                   display: 'block',
//                   width: '100%',
//                   padding: '12px',
//                   backgroundColor: 'transparent',
//                   color: '#666',
//                   border: '1px solid #ddd',
//                   fontSize: '14px',
//                   fontWeight: '400',
//                   cursor: 'pointer',
//                   transition: 'all 0.2s',
//                   textAlign: 'center',
//                   textDecoration: 'none',
//                   boxSizing: 'border-box'
//                 }}
//                 onMouseOver={(e) => {
//                   e.target.style.backgroundColor = '#f8f9fa';
//                   e.target.style.borderColor = '#ccc';
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.backgroundColor = 'transparent';
//                   e.target.style.borderColor = '#ddd';
//                 }}
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;