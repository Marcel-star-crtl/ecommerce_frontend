import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./stylee.module.css";

function CheckoutButton({ cartId, products, totalAmount, disabled }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleCheckout = async () => {
    // Validate cart exists
    if (!cartId) {
      setError("No active cart found. Please try again.");
      return;
    }

    // Validate cart is not empty
    if (disabled || !products?.length) {
      setError("Your cart is empty. Please add items before checkout.");
      return;
    }

    // Validate user is logged in
    if (!user) {
      setError("Please login to complete checkout");
      console.log("user data", user)
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare cart data to pass to checkout page
      const checkoutData = {
        cartId,
        products: products.map(item => ({
          id: item.id || item._id,
          name: item.name || item.title,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.images?.[0]?.url || item.images?.[0] || item.image,
          description: item.description,
          size: item.size
        })),
        subtotal: totalAmount || products.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0),
        shipping: 0, // Free shipping
        tax: (totalAmount * 0.08) || (products.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) * 0.08),
        total: totalAmount + (totalAmount * 0.08) || 
              products.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) * 1.08
      };

      // Navigate to custom checkout page with cart data
      navigate('/checkout', { 
        state: { 
          checkoutData,
          userInfo: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
          }
        } 
      });

    } catch (err) {
      console.error("Checkout navigation error:", err);
      setError("Failed to proceed to checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div style={{
          color: 'red',
          marginBottom: '15px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      <button
        className={`btn btn-primary ${styles.btnColor} w-100`}
        onClick={handleCheckout}
        disabled={isLoading || disabled}
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
          marginBottom: '15px',
          opacity: (isLoading || disabled) ? 0.7 : 1
        }}
        onMouseOver={(e) => !isLoading && !disabled && (e.target.style.backgroundColor = '#E298BC')}
        onMouseOut={(e) => !isLoading && !disabled && (e.target.style.backgroundColor = '#E8A5C4')}
      >
        {isLoading ? 'Processing...' : 'Proceed to Checkout'}
      </button>
    </div>
  );
}

export default CheckoutButton;









// import { useState } from "react";
// import api from "../../api/api";
// import { useDispatch } from "react-redux";
// import { resetCart } from "./cartSlice";
// import { useNavigate } from "react-router-dom";
// import styles from "./stylee.module.css";

// function CheckoutButton({ cartId, products, totalAmount, disabled }) {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleCheckout = async () => {
//     if (!cartId) {
//       setError("No active cart found. Please try again.");
//       return;
//     }

//     if (disabled || !products?.length) {
//       setError("Your cart is empty. Please add items before checkout.");
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Prepare order data
//       const orderData = {
//         cartId,
//         products: products.map(item => ({
//           productId: item.id || item._id,
//           quantity: item.quantity || 1,
//           price: item.price
//         })),
//         totalAmount,
//         currency: "USD"
//       };

//       // Create payment session
//       const response = await api.post("/orders/create-checkout-session", orderData);
      
//       if (response.data.url) {
//         // Redirect to Stripe/PayPal checkout page
//         window.location.href = response.data.url;
//       } else {
//         // Handle other payment methods or direct checkout
//         dispatch(resetCart());
//         navigate("/checkout/success", { state: { orderId: response.data.orderId } });
//       }
//     } catch (err) {
//       console.error("Checkout error:", err);
//       setError(err.response?.data?.message || "Failed to initiate checkout. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return (
//     <div>
//       {error && (
//         <div style={{
//           color: 'red',
//           marginBottom: '15px',
//           fontSize: '14px',
//           textAlign: 'center'
//         }}>
//           {error}
//         </div>
//       )}
//       <button
//         className={`btn btn-primary ${styles.btnColor} w-100`}
//         onClick={handleCheckout}
//         disabled={isLoading || disabled}
//         style={{
//           width: '100%',
//           padding: '15px',
//           backgroundColor: '#E8A5C4',
//           color: 'white',
//           border: 'none',
//           fontSize: '14px',
//           fontWeight: '500',
//           cursor: 'pointer',
//           transition: 'background-color 0.2s',
//           marginBottom: '15px',
//           opacity: (isLoading || disabled) ? 0.7 : 1
//         }}
//         onMouseOver={(e) => !isLoading && !disabled && (e.target.style.backgroundColor = '#E298BC')}
//         onMouseOut={(e) => !isLoading && !disabled && (e.target.style.backgroundColor = '#E8A5C4')}
//       >
//         {isLoading ? 'Processing...' : 'Proceed to Checkout'}
//       </button>
//     </div>
//   );
// }

// export default CheckoutButton;










// import { useEffect, useState } from "react";
// import api from "../../api/api";
// import styles from "./stylee.module.css";
// import { resetCart } from "./cartSlice";
// import { useDispatch } from "react-redux";

// function CheckoutButton({ cartId }) {
//   const [checkoutUrl, setCheckoutUrl] = useState(null);
//   const dispatch = useDispatch();

//   const handleCheckout = () => {
//     api
//       .post("/payment/", { cartid: cartId })
//       .then((res) => {
//         setCheckoutUrl(res.data.sessionId);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     if (checkoutUrl) {
//       dispatch(resetCart());
//       // Redirect the user to the Stripe checkout page
//       window.location.href = checkoutUrl;
//     }
//   }, [checkoutUrl]);

//   //   success -> redirect to http://localhost:3000/?/success=true -> order/:orderId
//   //   cancel -> redirect to http://localhost:3000/?/canceled=true -> cancel or error

//   return (
//     <button
//       className={`btn btn-primary ${styles.btnColor} w-100`}
//       onClick={handleCheckout}
//     >
//       CHECKOUT
//     </button>
//   );
// }

// export default CheckoutButton;
