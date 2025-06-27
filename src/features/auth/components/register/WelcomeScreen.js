import React from "react";

function WelcomeScreen({ userName = "Nicole", onProceed, onClose }) {
  
  const handleProceed = () => {
    console.log('Proceeding to account dashboard');
    if (onProceed) onProceed();
  };

  const handleClose = () => {
    console.log('Closing welcome screen - redirecting to home');
    if (onClose) onClose();
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        position: 'relative',
        textAlign: 'center'
      }}>
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: '#999',
            cursor: 'pointer',
            padding: '5px',
            lineHeight: '1'
          }}
        >
          ×
        </button>

        {/* Welcome message */}
        <h2 style={{
          fontSize: '20px',
          fontWeight: '400',
          color: '#333',
          marginBottom: '10px',
          marginTop: '20px'
        }}>
          Welcome, {userName}
        </h2>

        <p style={{
          fontSize: '14px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.4'
        }}>
          Your Shyneen account is now active.
        </p>

        {/* Proceed button */}
        <button
          onClick={handleProceed}
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
            borderRadius: '2px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#E298BC'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#E8A5C4'}
        >
          Continue to your account
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;