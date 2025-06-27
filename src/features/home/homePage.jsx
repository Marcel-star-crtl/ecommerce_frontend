// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Carousel from "react-bootstrap/Carousel";

// import styles from "./style.module.css";
// import { Swiper, SwiperSlide } from "swiper/react";

// import { useSelector, useDispatch } from "react-redux";

// import { fetchProductHomePage, fetchRecentProducts } from "./productHomePageSlice";
// import { fetchCategories } from "../Category/CategoryPage/categorySlice";
// import { fetchTrendingProducts } from './trendingProductsSlice'; 

// import { 
//   Box, 
//   Image,
//   AspectRatio
// } from '@chakra-ui/react';


// // Import Swiper styles
// import "swiper/css";
// import ProductCard from "../layout/ProductCard/ProductCard";
// import Original from "../components/Original";
// import Brand from "../components/Brand";
// import FAQ from "../components/FAQ";
// import VideoCarousel from "../components/VideoCarousel"
// import DiscoverByCategory from "../components/DiscoverByCategory"
// import BeautyComparison from "../components/BeautyComparison"


// function Home() {
//   const { categories, status: categoriesStatus } = useSelector((state) => state.categories);
//   const { productHomePage, recentProducts } = useSelector((state) => state.productHomePage);
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const slides = [
//     {
//       id: 1,
//       image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to produce an elegant and enigmatic feeling to everyone who comes across this product."
//     },
//     {
//       id: 2,
//       image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "Discover our premium collection of skincare products designed for your natural glow."
//     },
//     {
//       id: 3,
//       image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
//       title: "Experience the perfect blend of nature and science in every product."
//     }
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };


//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProductHomePage());
//     dispatch(fetchRecentProducts());
//     dispatch(fetchTrendingProducts());
//     dispatch(fetchCategories()); 
//   }, [dispatch]);

//   console.log('Categories:', categories);
//   console.log('Categories Status:', categoriesStatus);
//   console.log('Product Home Page:', productHomePage);

//   const getImageUrl = (imageData) => {
//     try {
//       if (!imageData) return '/assets/placeholder-category.jpg';
      
//       // Handle Cloudinary object
//       if (typeof imageData === 'object') {
//         if (imageData.url) return imageData.url;
//         if (imageData.public_id) return `https://res.cloudinary.com/ddlhwv65t/image/upload/${imageData.public_id}`;
//       }
      
//       // Handle string paths
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
//       <div style={{
//       position: 'relative',
//       height: '100vh',
//       width: '100%',
//       overflow: 'hidden'
//     }}>
//       {/* Background Image */}
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

//           {/* Left Arrow */}
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

//           {/* Right Arrow */}
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
//             {/* Main Text */}
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

//             {/* Get Yours Button */}
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

//         <Original />

        
//         {/* <div className="container-fluid pt-5">
//           <h2
//             className={`${styles.sectionTitle} position-relative text-uppercase mx-xl-5 mb-4`}
//             data-aos="fade-right"
//           >
//             <span className="p-3 ps-0">Categories</span>
//           </h2>

//           <div className="row px-xl-5 pb-3">
//             {categoriesStatus === 'loading' ? (
//               // Loading skeleton
//               <div className="text-center w-100">
//                 <p>Loading categories...</p>
//               </div>
//             ) : categoriesStatus === 'failed' ? (
//               // Error state
//               <div className="text-center w-100">
//                 <p>Error loading categories</p>
//               </div>
//             ) : categories && categories.length > 0 ? (
//               // Categories list
//               categories.map((category) => (
//                 <div
//                   className="col-lg-3 col-md-4 col-sm-6 p-2"
//                   key={category.id}
//                   data-aos="zoom-in-up"
//                 >
//                   <Link
//                     to={`/category/${category.id}`}
//                     className="text-decoration-none bg-light"
//                   >
//                     <div
//                       className={`${styles.catItem} d-flex align-items-center`}
//                     >
//                       <div
//                         className="overflow-hidden d-flex align-items-center"
//                         style={{
//                           width: "140px",
//                           height: "100px",
//                           padding: "8px",
//                         }}
//                       >
//                         <img
//                           className="img-fluid"
//                           src={getImageUrl(category.image)}
//                           alt={category.name}
//                           onError={(e) => {
//                             e.target.src = '/assets/placeholder-category.jpg';
//                           }}
//                           style={{ 
//                             width: '100%', 
//                             height: '100%', 
//                             objectFit: 'cover' 
//                           }}
//                         />
//                       </div>
//                       <div className="flex-fill mx-1">
//                         <h6>{category.title}</h6>
//                         <small className="text-body">
//                           {category.productCount || 0} Products
//                         </small>
//                       </div>
//                     </div>
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               // No categories state
//               <div className="text-center w-100">
//                 <p>No categories available</p>
//               </div>
//             )}
//           </div>
//         </div> */}

//         {/* Trending Products Section */}
//       <div className="container-fluid pt-5">
//         <h2
//           className={`${styles.sectionTitle} position-relative text-uppercase mx-xl-5 mb-4`}
//           data-aos="fade-right"
//         >
//           <span className="p-3 ps-0">Trending Now</span>
//         </h2>

//         <div className="row px-xl-5 pb-3">
//           {status === 'loading' ? (
//             <div className="text-center w-100">
//               <p>Loading trending products...</p>
//               {/* You can add a loading spinner here */}
//             </div>
//           ) : status === 'failed' ? (
//             <div className="text-center w-100">
//               <p>Error loading trending products: {error}</p>
//             </div>
//           ) : products && products.length > 0 ? (
//             products.map((product) => (
//               <div
//                 className="col-lg-3 col-md-4 col-sm-6 p-2"
//                 key={product._id}
//                 data-aos="zoom-in-up"
//               >
//                 <Link
//                   to={`/product/${product._id}`}
//                   className="text-decoration-none bg-light"
//                 >
//                   <div className={`${styles.catItem} d-flex flex-column`}>
//                     <div
//                       className="overflow-hidden"
//                       style={{
//                         width: "100%",
//                         height: "200px",
//                         padding: "8px",
//                       }}
//                     >
//                       <img
//                         className="img-fluid w-100 h-100"
//                         src={getImageUrl(product.images?.[0])}
//                         alt={product.title}
//                         onError={(e) => {
//                           e.target.src = '/assets/placeholder-product.jpg';
//                         }}
//                         style={{ 
//                           objectFit: 'cover' 
//                         }}
//                       />
//                     </div>
//                     <div className="p-2">
//                       <h6 className="mb-1">{product.title}</h6>
//                       <div className="d-flex justify-content-between align-items-center">
//                         <small className="text-body">${product.price}</small>
//                         <small className="text-muted">
//                           {product.ratings?.length || 0} reviews
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <div className="text-center w-100">
//               <p>No trending products available</p>
//             </div>
//           )}
//         </div>
//       </div>


//         <DiscoverByCategory />

//         <BeautyComparison />

//         <Brand />

//         <FAQ />

//         <Original />
        

//         {/* With custom video data */}
//         {/* <VideoCarousel videos={yourVideoArray} /> */}

//         {/* With default placeholder data */}
//         <VideoCarousel />

//         <Box
//           w="100%"
//           maxW="1300px"
//           mx="auto"
//           marginTop= "70px"
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
import { fetchCategories } from "../Category/CategoryPage/categorySlice";
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
    dispatch(fetchCategories());
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
            bottom: '50px',
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

        {/* Trending Products Section */}
        <div className="container-fluid" style={{paddingTop: '70px'}}>
          <h3 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-2`}>
            <span className="p-3 ps-0" style={{color: "#F7A9C7"}}>Trending Products</span>
          </h3>
          <h5 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-4`}>
            <span className="p-3 ps-0" style={{color: "#000", fontSize: "16"}}>A gently formationA gently formationA gently formation</span>
          </h5>

          <div className="row pb-3">
            {trendingStatus === 'loading' ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={index}>
                    <ProductCardSkeleton />
                  </div>
                ))}
              </>
            ) : trendingStatus === 'failed' ? (
              <div className="col-12 text-center">
                <p>Error loading trending products: {trendingError}</p>
              </div>
            ) : trendingProducts && trendingProducts.length > 0 ? (
              trendingProducts.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 py-2" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No trending products available</p>
              </div>
            )}
          </div>
        </div>

        <Original />

        <DiscoverByCategory />

        <div className="container-fluid pt-5">
          <h3 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-2`}>
            <span className="p-3 ps-0" style={{color: "#F7A9C7"}}>Best Sellers</span>
          </h3>
          <h5 className={`${styles.sectionTitle} position-relative  mx-xl-5 mb-4`}>
            <span className="p-3 ps-0" style={{color: "#000", fontSize: "16"}}>A gently formationA gently formationA gently formation</span>
          </h5>

          <div className="row pb-3">
            {bestSellersStatus === 'loading' ? (
              [...Array(4)].map((_, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={index}>
                  <ProductCardSkeleton />
                </div>
              ))
            ) : bestSellersStatus === 'failed' ? (
              <div className="col-12 text-center">
                <p>Error loading best sellers: {bestSellersError?.message || 'Unknown error'}</p>
              </div>
            ) : bestSellers?.length > 0 ? (
              bestSellers.map((product) => (
                <div className="col-lg-3 col-md-4 col-sm-6 p-2" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No best sellers available</p>
              </div>
            )}
          </div>
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
    </div>
  );
}

export default Home;