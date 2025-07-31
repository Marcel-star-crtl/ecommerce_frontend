import React from 'react';

function BeautyComparison({ product }) {
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
      alignItems: 'center',
      padding: ' 0px 0px',
      marginTop: '50px',
      backgroundColor: '#f8f8f8',
      fontFamily: 'Arial, sans-serif',
      gap: '60px',
      width: '100%',
      margin: '0 auto'
    }}>
      <div style={{
        display: 'flex',
        gap: '20px',
        padding: ' 40px',
        maxWidth: '1400px',
        alignItems: 'flex-start'
      }}>
        <div style={{
          position: 'relative',
          width: '320px',
          height: '380px'
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
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#E8A5C4',
            color: 'white',
            padding: '6px 16px',
            borderRadius: '15px',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Before
          </div>
        </div>

        <div style={{
          position: 'relative',
          width: '320px',
          height: '380px'
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
            top: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#E8A5C4',
            color: 'white',
            padding: '6px 20px',
            borderRadius: '15px',
            fontSize: '12px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            After
          </div>
        </div>
      </div>

      <div style={{
        flex: '1',
        maxWidth: '350px'
      }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: '400',
          color: '#333',
          marginBottom: '20px',
          lineHeight: '1.3',
          margin: '0 0 20px 0'
        }}>
          {mainBenefit}
        </h2>
        
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#666',
          marginBottom: '40px',
          fontWeight: '400'
        }}>
          {description}
        </p>

        {product?.benefits && product.benefits.length > 1 && (
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              marginBottom: '10px'
            }}>
              Key Benefits:
            </h4>
            <ul style={{
              fontSize: '13px',
              color: '#666',
              lineHeight: '1.6',
              paddingLeft: '20px',
              margin: '0'
            }}>
              {product.benefits.slice(1, 4).map((benefit, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
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
            fontSize: '12px',
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

