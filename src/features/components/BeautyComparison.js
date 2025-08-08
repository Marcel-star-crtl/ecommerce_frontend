import React, { useState, useEffect } from 'react';

function BeautyComparison({ product }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive values
  const isMobile = windowWidth <= 767;
  const isTablet = windowWidth >= 768 && windowWidth <= 1023;
  const isDesktop = windowWidth >= 1024;

  const getImageUrl = (imageData) => {
    if (!imageData) return null;
    return imageData.url || imageData.image || null;
  };

  const beforeImage = product?.beforeAfterImages?.before 
    ? getImageUrl(product.beforeAfterImages.before)
    : (process.env.PUBLIC_URL + "/assets/before.png");
    
  const afterImage = product?.beforeAfterImages?.after 
    ? getImageUrl(product.beforeAfterImages.after)
    : (process.env.PUBLIC_URL + "/assets/after.png");

  const productTitle = product?.title || product?.name || "Beauty Product";
  
  const mainBenefit = product?.benefits?.[0] || "No smudging or Flaking";
  
  const description = product?.description || 
    "This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.";

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'center',
      padding: isMobile ? '30px 20px' : isTablet ? '40px 30px' : '50px 40px',
      marginTop: isMobile ? '30px' : '50px',
      backgroundColor: '#f8f8f8',
      fontFamily: 'Arial, sans-serif',
      gap: isMobile ? '30px' : isTablet ? '40px' : '60px',
      width: '100%',
      margin: '0 auto',
      minHeight: isMobile ? 'auto' : '500px'
    }}>
      {/* Images Container */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '20px' : '20px',
        padding: isMobile ? '0' : '20px',
        maxWidth: isMobile ? '100%' : isTablet ? '600px' : '800px',
        alignItems: isMobile ? 'center' : 'flex-start',
        width: isMobile ? '100%' : 'auto',
        justifyContent: isMobile ? 'center' : 'flex-start'
      }}>
        {/* Before Image */}
        <div style={{
          position: 'relative',
          width: isMobile ? 'min(280px, 90vw)' : isTablet ? '260px' : '320px',
          height: isMobile ? 'min(320px, calc(90vw * 1.14))' : isTablet ? '300px' : '380px',
          borderRadius: isMobile ? '15px' : '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <img
            src={beforeImage}
            alt="Before using product"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            top: isMobile ? '12px' : '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#E8A5C4',
            color: 'white',
            padding: isMobile ? '5px 12px' : '6px 16px',
            borderRadius: isMobile ? '12px' : '15px',
            fontSize: isMobile ? '10px' : '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 8px rgba(232, 165, 196, 0.3)'
          }}>
            Before
          </div>
        </div>

        {/* After Image */}
        <div style={{
          position: 'relative',
          width: isMobile ? 'min(280px, 90vw)' : isTablet ? '260px' : '320px',
          height: isMobile ? 'min(320px, calc(90vw * 1.14))' : isTablet ? '300px' : '380px',
          borderRadius: isMobile ? '15px' : '20px',
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <img
            src={afterImage}
            alt="After using product"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(1.1) contrast(1.1)'
            }}
          />
          <div style={{
            position: 'absolute',
            top: isMobile ? '12px' : '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#E8A5C4',
            color: 'white',
            padding: isMobile ? '5px 14px' : '6px 20px',
            borderRadius: isMobile ? '12px' : '15px',
            fontSize: isMobile ? '10px' : '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 8px rgba(232, 165, 196, 0.3)'
          }}>
            After
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div style={{
        flex: '1',
        maxWidth: isMobile ? '100%' : isTablet ? '400px' : '450px',
        padding: isMobile ? '20px 0' : '0',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        <h2 style={{
          fontSize: isMobile ? '22px' : isTablet ? '26px' : '28px',
          fontWeight: '400',
          color: '#333',
          marginBottom: isMobile ? '15px' : '20px',
          lineHeight: '1.3',
          margin: isMobile ? '0 0 15px 0' : '0 0 20px 0'
        }}>
          {mainBenefit}
        </h2>
        
        <p style={{
          fontSize: isMobile ? '13px' : '14px',
          lineHeight: isMobile ? '1.5' : '1.6',
          color: '#666',
          marginBottom: isMobile ? '25px' : '30px',
          fontWeight: '400',
          maxWidth: '100%'
        }}>
          {description}
        </p>

        {product?.benefits && product.benefits.length > 1 && (
          <div style={{ marginBottom: isMobile ? '20px' : '30px' }}>
            <h4 style={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '500',
              color: '#333',
              marginBottom: isMobile ? '8px' : '10px'
            }}>
              Key Benefits:
            </h4>
            <ul style={{
              fontSize: isMobile ? '12px' : '13px',
              color: '#666',
              lineHeight: '1.6',
              paddingLeft: isMobile ? '16px' : '20px',
              margin: '0'
            }}>
              {product.benefits.slice(1, isMobile ? 3 : 4).map((benefit, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Progress Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '10px' : '15px',
          marginTop: 'auto'
        }}>
          <div style={{
            flex: '1',
            height: '2px',
            backgroundColor: '#e0e0e0',
            borderRadius: '1px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '0',
              height: '100%',
              width: '10%',
              backgroundColor: '#333',
              borderRadius: '1px'
            }}></div>
          </div>

          <span style={{
            fontSize: isMobile ? '10px' : '12px',
            color: '#999',
            fontWeight: '400',
            whiteSpace: 'nowrap'
          }}>
            1 OF 10
          </span>

          <div style={{
            flex: '1',
            height: '2px',
            backgroundColor: '#e0e0e0',
            borderRadius: '1px'
          }}></div>
        </div>
      </div>
    </div>
  );
}

export default BeautyComparison;

