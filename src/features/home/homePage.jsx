import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import styles from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { 
  Box, 
  Image,
  AspectRatio
} from '@chakra-ui/react';
import "swiper/css";

// Import components
import ProductCard from "../layout/ProductCard/ProductCard";
import ProductCardSkeleton from "../layout/ProductCard/ProductCardSkeleton";
import Original from "../components/Original";
import Brand from "../components/Brand";
import FAQ from "../components/FAQ";
import VideoCarousel from "../components/VideoCarousel";
import DiscoverByCategory from "../components/DiscoverByCategory";
import BeautyComparison from "../components/BeautyComparison";

// Import Redux actions
import { fetchProductHomePage, fetchRecentProducts } from "./productHomePageSlice";
import { fetchAllCategories } from "../Category/CategoryPage/categorySlice";
import { fetchBestSellers } from '../ProductDetails/bestSellersSlice'; 
import { fetchProducts } from "../ProductDetails/productSlice";

function Home() {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redux state selectors
  const { categories, status: categoriesStatus } = useSelector((state) => state.categories);
  const { productHomePage, recentProducts } = useSelector((state) => state.productHomePage);
  const { 
    products: trendingProducts, 
    status: trendingStatus, 
    error: trendingError 
  } = useSelector((state) => state.product);

  const { 
    products: bestSellers, 
    status: bestSellersStatus, 
    error: bestSellersError 
  } = useSelector((state) => state.bestSellers);

  // Carousel slides data
  const slides = [
    {
      id: 1,
      image: process.env.PUBLIC_URL + "/assets/slide1.png",
      title: "This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to produce an elegant and enigmatic feeling to everyone who comes across this product."
    },
    {
      id: 2,
      image: process.env.PUBLIC_URL + "/assets/slide1.png",
      title: "Discover our premium collection of skincare products designed for your natural glow."
    },
    {
      id: 3,
      image: process.env.PUBLIC_URL + "/assets/slide1.png",
      title: "Experience the perfect blend of nature and science in every product."
    }
  ];

  // Responsive values based on screen size
  const getResponsiveValues = () => {
    if (windowWidth <= 480) {
      return {
        height: '60vh',
        minHeight: '400px',
        arrowSize: { width: '45px', height: '30px' },
        arrowPosition: { left: '15px', right: '15px' },
        contentBottom: '60px',
        contentPadding: '0 20px',
        fontSize: '14px',
        buttonPadding: '10px 30px',
        dotSize: '12px',
        dotBottom: '20px'
      };
    } else if (windowWidth <= 768) {
      return {
        height: '70vh',
        minHeight: '500px',
        arrowSize: { width: '50px', height: '32px' },
        arrowPosition: { left: '25px', right: '25px' },
        contentBottom: '80px',
        contentPadding: '0 30px',
        fontSize: '15px',
        buttonPadding: '11px 35px',
        dotSize: '14px',
        dotBottom: '25px'
      };
    } else if (windowWidth <= 1024) {
      return {
        height: '80vh',
        minHeight: '600px',
        arrowSize: { width: '55px', height: '33px' },
        arrowPosition: { left: '35px', right: '35px' },
        contentBottom: '100px',
        contentPadding: '0 40px',
        fontSize: '16px',
        buttonPadding: '12px 40px',
        dotSize: '16px',
        dotBottom: '30px'
      };
    } else {
      return {
        height: '100vh',
        minHeight: '700px',
        arrowSize: { width: '60px', height: '35px' },
        arrowPosition: { left: '50px', right: '50px' },
        contentBottom: '120px',
        contentPadding: '0 50px',
        fontSize: '16px',
        buttonPadding: '12px 40px',
        dotSize: '12px',
        dotBottom: '30px'
      };
    }
  };

  const responsive = getResponsiveValues();

  // Carousel navigation functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchProductHomePage());
    dispatch(fetchRecentProducts());
    dispatch(fetchAllCategories());
    dispatch(fetchProducts({ 
      tags: "trending",
      pageSize: 8,
      page: 1 
    }));

    dispatch(fetchBestSellers());
  }, [dispatch]);

  // Helper function to get image URL
  const getImageUrl = (imageData) => {
    try {
      if (!imageData) return '/assets/slide1.png';
      
      if (typeof imageData === 'object') {
        if (imageData.url) return imageData.url;
        if (imageData.public_id) return `https://res.cloudinary.com/ddlhwv65t/image/upload/${imageData.public_id}`;
      }
      
      if (typeof imageData === 'string') {
        if (imageData.startsWith('http')) return imageData;
        if (imageData.startsWith('image/')) return `https://res.cloudinary.com/ddlhwv65t/${imageData}`;
        return imageData;
      }
      
      return '/assets/placeholder-category.jpg';
    } catch (error) {
      console.error('Error processing image URL:', error);
      return '/assets/placeholder-category.jpg';
    }
  };

  // Duplicate products for seamless loop
  const duplicatedTrendingProducts = trendingProducts && trendingProducts.length > 0 
    ? [...trendingProducts, ...trendingProducts, ...trendingProducts] 
    : [];

  const duplicatedBestSellers = bestSellers && bestSellers.length > 0 
    ? [...bestSellers, ...bestSellers, ...bestSellers] 
    : [];

  return (
    <div className={`${styles.body}`}>
      <div className={`container-fluid py-5`}>
        {/* Responsive Hero Carousel Section */}
        <div style={{
          position: 'relative',
          height: responsive.height,
          minHeight: responsive.minHeight,
          width: '100%',
          overflow: 'hidden',
        }}>
          {/* Background Image */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${slides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transition: 'background-image 0.5s ease-in-out'
            }}
          />
          
          {/* Dark Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }} />

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: responsive.arrowPosition.left,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '2px solid white',
              borderRadius: '50px',
              width: responsive.arrowSize.width,
              height: responsive.arrowSize.height,
              color: 'white',
              fontSize: windowWidth <= 480 ? '14px' : '16px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              // Hide on very small screens if needed
              opacity: windowWidth <= 320 ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
            aria-label="Previous slide"
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: responsive.arrowPosition.right,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '2px solid white',
              borderRadius: '50px',
              width: responsive.arrowSize.width,
              height: responsive.arrowSize.height,
              color: 'white',
              fontSize: windowWidth <= 480 ? '14px' : '16px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              opacity: windowWidth <= 320 ? 0.7 : 1
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
            aria-label="Next slide"
          >
            →
          </button>

          {/* Content Container */}
          <div style={{
            position: 'absolute',
            bottom: responsive.contentBottom,
            left: 0,
            right: 0,
            zIndex: 5,
            padding: responsive.contentPadding,
            maxWidth: windowWidth <= 768 ? '100%' : '600px',
            marginLeft: windowWidth <= 768 ? 0 : '50px'
          }}>
            <p style={{
              color: 'white',
              fontSize: responsive.fontSize,
              lineHeight: windowWidth <= 480 ? '1.4' : '1.6',
              fontWeight: '300',
              marginBottom: windowWidth <= 480 ? '20px' : '30px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: 'Arial, sans-serif',
              // Limit text length on mobile
              display: '-webkit-box',
              WebkitLineClamp: windowWidth <= 480 ? 4 : 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {windowWidth <= 480 
                ? slides[currentSlide].title.substring(0, 150) + (slides[currentSlide].title.length > 150 ? '...' : '')
                : slides[currentSlide].title
              }
            </p>

            <button
              style={{
                backgroundColor: '#E8A5C4',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: responsive.buttonPadding,
                fontSize: windowWidth <= 480 ? '13px' : '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                minWidth: windowWidth <= 480 ? '120px' : 'auto'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#E298BC';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#E8A5C4';
                e.target.style.transform = 'translateY(0)';
              }}
              onClick={() => console.log('Get Yours clicked')}
            >
              Get Yours
            </button>
          </div>

          {/* Carousel Dots */}
          <div className={styles.carouselDots}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.carouselDot} ${currentSlide === index ? styles.active : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Touch/Swipe indicators for mobile */}
          {windowWidth <= 768 && (
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {currentSlide + 1} / {slides.length}
            </div>
          )}
        </div>

        {/* Trending Products Section with Animation */}
        <div className="container-fluid" style={{paddingTop: '70px'}}>
          <h3 className={`${styles.sectionTitle} position-relative mx-xl-5 mb-2`}>
            <span className="p-3 ps-0" style={{
              color: "#F7A9C7",
              fontSize: windowWidth <= 480 ? '20px' : windowWidth <= 768 ? '24px' : '28px'
            }}>
              Trending Products
            </span>
          </h3>
          <h5 className={`${styles.sectionTitle} position-relative mx-xl-5 mb-4`}>
            <span className="p-3 ps-0" style={{
              color: "#000", 
              fontSize: windowWidth <= 480 ? '14px' : '16px',
              fontWeight: '300'
            }}>
              A gently formationA gently formationA gently formation
            </span>
          </h5>

          {trendingStatus === 'loading' ? (
            <div className="row pb-3">
              {[...Array(windowWidth <= 480 ? 2 : windowWidth <= 768 ? 3 : 4)].map((_, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={index}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : trendingStatus === 'failed' ? (
            <div className="row pb-3">
              <div className="col-12 text-center">
                <p>Error loading trending products: {trendingError}</p>
              </div>
            </div>
          ) : trendingProducts && trendingProducts.length > 0 ? (
            <div 
              style={{
                overflow: 'hidden',
                position: 'relative',
                paddingBottom: '20px'
              }}
            >
              <div 
                className="trending-products-scroll"
                style={{
                  display: 'flex',
                  gap: windowWidth <= 480 ? '15px' : '20px',
                  animation: `scroll-horizontal ${windowWidth <= 480 ? '15s' : windowWidth <= 768 ? '20s' : '30s'} linear infinite`,
                  width: 'max-content'
                }}
                onMouseEnter={(e) => {
                  e.target.style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                  e.target.style.animationPlayState = 'running';
                }}
              >
                {duplicatedTrendingProducts.map((product, index) => (
                  <div 
                    key={`${product._id}-${index}`}
                    style={{
                      minWidth: windowWidth <= 480 ? '250px' : '280px',
                      maxWidth: windowWidth <= 480 ? '250px' : '280px',
                      flexShrink: 0
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="row pb-3">
              <div className="col-12 text-center">
                <p>No trending products available</p>
              </div>
            </div>
          )}
        </div>

        <Original 
          backgroundImage={process.env.PUBLIC_URL + "/assets/original.png"}
          textColor="gray.800"
          descriptionColor="gray.700"
        />

        <DiscoverByCategory />

        {/* Best Sellers Section with Animation */}
        <div className="container-fluid pt-5">
          <h3 className={`${styles.sectionTitle} position-relative mx-xl-5 mb-2`}>
            <span className="p-3 ps-0" style={{
              color: "#F7A9C7",
              fontSize: windowWidth <= 480 ? '20px' : windowWidth <= 768 ? '24px' : '28px'
            }}>
              Best Sellers
            </span>
          </h3>
          <h5 className={`${styles.sectionTitle} position-relative mx-xl-5 mb-4`}>
            <span className="p-3 ps-0" style={{
              color: "#000", 
              fontSize: windowWidth <= 480 ? '14px' : '16px',
              fontWeight: '300'
            }}>
              A gently formationA gently formationA gently formation
            </span>
          </h5>

          {bestSellersStatus === 'loading' ? (
            <div className="row pb-3">
              {[...Array(windowWidth <= 480 ? 2 : windowWidth <= 768 ? 3 : 4)].map((_, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={index}>
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          ) : bestSellersStatus === 'failed' ? (
            <div className="row pb-3">
              <div className="col-12 text-center">
                <p>Error loading best sellers: {bestSellersError?.message || 'Unknown error'}</p>
              </div>
            </div>
          ) : bestSellers?.length > 0 ? (
            <div 
              style={{
                overflow: 'hidden',
                position: 'relative',
                paddingBottom: '20px'
              }}
            >
              <div 
                className="best-sellers-scroll"
                style={{
                  display: 'flex',
                  gap: windowWidth <= 480 ? '15px' : '20px',
                  animation: `scroll-horizontal-reverse ${windowWidth <= 480 ? '20s' : windowWidth <= 768 ? '25s' : '35s'} linear infinite`,
                  width: 'max-content'
                }}
                onMouseEnter={(e) => {
                  e.target.style.animationPlayState = 'paused';
                }}
                onMouseLeave={(e) => {
                  e.target.style.animationPlayState = 'running';
                }}
              >
                {duplicatedBestSellers.map((product, index) => (
                  <div 
                    key={`${product._id}-${index}`}
                    style={{
                      minWidth: windowWidth <= 480 ? '250px' : '280px',
                      maxWidth: windowWidth <= 480 ? '250px' : '280px',
                      flexShrink: 0
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="row pb-3">
              <div className="col-12 text-center">
                <p>No best sellers available</p>
              </div>
            </div>
          )}
        </div>

        <Brand />

        <Original 
          backgroundImage={process.env.PUBLIC_URL + "/assets/OriginalWHT.png"}
          textColor="#fff"
          descriptionColor="#fff"
        />

        <VideoCarousel />

        <BeautyComparison />
   
        <FAQ />

        <Box
          w="100%"
          mx="auto"
          marginTop="40px"
          borderRadius=""
          overflow="hidden"
          boxShadow="xl"
        >
          <AspectRatio ratio={windowWidth <= 480 ? 16/9 : windowWidth <= 768 ? 18/6 : 21/6}>
            <Image
              src={process.env.PUBLIC_URL + "/assets/skin.png"}
              alt="Elegant hands with manicured nails"
              objectFit="cover"
              objectPosition="center"
              w="100%"
              h="100%"
              transition="transform 0.3s ease"
              _hover={{
                transform: "scale(1.02)"
              }}
            />
          </AspectRatio>
        </Box>
      </div>

      {/* Enhanced CSS for the scrolling animation with responsive breakpoints */}
      <style jsx>{`
        @keyframes scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-horizontal-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .trending-products-scroll:hover,
        .best-sellers-scroll:hover {
          animation-play-state: paused !important;
        }

        .trending-products-scroll:hover *,
        .best-sellers-scroll:hover * {
          pointer-events: auto;
        }

        /* Ensure smooth hover interactions */
        .trending-products-scroll,
        .best-sellers-scroll {
          will-change: transform;
          cursor: pointer;
        }

        /* Mobile touch support for pause on tap */
        @media (max-width: 768px) {
          .trending-products-scroll:active,
          .best-sellers-scroll:active {
            animation-play-state: paused !important;
          }
        }

        /* Responsive breakpoints for animations */
        @media (max-width: 1024px) {
          .trending-products-scroll {
            animation-duration: 25s;
          }
          .best-sellers-scroll {
            animation-duration: 30s;
          }
        }

        @media (max-width: 768px) {
          .trending-products-scroll {
            animation-duration: 20s;
          }
          .best-sellers-scroll {
            animation-duration: 25s;
          }
        }

        @media (max-width: 480px) {
          .trending-products-scroll {
            animation-duration: 15s;
          }
          .best-sellers-scroll {
            animation-duration: 20s;
          }
        }

        @media (max-width: 320px) {
          .trending-products-scroll {
            animation-duration: 12s;
          }
          .best-sellers-scroll {
            animation-duration: 15s;
          }
        }

        /* Smooth transitions for responsive changes */
        .trending-products-scroll,
        .best-sellers-scroll {
          transition: gap 0.3s ease;
        }

        /* Touch improvements for mobile */
        @media (max-width: 768px) {
          .trending-products-scroll,
          .best-sellers-scroll {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
