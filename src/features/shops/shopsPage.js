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
















