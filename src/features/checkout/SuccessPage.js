// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './CheckoutPage.module.css';

// const SuccessPage = () => {
//   return (
//     <div className={styles.checkoutContainer}>
//       <div className={styles.successMessage}>
//         <h1>Thank you for your order!</h1>
//         <p>Your order has been placed successfully.</p>
//         <p>We've sent a confirmation email with your order details.</p>
//         <Link to="/orders" className={styles.continueButton}>
//           View Your Orders
//         </Link>
//         <Link to="/" className={styles.continueShopping}>
//           Continue Shopping
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;








import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCart } from '../cart/cartSlice/index';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');
    
    if (!sessionId || !orderId) {
      navigate('/');
      return;
    }
    
    // Clear cart on successful payment
    dispatch(resetCart());
    
    // You might want to verify payment with your backend here
  }, [location, navigate, dispatch]);

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#4BB543', fontSize: '48px', marginBottom: '20px' }}>✓</h1>
      <h2>Payment Successful!</h2>
      <p style={{ margin: '20px 0', fontSize: '18px' }}>
        Thank you for your purchase. Your order has been received.
      </p>
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/orders')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#E8A5C4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          View Orders
        </button>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#f8f9fa',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Success;







// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { resetCart } from '../redux/cartSlice';

// const SuccessPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const sessionId = searchParams.get('session_id');
//     const orderId = searchParams.get('order_id');

//     if (orderId) {
//       // Clear the cart
//       dispatch(resetCart());
      
//       // You might want to verify payment with your backend here
//       // await verifyPayment(orderId, sessionId);
//     } else {
//       navigate('/');
//     }
//   }, [location, navigate, dispatch]);

//   return (
//     <div style={{ 
//       minHeight: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: '20px',
//       textAlign: 'center'
//     }}>
//       <div style={{ 
//         backgroundColor: 'white',
//         padding: '40px',
//         borderRadius: '8px',
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         maxWidth: '500px'
//       }}>
//         <h1 style={{ color: '#4BB543', fontSize: '48px', marginBottom: '20px' }}>✓</h1>
//         <h2 style={{ fontSize: '24px', marginBottom: '15px' }}>Payment Successful!</h2>
//         <p style={{ margin: '20px 0', fontSize: '16px' }}>
//           Thank you for your purchase. Your order has been received and is being processed.
//         </p>
//         <div style={{ marginTop: '30px' }}>
//           <button 
//             onClick={() => navigate('/orders')}
//             style={{
//               padding: '12px 24px',
//               backgroundColor: '#E8A5C4',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               fontSize: '16px',
//               cursor: 'pointer',
//               marginRight: '10px'
//             }}
//           >
//             View Orders
//           </button>
//           <button 
//             onClick={() => navigate('/')}
//             style={{
//               padding: '12px 24px',
//               backgroundColor: '#f8f9fa',
//               color: '#333',
//               border: '1px solid #ddd',
//               borderRadius: '4px',
//               fontSize: '16px',
//               cursor: 'pointer'
//             }}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessPage;