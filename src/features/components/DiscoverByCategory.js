import React from "react";

function DiscoverByCategory() {
  const categories = [
    {
      id: 1,
      name: "Moisturizers",
      image: process.env.PUBLIC_URL + "/assets/cat1.png",
    },
    {
      id: 2,
      name: "Cleanser",
      image:  process.env.PUBLIC_URL + "/assets/cat2.png",
    },
    {
      id: 3,
      name: "Face Lotion",
      image: process.env.PUBLIC_URL + "/assets/cat3.png",
    },
    {
      id: 4,
      name: "Toner",
      image: process.env.PUBLIC_URL + "/assets/cat4.png",
    },
    {
      id: 5,
      name: "Moisturizer",
      image: process.env.PUBLIC_URL + "/assets/cat5.png",
    },
    {
      id: 6,
      name: "Scrub",
      image: process.env.PUBLIC_URL + "/assets/cat3.png",
    }
  ];

  const handleCategoryClick = (categoryName) => {
    console.log(`Clicked on ${categoryName} category`);
    // Add your navigation logic here
  };

  return (
    <div style={{
      padding: '10px 20px',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Section Title */}
        <h2 style={{
          fontSize: '28px',
          fontWeight: '300',
          color: '#E8A5C4',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          Discover By Category
        </h2>

        {/* Categories Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '15px',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)'
          },
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)'
          }
        }}>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                // borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              {/* Background Image */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />

              {/* Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)'
                }}
              />

              {/* Category Button */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <button
                  style={{
                    backgroundColor: '#E8A5C4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(232, 165, 196, 0.3)',
                    textTransform: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#E298BC';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#E8A5C4';
                    e.target.style.transform = 'scale(1)';
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category.name);
                  }}
                >
                  {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default DiscoverByCategory;