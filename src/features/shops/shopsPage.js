// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import styles from './shops.module.css';
// import { fetchShops } from './shopsSlice';

// function Shops() {
//   const dispatch = useDispatch();
//   const { shops = [], loading, error } = useSelector((state) => state.shops || {});
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   useEffect(() => {
//     dispatch(fetchShops());
//   }, [dispatch]);

//   const filteredShops = selectedCategory === 'all' 
//     ? shops 
//     : shops.filter(shop => shop.category === selectedCategory);

//   return (
//     <div className={`${styles.body} container-fluid`}>
//       <div className="row px-xl-5">
//         <div className="col-12">
//           <nav className="breadcrumb bg-light mb-30">
//             <Link className="breadcrumb-item text-dark" to="/home">Home</Link>
//             <span className="breadcrumb-item active">Shops</span>
//           </nav>
//         </div>
//       </div>

//       <div className="row px-xl-5">
//         {/* Shop Sidebar */}
//         <div className="col-lg-3 col-md-4">
//           <div className={styles.shopSidebar}>
//             <h5 className={styles.filterTitle}>
//               <span>Filter by Category</span>
//             </h5>
//             <form>
//               <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
//                 <input
//                   type="checkbox"
//                   className="custom-control-input"
//                   checked={selectedCategory === 'all'}
//                   id="category-all"
//                   onChange={() => setSelectedCategory('all')}
//                 />
//                 <label className="custom-control-label" htmlFor="category-all">All Categories</label>
//               </div>
//               {/* Add more category checkboxes here */}
//             </form>
//           </div>
//         </div>

//         {/* Shop Product List */}
//         <div className="col-lg-9 col-md-8">
//           <div className="row pb-3">
//             <div className="col-12 pb-1">
//               <div className={`d-flex align-items-center justify-content-between mb-4 ${styles.sortingOptions}`}>
//                 <div className={styles.viewToggle}>
//                   <button className="btn btn-sm"><i className="fa fa-th-large"></i></button>
//                   <button className="btn btn-sm ml-2"><i className="fa fa-bars"></i></button>
//                 </div>
//                 <div className={styles.sortDropdown}>
//                   <div className="btn-group">
//                     <button type="button" className="btn btn-sm dropdown-toggle" data-toggle="dropdown">Sorting</button>
//                     <div className="dropdown-menu dropdown-menu-right">
//                       <a className="dropdown-item" href="#">Latest</a>
//                       <a className="dropdown-item" href="#">Popularity</a>
//                       <a className="dropdown-item" href="#">Best Rating</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {loading ? (
//               <div className="col-12 text-center">
//                 <p>Loading shops...</p>
//               </div>
//             ) : error ? (
//               <div className="col-12 text-center">
//                 <p>Error: {error}</p>
//               </div>
//             ) : shops.length === 0 ? (
//               <div className="col-12 text-center">
//                 <p>No shops found.</p>
//               </div>
//             ) : (
//               filteredShops.map((shop) => (
//                 <div key={shop.id} className="col-lg-4 col-md-6 col-sm-6 pb-1">
//                   <div className={styles.shopItem}>
//                     <div className={styles.shopImage}>
//                       <img src={shop.image} alt={shop.name} />
//                     </div>
//                     <div className={styles.shopDetails}>
//                       <h6 className={styles.shopName}>{shop.name}</h6>
//                       <div className={styles.shopCategory}>{shop.category}</div>
//                       <div className={styles.shopRating}>
//                         {/* Add star rating here */}
//                         ★★★★☆
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}

//             <div className="col-12">
//               <nav>
//                 <ul className={`pagination justify-content-center ${styles.pagination}`}>
//                   <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
//                   <li className="page-item active"><a className="page-link" href="#">1</a></li>
//                   <li className="page-item"><a className="page-link" href="#">2</a></li>
//                   <li className="page-item"><a className="page-link" href="#">3</a></li>
//                   <li className="page-item"><a className="page-link" href="#">Next</a></li>
//                 </ul>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shops;







// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import styles from './shops.module.css';
// import { fetchShops } from './shopsSlice';

// function Shops() {
//   const dispatch = useDispatch();
//   const { shops = [], loading, error } = useSelector((state) => state.shops || {});
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [view, setView] = useState('grid');

//   useEffect(() => {
//     dispatch(fetchShops());
//   }, [dispatch]);

//   const filteredShops = selectedCategory === 'all' 
//     ? shops 
//     : shops.filter(shop => shop.category === selectedCategory);

//   return (
//     <div className={styles.body}>
//       <div className="container-fluid">
//         <div className="row px-xl-5">
//           <div className="col-12">
//             <nav className="breadcrumb bg-light mb-30">
//               <Link className="breadcrumb-item text-dark" to="/home">Home</Link>
//               <span className="breadcrumb-item active">Shops</span>
//             </nav>
//           </div>
//         </div>

//         <div className="row px-xl-5">
//           {/* Shop Sidebar */}
//           <div className="col-lg-3 col-md-4">
//             <div className={styles.filterSection}>
//               <h5 className={styles.filterTitle}>Filter by Category</h5>
//               <form>
//                 <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
//                   <input
//                     type="checkbox"
//                     className="custom-control-input"
//                     checked={selectedCategory === 'all'}
//                     id="category-all"
//                     onChange={() => setSelectedCategory('all')}
//                   />
//                   <label className="custom-control-label" htmlFor="category-all">All Categories</label>
//                 </div>
//                 {/* Add more category checkboxes here */}
//               </form>
//             </div>
//           </div>

//           {/* Shop Product List */}
//           <div className="col-lg-9 col-md-8">
//             <div className={styles.sortingSection}>
//               <div className={styles.viewButtons}>
//                 <button onClick={() => setView('grid')}><i className="fa fa-th-large"></i></button>
//                 <button onClick={() => setView('list')}><i className="fa fa-bars"></i></button>
//               </div>
//               <div className={styles.sortDropdown}>
//                 <select>
//                   <option>Sort by</option>
//                   <option>Latest</option>
//                   <option>Popularity</option>
//                   <option>Best Rating</option>
//                 </select>
//               </div>
//             </div>

//             <div className="row">
//               {loading ? (
//                 <div className="col-12 text-center">
//                   <p>Loading shops...</p>
//                 </div>
//               ) : error ? (
//                 <div className="col-12 text-center">
//                   <p>Error: {error}</p>
//                 </div>
//               ) : shops.length === 0 ? (
//                 <div className="col-12 text-center">
//                   <p>No shops found.</p>
//                 </div>
//               ) : (
//                 filteredShops.map((shop) => (
//                   <div key={shop.id} className={`col-lg-4 col-md-6 col-sm-6 pb-1 ${view === 'list' ? 'col-12' : ''}`}>
//                     <div className={styles.shopCard}>
//                       <div className={styles.shopImage}>
//                         <img src={shop.image} alt={shop.name} className="img-fluid" />
//                       </div>
//                       <div className={styles.shopDetails}>
//                         <h5>{shop.name}</h5>
//                         <p>{shop.description}</p>
//                         <Link to={`/shop/${shop.id}`} className="btn btn-primary">Visit Shop</Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div className={styles.pagination}>
//               <button>&laquo;</button>
//               <button className={styles.active}>1</button>
//               <button>2</button>
//               <button>3</button>
//               <button>&raquo;</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shops;










// import React, { useEffect, useState } from 'react';
// import { MDBContainer, MDBRow, MDBCol, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
// import ProductCard from '../layout/ProductCard/ProductCard'; 
// import ProductCardSkeleton from '../layout/ProductCard/ProductCardSkeleton'; 
// import { fetchProduct } from '../ProductDetails/productSlice'; 
// import { useDispatch, useSelector } from 'react-redux';
// import './shops.module.css'; 

// const Shops = () => {
//   const dispatch = useDispatch();
//   const { products, status, error, totalProductsCount } = useSelector((state) => state.products);
  
//   const [pageSize, setPageSize] = useState(8);
//   const [page, setPage] = useState(1);
//   const [pagesQuantity, setPagesQuantity] = useState(0);

//   useEffect(() => {
//     dispatch(fetchProduct({ pageSize, page }));
//   }, [dispatch, page, pageSize]);

//   useEffect(() => {
//     const totalPages = Math.ceil(totalProductsCount / pageSize);
//     setPagesQuantity(totalPages);
//   }, [pageSize, totalProductsCount]);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <MDBContainer fluid className="shop-container my-5">
//       <h1 className="text-center">Shop Our Products</h1>
//       <MDBRow>
//         {status === 'loading' ? (
//           <>
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//           </>
//         ) : status === 'succeeded' ? (
//           products.map((product) => (
//             <MDBCol key={product.id} md="6" lg="3" className="mb-4">
//               <ProductCard product={product} />
//             </MDBCol>
//           ))
//         ) : (
//           <div className="text-center">
//             <h3>There was an error loading the products.</h3>
//           </div>
//         )}
//       </MDBRow>
//       {status === 'succeeded' && (
//         <nav aria-label="Page navigation">
//           <MDBPagination center size="lg" className="mb-0">
//             {Array.from({ length: pagesQuantity }, (_, index) => (
//               <MDBPaginationItem key={index} active={index + 1 === page}>
//                 <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>
//                   {index + 1}
//                 </MDBPaginationLink>
//               </MDBPaginationItem>
//             ))}
//           </MDBPagination>
//         </nav>
//       )}
//     </MDBContainer>
//   );
// };

// export default Shops;






// import React, { useEffect, useState } from 'react';
// import { MDBContainer, MDBRow, MDBCol, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
// import ProductCard from '../layout/ProductCard/ProductCard'; 
// import ProductCardSkeleton from '../layout/ProductCard/ProductCardSkeleton'; 
// import { fetchProduct } from '../ProductDetails/productSlice'; 
// import { useDispatch, useSelector } from 'react-redux';
// import './shops.module.css'; 

// const Shops = () => {
//   const dispatch = useDispatch();
//   const { products, status, error, totalProductsCount } = useSelector((state) => state.product); 

//   const [pageSize, setPageSize] = useState(8);
//   const [page, setPage] = useState(1);
//   const [pagesQuantity, setPagesQuantity] = useState(0);

//   useEffect(() => {
//     dispatch(fetchProduct({ pageSize, page })); 
//   }, [dispatch, page, pageSize]);

//   useEffect(() => {
//     const totalPages = Math.ceil(totalProductsCount / pageSize);
//     setPagesQuantity(totalPages);
//   }, [pageSize, totalProductsCount]);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <MDBContainer fluid className="shop-container my-5">
//       <h1 className="text-center">Shop Our Products</h1>
//       <MDBRow>
//         {status === 'loading' ? (
//           <>
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//             <ProductCardSkeleton />
//           </>
//         ) : status === 'succeeded' ? (
//           products.map((product) => (
//             <MDBCol key={product.id} md="6" lg="3" className="mb-4">
//               <ProductCard product={product} />
//             </MDBCol>
//           ))
//         ) : (
//           <div className="text-center">
//             <h3>There was an error loading the products.</h3>
//           </div>
//         )}
//       </MDBRow>
//       {status === 'succeeded' && (
//         <nav aria-label="Page navigation">
//           <MDBPagination center size="lg" className="mb-0">
//             {Array.from({ length: pagesQuantity }, (_, index) => (
//               <MDBPaginationItem key={index} active={index + 1 === page}>
//                 <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>
//                   {index + 1}
//                 </MDBPaginationLink>
//               </MDBPaginationItem>
//             ))}
//           </MDBPagination>
//         </nav>
//       )}
//     </MDBContainer>
//   );
// };

// export default Shops;










import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import ProductCard from '../layout/ProductCard/ProductCard';
import ProductCardSkeleton from '../layout/ProductCard/ProductCardSkeleton';
import HowToUse from "../components/HowToUse";
import ImageSection from "../components/ImageSection"
import { fetchProducts } from '../ProductDetails/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import './shops.module.css';

const Shops = () => {
  const dispatch = useDispatch();
  const { products, status, error, totalProductsCount } = useSelector((state) => state.product);

  const [pageSize, setPageSize] = useState(8);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ pageSize, page }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    setPagesQuantity(totalPages);
  }, [pageSize, totalProductsCount]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  console.log('Products:', products);
  console.log('Status:', status);
  console.log('Error:', error);

  return (
    <MDBContainer fluid className="shop-container" style={{padding: "6rem 4rem"}}>
      {/* <h1 className="text-center">Shop Our Products</h1> */}
      <MDBRow>
        {status === 'loading' ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : status === 'succeeded' && Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <MDBCol key={product.id} md="6" lg="3" className="mb-4">
              <ProductCard product={product} />
            </MDBCol>
          ))
        ) : status === 'succeeded' && (!Array.isArray(products) || products.length === 0) ? (
          <div className="text-center">
            <h3>No products found.</h3>
          </div>
        ) : (
          <div className="text-center">
            <h3>There was an error loading the products: {error}</h3>
          </div>
        )}
      </MDBRow>
      {/* {status === 'succeeded' && Array.isArray(products) && products.length > 0 && (
        <nav aria-label="Page navigation">
          <MDBPagination center size="lg" className="mb-0">
            {Array.from({ length: pagesQuantity }, (_, index) => (
              <MDBPaginationItem key={index} active={index + 1 === page}>
                <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </MDBPaginationLink>
              </MDBPaginationItem>
            ))}
          </MDBPagination>
        </nav>
      )} */}
      <HowToUse />
      <ImageSection />
      
    </MDBContainer>
  );
};

export default Shops;


















// import React, { useState } from 'react';
// import {
//   Box,
//   Image,
//   Text,
//   VStack,
//   HStack,
//   Button,
//   IconButton,
//   Badge,
//   SimpleGrid,
//   Container,
//   Skeleton,
//   SkeletonText,
//   Center,
//   Flex,
// } from '@chakra-ui/react';
// import { StarIcon, ShoppingCartIcon, EyeIcon } from '@chakra-ui/icons';

// // Mock data for demonstration - replace with your actual product data
// const mockProducts = [
//   {
//     id: 1,
//     name: "Original Shyneen Facial Cleaner",
//     price: 29.99,
//     originalPrice: 39.99,
//     category: { id: 1, name: "Skin Care" },
//     images: [{ image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop" }],
//     quantity: 15,
//     isOnSale: true,
//     rating: 4.5
//   },
//   {
//     id: 2,
//     name: "Moisturizing Face Cream",
//     price: 24.99,
//     originalPrice: null,
//     category: { id: 1, name: "Skin Care" },
//     images: [{ image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop" }],
//     quantity: 8,
//     isOnSale: false,
//     rating: 4.8
//   },
//   {
//     id: 3,
//     name: "Natural Face Serum",
//     price: 34.99,
//     originalPrice: 44.99,
//     category: { id: 2, name: "Treatments" },
//     images: [{ image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=300&h=300&fit=crop" }],
//     quantity: 12,
//     isOnSale: true,
//     rating: 4.6
//   },
//   {
//     id: 4,
//     name: "Gentle Eye Cream",
//     price: 19.99,
//     originalPrice: null,
//     category: { id: 1, name: "Skin Care" },
//     images: [{ image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop" }],
//     quantity: 20,
//     isOnSale: false,
//     rating: 4.3
//   },
//   {
//     id: 5,
//     name: "Vitamin C Brightening Mask",
//     price: 27.99,
//     originalPrice: 32.99,
//     category: { id: 3, name: "Masks" },
//     images: [{ image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop" }],
//     quantity: 6,
//     isOnSale: true,
//     rating: 4.7
//   },
//   {
//     id: 6,
//     name: "Hydrating Toner",
//     price: 22.99,
//     originalPrice: null,
//     category: { id: 4, name: "Toners" },
//     images: [{ image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop" }],
//     quantity: 25,
//     isOnSale: false,
//     rating: 4.4
//   }
// ];

// // Individual Product Card Component
// const ProductCard = ({ product, onAddToCart, onAddToWishlist, onQuickView }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const handleAddToCart = () => {
//     onAddToCart?.(product);
//   };

//   const handleWishlist = () => {
//     onAddToWishlist?.(product);
//   };

//   const handleQuickView = () => {
//     onQuickView?.(product);
//   };

//   return (
//     <Box
//       bg="white"
//       borderRadius="lg"
//       overflow="hidden"
//       boxShadow="sm"
//       _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
//       transition="all 0.3s"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       position="relative"
//       height="400px"
//     >
//       {/* Sale Badge */}
//       {product.isOnSale && (
//         <Badge
//           position="absolute"
//           top="12px"
//           left="12px"
//           bg="pink.400"
//           color="white"
//           borderRadius="full"
//           px={3}
//           py={1}
//           fontSize="xs"
//           fontWeight="bold"
//           zIndex={2}
//         >
//           SALE
//         </Badge>
//       )}

//       {/* Wishlist Button */}
//       <IconButton
//         position="absolute"
//         top="12px"
//         right="12px"
//         size="sm"
//         variant="ghost"
//         bg="whiteAlpha.900"
//         icon={<StarIcon />}
//         onClick={handleWishlist}
//         opacity={isHovered ? 1 : 0.7}
//         transition="opacity 0.3s"
//         zIndex={2}
//         _hover={{ bg: "pink.50", color: "pink.500" }}
//       />

//       {/* Product Image */}
//       <Box position="relative" height="200px" overflow="hidden">
//         {!imageLoaded && (
//           <Skeleton height="200px" width="100%" />
//         )}
//         <Image
//           src={product.images?.[0]?.image || "https://via.placeholder.com/300"}
//           alt={product.name}
//           width="100%"
//           height="200px"
//           objectFit="cover"
//           onLoad={() => setImageLoaded(true)}
//           style={{ display: imageLoaded ? 'block' : 'none' }}
//         />
        
//         {/* Hover Overlay */}
//         <Box
//           position="absolute"
//           top="0"
//           left="0"
//           right="0"
//           bottom="0"
//           bg="blackAlpha.600"
//           opacity={isHovered ? 1 : 0}
//           transition="opacity 0.3s"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Button
//             leftIcon={<EyeIcon />}
//             size="sm"
//             bg="white"
//             color="gray.800"
//             _hover={{ bg: "gray.100" }}
//             onClick={handleQuickView}
//           >
//             Quick View
//           </Button>
//         </Box>
//       </Box>

//       {/* Product Details */}
//       <VStack align="stretch" p={4} spacing={2} height="200px" justify="space-between">
//         <VStack align="stretch" spacing={1}>
//           <Text
//             fontSize="xs"
//             color="gray.500"
//             textTransform="uppercase"
//             letterSpacing="wide"
//           >
//             {product.category?.name}
//           </Text>
          
//           <Text
//             fontSize="md"
//             fontWeight="medium"
//             color="gray.800"
//             noOfLines={2}
//             lineHeight="1.3"
//           >
//             {product.name}
//           </Text>

//           {/* Price */}
//           <HStack spacing={2} align="center">
//             <Text fontSize="lg" fontWeight="bold" color="gray.800">
//               ${product.price}
//             </Text>
//             {product.originalPrice && (
//               <Text
//                 fontSize="sm"
//                 color="gray.500"
//                 textDecoration="line-through"
//               >
//                 ${product.originalPrice}
//               </Text>
//             )}
//           </HStack>

//           {/* Stock Info */}
//           <Text fontSize="xs" color="gray.600">
//             {product.quantity > 0 ? (
//               `${product.quantity} in stock`
//             ) : (
//               <Text color="red.500">Out of stock</Text>
//             )}
//           </Text>
//         </VStack>

//         {/* Add to Cart Button */}
//         <Button
//           size="sm"
//           bg="pink.300"
//           color="white"
//           _hover={{ bg: "pink.400" }}
//           _active={{ bg: "pink.500" }}
//           leftIcon={<ShoppingCartIcon />}
//           onClick={handleAddToCart}
//           isDisabled={product.quantity === 0}
//           borderRadius="md"
//         >
//           Add to Cart
//         </Button>
//       </VStack>
//     </Box>
//   );
// };

// // Product Card Skeleton Component
// const ProductCardSkeleton = () => (
//   <Box
//     bg="white"
//     borderRadius="lg"
//     overflow="hidden"
//     boxShadow="sm"
//     height="400px"
//   >
//     <Skeleton height="200px" />
//     <VStack p={4} spacing={3} align="stretch">
//       <Skeleton height="12px" width="60px" />
//       <SkeletonText noOfLines={2} spacing={2} />
//       <Skeleton height="20px" width="80px" />
//       <Skeleton height="12px" width="100px" />
//       <Skeleton height="32px" borderRadius="md" />
//     </VStack>
//   </Box>
// );

// // Main Shop Component
// const Shops = () => {
//   const [loading, setLoading] = useState(false);
//   const [products] = useState(mockProducts); // Replace with your actual products state
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   const handleAddToCart = (product) => {
//     console.log('Add to cart:', product);
//     // Your add to cart logic here
//   };

//   const handleAddToWishlist = (product) => {
//     console.log('Add to wishlist:', product);
//     // Your wishlist logic here
//   };

//   const handleQuickView = (product) => {
//     console.log('Quick view:', product);
//     // Your quick view logic here
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <Container maxW="container.xl" py={8}>
//       <VStack spacing={8}>
//         {/* Header */}
//         <Text
//           fontSize={{ base: '2xl', md: '3xl' }}
//           fontWeight="bold"
//           color="gray.800"
//           textAlign="center"
//         >
//           Shop Our Products
//         </Text>

//         {/* Products Grid */}
//         <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} width="100%">
//           {loading ? (
//             // Show skeletons while loading
//             Array.from({ length: productsPerPage }).map((_, index) => (
//               <ProductCardSkeleton key={index} />
//             ))
//           ) : currentProducts.length > 0 ? (
//             // Show products
//             currentProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 onAddToCart={handleAddToCart}
//                 onAddToWishlist={handleAddToWishlist}
//                 onQuickView={handleQuickView}
//               />
//             ))
//           ) : (
//             // No products found
//             <Center gridColumn="1 / -1" py={12}>
//               <VStack spacing={4}>
//                 <Text fontSize="xl" color="gray.500">
//                   No products found
//                 </Text>
//                 <Text fontSize="md" color="gray.400">
//                   Check back later for new arrivals
//                 </Text>
//               </VStack>
//             </Center>
//           )}
//         </SimpleGrid>

//         {/* Pagination */}
//         {!loading && products.length > productsPerPage && (
//           <Flex justify="center" mt={8}>
//             <HStack spacing={2}>
//               {Array.from({ length: totalPages }, (_, index) => (
//                 <Button
//                   key={index + 1}
//                   size="sm"
//                   variant={currentPage === index + 1 ? "solid" : "outline"}
//                   bg={currentPage === index + 1 ? "pink.300" : "transparent"}
//                   color={currentPage === index + 1 ? "white" : "gray.600"}
//                   borderColor="pink.300"
//                   _hover={{
//                     bg: currentPage === index + 1 ? "pink.400" : "pink.50"
//                   }}
//                   onClick={() => handlePageChange(index + 1)}
//                 >
//                   {index + 1}
//                 </Button>
//               ))}
//             </HStack>
//           </Flex>
//         )}
//       </VStack>
//     </Container>
//   );
// };

// export default Shops;