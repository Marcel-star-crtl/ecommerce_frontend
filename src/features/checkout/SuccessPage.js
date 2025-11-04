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
import { emptyCart } from '../cart/cartSlice/index';
import { FiCheckCircle, FiMessageSquare } from 'react-icons/fi';

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { orderId, amount, whatsappSent } = location.state || {};
  
  useEffect(() => {
    // Clear cart on successful order (both Redux state and backend)
    dispatch(emptyCart());
  }, [dispatch]);

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '60px 40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%'
      }}>
        <FiCheckCircle 
          style={{ 
            color: '#4BB543', 
            fontSize: '72px', 
            marginBottom: '20px' 
          }} 
        />
        <h2 style={{ 
          fontSize: '28px', 
          marginBottom: '15px',
          color: '#2C1810',
          fontWeight: '700'
        }}>
          Order Placed Successfully!
        </h2>
        
        {orderId && (
          <p style={{ 
            margin: '10px 0', 
            fontSize: '14px',
            color: '#6B5B4F'
          }}>
            Order ID: <strong>{orderId}</strong>
          </p>
        )}
        
        {amount && (
          <p style={{ 
            margin: '10px 0', 
            fontSize: '16px',
            color: '#2C1810',
            fontWeight: '600'
          }}>
            Total: <span style={{ color: '#E8A5C4' }}>${amount.toFixed(2)}</span>
          </p>
        )}
        
        <div style={{
          backgroundColor: '#E8F5E9',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '30px',
          marginBottom: '30px'
        }}>
          <FiMessageSquare 
            style={{ 
              color: '#4BB543', 
              fontSize: '32px', 
              marginBottom: '10px' 
            }} 
          />
          <p style={{ 
            margin: '0', 
            fontSize: '15px',
            color: '#2C1810',
            lineHeight: '1.6'
          }}>
            {whatsappSent ? (
              <>
                Your order details have been sent to our WhatsApp. 
                We'll confirm your order shortly and provide payment instructions.
              </>
            ) : (
              <>
                Thank you for your order! We've received your order details 
                and will contact you shortly to confirm and arrange payment.
              </>
            )}
          </p>
        </div>
        
        <p style={{ 
          margin: '20px 0', 
          fontSize: '15px',
          color: '#6B5B4F',
          lineHeight: '1.6'
        }}>
          You can track your order status in your profile page.
        </p>
        
        <div style={{ marginTop: '40px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            onClick={() => navigate('/profile')}
            style={{
              padding: '14px 32px',
              backgroundColor: '#E8A5C4',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
          >
            View My Orders
          </button>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '14px 32px',
              backgroundColor: 'white',
              color: '#2C1810',
              border: '2px solid #E8A5C4',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#FFF5F9';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            Continue Shopping
          </button>
        </div>
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