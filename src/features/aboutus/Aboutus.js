import React from 'react';
import BeautyComparison from "../components/BeautyComparison";


const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Section - Beauty Products Display */}
      <section style={{ 
        padding: '80px 0',
        backgroundColor: '#fff'
      }}>
        <div style={{ 
          // maxWidth: '1200px', 
          width: '100%',
          margin: '0 auto', 
          padding: '0 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          alignItems: 'end'
        }}>
          <div style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/about1.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '450px',
            borderRadius: '0'
          }}>
          </div>
          <div style={{width: "350px"}}>
            <div style={{
              fontSize: '11px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              color: '#888'
            }}>
              DISCOVER OUR
            </div>
            <h2 style={{ 
              fontSize: '28px',
              fontWeight: '600',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              marginBottom: '30px',
              color: '#333',
              lineHeight: '1.2'
            }}>
              FOUNDING STORY
            </h2>
            <p style={{ 
              fontSize: '14px',
              lineHeight: '1.7',
              color: '#666',
              marginBottom: '0'
            }}>
              This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.
            </p>
          </div>
        </div>
      </section>

      {/* Full Width Beauty Image */}
      <section style={{ 
        height: '450px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/about2.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
      </section>

      {/* The Core Mission Section */}
      <section style={{ 
        backgroundColor: '#fff',
        padding: '60px 0'
      }}>
        <div style={{ 
          Width: '100%', 
          margin: '0 auto', 
          padding: '0 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'flex-end'
        }}>
          <div style={{ paddingTop: '0', width: '350px'}}>
          <div style={{
              fontSize: '11px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '8px',
              
              color: '#888'
            }}>
              ABOUT SHYNEEN
            </div>
            <h2 style={{ 
              fontSize: '28px',
              fontWeight: '600',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              marginBottom: '30px',
              color: '#333',
              lineHeight: '1.2'
            }}>
              THE CORE MISSION
            </h2>
            <p style={{ 
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '20px'
            }}>
              At the heart of our brand lies a commitment to authenticity and efficacy. We believe that skincare should be a ritual of self-care, not a compromise between health and beauty.
            </p>
            <p style={{ 
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#666',
              marginBottom: '20px'
            }}>
              Our mission extends beyond creating exceptional products. We're dedicated to promoting sustainable beauty practices, supporting local communities, and empowering individuals to embrace their unique beauty journey.
            </p>
            <p style={{ 
              fontSize: '14px',
              lineHeight: '1.8',
              color: '#666'
            }}>
              Through rigorous research, ethical sourcing, and a deep respect for nature's power, we continue to innovate while staying true to our foundational values of purity, effectiveness, and sustainability.
            </p>
          </div>
          <div style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/about3.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '400px',
            borderRadius: '0'
          }}>
          </div>
        </div>
      </section>

      {/* Full Width Skincare Application Image */}
      <section style={{ 
        height: '500px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
      </section>

      <BeautyComparison />

      {/* Bottom Full Width Image */}
      <section style={{ 
        height: '400px',
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/skin.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
      </section>
    </div>
  );
};

export default AboutUs;