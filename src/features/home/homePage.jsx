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
import OriginalWHT from "../components/OriginalWHT";
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
      image:  process.env.PUBLIC_URL + "/assets/slide1.png",
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

  // Carousel navigation functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

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

    // Fetch best sellers
    // dispatch(fetchProducts({ 
    //   tags: "best-sellers",
    //   pageSize: 8,
    //   page: 1 
    // }));

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
        {/* Hero Carousel Section */}
        <div style={{
          position: 'relative',
          height: '100vh',
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
              left: '50px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '2px solid white',
              borderRadius: '50px',
              width: '60px',
              height: '35px',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            ←
          </button>

          <button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '50px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: '2px solid white',
              borderRadius: '50px',
              width: '60px',
              height: '35px',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            →
          </button>

          {/* Content Container */}
          <div style={{
            position: 'absolute',
            bottom: '120px',
            left: '50px',
            right: '50px',
            zIndex: 5,
            maxWidth: '500px'
          }}>
            <p style={{
              color: 'white',
              fontSize: '16px',
              lineHeight: '1.6',
              fontWeight: '300',
              marginBottom: '30px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              fontFamily: 'Arial, sans-serif'
            }}>
              {slides[currentSlide].title}
            </p>

            <button
              style={{
                backgroundColor: '#E8A5C4',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 40px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
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
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Trending Products Section with Animation */}
        <div className="container-fluid" style={{paddingTop: '70px'}}>
          <h3 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-2`}>
            <span className="p-3 ps-0" style={{color: "#F7A9C7"}}>Trending Products</span>
          </h3>
          <h5 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-4`}>
            <span className="p-3 ps-0" style={{color: "#000", fontSize: "16"}}>A gently formationA gently formationA gently formation</span>
          </h5>

          {trendingStatus === 'loading' ? (
            <div className="row pb-3">
              {[...Array(4)].map((_, index) => (
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
                  gap: '20px',
                  animation: 'scroll-horizontal 30s linear infinite',
                  width: 'max-content'
                }}
              >
                {duplicatedTrendingProducts.map((product, index) => (
                  <div 
                    key={`${product._id}-${index}`}
                    style={{
                      minWidth: '280px',
                      maxWidth: '280px',
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

        <Original />

        <DiscoverByCategory />

        {/* Best Sellers Section with Animation */}
        <div className="container-fluid pt-5">
          <h3 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-2`}>
            <span className="p-3 ps-0" style={{color: "#F7A9C7"}}>Best Sellers</span>
          </h3>
          <h5 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-4`}>
            <span className="p-3 ps-0" style={{color: "#000", fontSize: "16"}}>A gently formationA gently formationA gently formation</span>
          </h5>

          {bestSellersStatus === 'loading' ? (
            <div className="row pb-3">
              {[...Array(4)].map((_, index) => (
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
                  gap: '20px',
                  animation: 'scroll-horizontal-reverse 35s linear infinite',
                  width: 'max-content'
                }}
              >
                {duplicatedBestSellers.map((product, index) => (
                  <div 
                    key={`${product._id}-${index}`}
                    style={{
                      minWidth: '280px',
                      maxWidth: '280px',
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

        < OriginalWHT />

        <VideoCarousel />

        <BeautyComparison />
   
        <FAQ />

        <Box
          w="100%"
          // maxW="1400px"
          mx="auto"
          marginTop="40px"
          borderRadius=""
          overflow="hidden"
          boxShadow="xl"
        >
          <AspectRatio ratio={21/6}>
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

      {/* CSS for the scrolling animation */}
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
          animation-play-state: paused;
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
      `}</style>
    </div>
  );
}

export default Home;













// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Carousel from "react-bootstrap/Carousel";
// import styles from "./style.module.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { useSelector, useDispatch } from "react-redux";
// import { 
//   Box, 
//   Image,
//   AspectRatio
// } from '@chakra-ui/react';
// import "swiper/css";

// // Import components
// import ProductCard from "../layout/ProductCard/ProductCard";
// import ProductCardSkeleton from "../layout/ProductCard/ProductCardSkeleton";
// import Original from "../components/Original";
// import Brand from "../components/Brand";
// import OriginalWHT from "../components/OriginalWHT";
// import FAQ from "../components/FAQ";
// import VideoCarousel from "../components/VideoCarousel";
// import DiscoverByCategory from "../components/DiscoverByCategory";
// import BeautyComparison from "../components/BeautyComparison";

// // Import Redux actions
// import { fetchProductHomePage, fetchRecentProducts } from "./productHomePageSlice";
// import { fetchCategories } from "../Category/CategoryPage/categorySlice";
// import { fetchBestSellers } from '../ProductDetails/bestSellersSlice'; 
// import { fetchProducts } from "../ProductDetails/productSlice";

// function Home() {
//   const dispatch = useDispatch();
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   // Redux state selectors
//   const { categories, status: categoriesStatus } = useSelector((state) => state.categories);
//   const { productHomePage, recentProducts } = useSelector((state) => state.productHomePage);
//   const { 
//     products: trendingProducts, 
//     status: trendingStatus, 
//     error: trendingError 
//   } = useSelector((state) => state.product);

//   const { 
//     products: bestSellers, 
//     status: bestSellersStatus, 
//     error: bestSellersError 
//   } = useSelector((state) => state.bestSellers);

//   // Carousel slides data
//   const slides = [
//     {
//       id: 1,
//       image:  process.env.PUBLIC_URL + "/assets/slide1.png",
//       title: "This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to produce an elegant and enigmatic feeling to everyone who comes across this product."
//     },
//     {
//       id: 2,
//       image: process.env.PUBLIC_URL + "/assets/slide1.png",
//       title: "Discover our premium collection of skincare products designed for your natural glow."
//     },
//     {
//       id: 3,
//       image: process.env.PUBLIC_URL + "/assets/slide1.png",
//       title: "Experience the perfect blend of nature and science in every product."
//     }
//   ];

//   // Carousel navigation functions
//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   const goToSlide = (index) => setCurrentSlide(index);

//   // Fetch data on component mount
//   useEffect(() => {
//     dispatch(fetchProductHomePage());
//     dispatch(fetchRecentProducts());
//     dispatch(fetchCategories());
//     dispatch(fetchProducts({ 
//       tags: "trending",
//       pageSize: 8,
//       page: 1 
//     }));

//     // Fetch best sellers
//     // dispatch(fetchProducts({ 
//     //   tags: "best-sellers",
//     //   pageSize: 8,
//     //   page: 1 
//     // }));

//     dispatch(fetchBestSellers());
//   }, [dispatch]);

//   // Helper function to get image URL
//   const getImageUrl = (imageData) => {
//     try {
//       if (!imageData) return '/assets/slide1.png';
      
//       if (typeof imageData === 'object') {
//         if (imageData.url) return imageData.url;
//         if (imageData.public_id) return `https://res.cloudinary.com/ddlhwv65t/image/upload/${imageData.public_id}`;
//       }
      
//       if (typeof imageData === 'string') {
//         if (imageData.startsWith('http')) return imageData;
//         if (imageData.startsWith('image/')) return `https://res.cloudinary.com/ddlhwv65t/${imageData}`;
//         return imageData;
//       }
      
//       return '/assets/placeholder-category.jpg';
//     } catch (error) {
//       console.error('Error processing image URL:', error);
//       return '/assets/placeholder-category.jpg';
//     }
//   };

//   return (
//     <div className={`${styles.body}`}>
//       <div className={`container-fluid py-5`}>
//         {/* Hero Carousel Section */}
//         <div style={{
//           position: 'relative',
//           height: '100vh',
//           width: '100%',
//           overflow: 'hidden',
//         }}>
//           {/* Background Image */}
//           <div 
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               backgroundImage: `url(${slides[currentSlide].image})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               backgroundRepeat: 'no-repeat',
//               transition: 'background-image 0.5s ease-in-out'
//             }}
//           />
          
//           {/* Dark Overlay */}
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.3)',
//             zIndex: 1
//           }} />

//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             style={{
//               position: 'absolute',
//               left: '50px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               background: 'none',
//               border: '2px solid white',
//               borderRadius: '50px',
//               width: '60px',
//               height: '35px',
//               color: 'white',
//               fontSize: '16px',
//               cursor: 'pointer',
//               zIndex: 10,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//             }}
//           >
//             ←
//           </button>

//           <button
//             onClick={nextSlide}
//             style={{
//               position: 'absolute',
//               right: '50px',
//               top: '50%',
//               transform: 'translateY(-50%)',
//               background: 'none',
//               border: '2px solid white',
//               borderRadius: '50px',
//               width: '60px',
//               height: '35px',
//               color: 'white',
//               fontSize: '16px',
//               cursor: 'pointer',
//               zIndex: 10,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               transition: 'all 0.3s ease'
//             }}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//             }}
//           >
//             →
//           </button>

//           {/* Content Container */}
//           <div style={{
//             position: 'absolute',
//             bottom: '120px',
//             left: '50px',
//             right: '50px',
//             zIndex: 5,
//             maxWidth: '500px'
//           }}>
//             <p style={{
//               color: 'white',
//               fontSize: '16px',
//               lineHeight: '1.6',
//               fontWeight: '300',
//               marginBottom: '30px',
//               textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
//               fontFamily: 'Arial, sans-serif'
//             }}>
//               {slides[currentSlide].title}
//             </p>

//             <button
//               style={{
//                 backgroundColor: '#E8A5C4',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '25px',
//                 padding: '12px 40px',
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.backgroundColor = '#E298BC';
//                 e.target.style.transform = 'translateY(-2px)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.backgroundColor = '#E8A5C4';
//                 e.target.style.transform = 'translateY(0)';
//               }}
//               onClick={() => console.log('Get Yours clicked')}
//             >
//               Get Yours
//             </button>
//           </div>

//           {/* Carousel Dots */}
//           <div style={{
//             position: 'absolute',
//             bottom: '50px',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             display: 'flex',
//             gap: '8px',
//             zIndex: 10
//           }}>
//             {slides.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 style={{
//                   width: '12px',
//                   height: '12px',
//                   borderRadius: '50%',
//                   border: 'none',
//                   backgroundColor: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease'
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Trending Products Section */}
//         <div className="container-fluid" style={{paddingTop: '70px'}}>
//           <h3 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-2`}>
//             <span className="p-3 ps-0" style={{color: "#F7A9C7"}}>Trending Products</span>
//           </h3>
//           <h5 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-4`}>
//             <span className="p-3 ps-0" style={{color: "#000", fontSize: "16"}}>A gently formationA gently formationA gently formation</span>
//           </h5>

//           <div className="row pb-3">
//             {trendingStatus === 'loading' ? (
//               <>
//                 {[...Array(4)].map((_, index) => (
//                   <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={index}>
//                     <ProductCardSkeleton />
//                   </div>
//                 ))}
//               </>
//             ) : trendingStatus === 'failed' ? (
//               <div className="col-12 text-center">
//                 <p>Error loading trending products: {trendingError}</p>
//               </div>
//             ) : trendingProducts && trendingProducts.length > 0 ? (
//               trendingProducts.map((product) => (
//                 <div className="col-lg-3 col-md-4 col-sm-6 py-2" key={product._id}>
//                   <ProductCard product={product} />
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center">
//                 <p>No trending products available</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <Original />

//         <DiscoverByCategory />

//         <div className="container-fluid pt-5">
//           <h3 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-2`}>
//             <span className="p-3 ps-0" style={{color: "#F7A9C7"}}>Best Sellers</span>
//           </h3>
//           <h5 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-4`}>
//             <span className="p-3 ps-0" style={{color: "#000", fontSize: "16"}}>A gently formationA gently formationA gently formation</span>
//           </h5>

//           <div className="row pb-3">
//             {bestSellersStatus === 'loading' ? (
//               [...Array(4)].map((_, index) => (
//                 <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={index}>
//                   <ProductCardSkeleton />
//                 </div>
//               ))
//             ) : bestSellersStatus === 'failed' ? (
//               <div className="col-12 text-center">
//                 <p>Error loading best sellers: {bestSellersError?.message || 'Unknown error'}</p>
//               </div>
//             ) : bestSellers?.length > 0 ? (
//               bestSellers.map((product) => (
//                 <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={product._id}>
//                   <ProductCard product={product} />
//                 </div>
//               ))
//             ) : (
//               <div className="col-12 text-center">
//                 <p>No best sellers available</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <Brand />

//         < OriginalWHT />

//         <VideoCarousel />

//         <BeautyComparison />
   
//         <FAQ />

//         <Box
//           w="100%"
//           // maxW="1400px"
//           mx="auto"
//           marginTop="40px"
//           borderRadius=""
//           overflow="hidden"
//           boxShadow="xl"
//         >
//           <AspectRatio ratio={21/6}>
//             <Image
//               src={process.env.PUBLIC_URL + "/assets/skin.png"}
//               alt="Elegant hands with manicured nails"
//               objectFit="cover"
//               objectPosition="center"
//               w="100%"
//               h="100%"
//               transition="transform 0.3s ease"
//               _hover={{
//                 transform: "scale(1.02)"
//               }}
//             />
//           </AspectRatio>
//         </Box>
//       </div>
//     </div>
//   );
// }

// export default Home;