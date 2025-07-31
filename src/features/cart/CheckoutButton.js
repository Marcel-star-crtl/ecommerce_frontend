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
    if (!cartId) {
      setError("No active cart found. Please try again.");
      return;
    }

    if (disabled || !products?.length) {
      setError("Your cart is empty. Please add items before checkout.");
      return;
    }

    if (!user) {
      setError("Please login to complete checkout");
      console.log("user data", user)
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
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
        shipping: 0, 
        tax: (totalAmount * 0.08) || (products.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) * 0.08),
        total: totalAmount + (totalAmount * 0.08) || 
              products.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) * 1.08
      };

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

