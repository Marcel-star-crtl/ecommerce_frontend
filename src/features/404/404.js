import React from 'react';

function Error() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <main style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <section style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '60px',
          flexWrap: 'wrap'
        }}>
          {/* Content Section */}
          <div style={{
            flex: '1',
            minWidth: '300px',
            maxWidth: '500px'
          }}>
            <div style={{
              textAlign: 'left'
            }}>
              {/* Error Badge */}
              <span style={{
                display: 'inline-block',
                backgroundColor: '#E8A5C4',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                404 Error
              </span>

              {/* Main Title */}
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '400',
                color: '#333',
                marginBottom: '20px',
                lineHeight: '1.2',
                margin: '0 0 20px 0'
              }}>
                Oops! Page Not Found
              </h1>

              {/* Description */}
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#666',
                marginBottom: '30px',
                fontWeight: '400'
              }}>
                The page you are looking for doesn't exist or has been moved. 
                Don't worry, it happens to the best of us.
              </p>

              {/* Back to Home Button */}
              <button
                onClick={() => window.location.href = '/home'}
                style={{
                  backgroundColor: '#E8A5C4',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(232, 165, 196, 0.3)',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#E298BC';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(232, 165, 196, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#E8A5C4';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(232, 165, 196, 0.3)';
                }}
              >
                Go Back Home
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div style={{
            flex: '1',
            minWidth: '300px',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            {/* 404 Large Number */}
            <div style={{
              fontSize: 'clamp(8rem, 15vw, 12rem)',
              fontWeight: '100',
              color: '#f0f0f0',
              lineHeight: '1',
              position: 'relative',
              textAlign: 'center'
            }}>
              404
              
              {/* Floating Elements */}
              <div style={{
                position: 'absolute',
                top: '20%',
                right: '-10%',
                width: '60px',
                height: '60px',
                backgroundColor: '#E8A5C4',
                borderRadius: '50%',
                opacity: '0.7',
                animation: 'float 3s ease-in-out infinite'
              }}></div>
              
              <div style={{
                position: 'absolute',
                bottom: '30%',
                left: '-15%',
                width: '40px',
                height: '40px',
                backgroundColor: '#E8A5C4',
                borderRadius: '50%',
                opacity: '0.5',
                animation: 'float 4s ease-in-out infinite reverse'
              }}></div>
              
              <div style={{
                position: 'absolute',
                top: '60%',
                right: '20%',
                width: '30px',
                height: '30px',
                backgroundColor: '#E8A5C4',
                borderRadius: '50%',
                opacity: '0.6',
                animation: 'float 2.5s ease-in-out infinite'
              }}></div>
            </div>

            {/* Shadow Effect */}
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '30px',
              backgroundColor: '#f0f0f0',
              borderRadius: '50%',
              opacity: '0.3',
              filter: 'blur(10px)'
            }}></div>
          </div>
        </section>
      </main>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}

export default Error;