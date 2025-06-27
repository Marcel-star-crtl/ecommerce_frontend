// import React from "react";
// import {
//   MDBCard,
//   MDBCardImage,
//   MDBCardSubTitle,
//   MDBCol,
//   MDBRipple,
// } from "mdb-react-ui-kit";

// import ButtonWishList from "../btn/btnwishlist";
// import Button from "../btn/btn";
// import { Link } from "react-router-dom";

// import styles from "./style.module.css";

// function ProductCard({ product }) {
//   return (
//     <div className="p-2 ">
//       <MDBCol md="12" lg="3" className={`mb-4 mb-lg-0 ${styles.product}`}>
//         <MDBCard className="h-100 justify-content-">
//           <div className="d-flex justify-content-between p-3 ">
//             <Link to={`/product/${product.id}`}>
//               <p className={`lead mb-0 ${styles.height}`}>{product.name}</p>
//             </Link>
//             <div
//               className="rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
//               style={{ width: "35px", height: "35px" }}
//             >
//               <ButtonWishList product={product} />
//             </div>
//           </div>

//           <MDBRipple
//             rippleColor="light"
//             rippleTag="div"
//             className="bg-image rounded hover-zoom hover-overlay"
//             style={{ width: "80%", height: "100px", margin: "auto" }}
//           >
//             <MDBCardImage
//               src={`https://res.cloudinary.com/ddlhwv65t/${
//                 product.images.length && product.images[0].image
//               }`}
//               position="top"
//               alt={product.name}
//               className={styles.mainImg}
//               style={{ width: "80%", height: "100px", margin: "auto" }}
//             />
//             <div
//               className="mask"
//               style={{
//                 backgroundColor: "rgba(251, 251, 251, 0.15)",
//               }}
//             ></div>
//           </MDBRipple>

//           <MDBCardSubTitle className={`m-3 `}>
//             <div className="d-flex justify-content-between">
//               <p className="small">
//                 <Link
//                   to={`/category/${product.category.id}`}
//                   className="text-muted"
//                 >
//                   {product.category.name}
//                 </Link>
//               </p>
//             </div>

//             <div className="d-flex justify-content-between mb-3">
//               <h5 className="text-dark mb-0">$ {product.price}</h5>
//             </div>

//             <div className="d-flex justify-content-between mb-2">
//               <p className="text-muted mb-0">
//                 Available: <span className="fw-bold">{product.quantity}</span>
//               </p>
//             </div>
//             <Button el={product} />
//           </MDBCardSubTitle>
//         </MDBCard>
//       </MDBCol>
//     </div>
//   );
// }

// export default ProductCard;











// import React from "react";
// import {
//   MDBCard,
//   MDBCardImage,
//   MDBCol,
//   MDBRipple,
// } from "mdb-react-ui-kit";

// import ButtonWishList from "../btn/btnwishlist";
// import Button from "../btn/btn";
// import { Link } from "react-router-dom";

// import styles from "./style.module.css";

// function ProductCard({ product }) {
//   return (
//     <div className="p-2">
//       <MDBCol md="12" lg="6" className={`mb-4 mb-lg-0 ${styles.product}`}>
//         <MDBCard 
//           className="border-0 shadow-sm"
//           style={{ 
//             borderRadius: '20px',
//             backgroundColor: '#ffffff',
//             overflow: 'hidden',
//             maxWidth: '400px'
//           }}
//         >
//           {/* Product Image Section */}
//           <div 
//             className="position-relative d-flex align-items-center justify-content-center"
//             style={{ 
//               height: '300px',
//               background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
//               padding: '20px'
//             }}
//           >
//             {/* Heart Icon */}
//             <div 
//               className="position-absolute d-flex align-items-center justify-content-center"
//               style={{ 
//                 top: '20px', 
//                 left: '20px', 
//                 width: '40px', 
//                 height: '40px',
//                 zIndex: 10
//               }}
//             >
//               <ButtonWishList product={product} />
//             </div>

//             {/* Product Image */}
//             <MDBRipple
//               rippleColor="light"
//               rippleTag="div"
//               className="d-flex align-items-center justify-content-center"
//               style={{ width: '100%', height: '100%' }}
//             >
//               <Link to={`/product/${product._id}`}>
//                 <MDBCardImage
//                   src={product.images.length ? product.images[0].url : ''}
//                   alt={product.title}
//                   className="img-fluid"
//                   style={{ 
//                     maxHeight: '260px',
//                     maxWidth: '260px',
//                     objectFit: 'contain',
//                     filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
//                   }}
//                 />
//               </Link>
//             </MDBRipple>
//           </div>

//           {/* Product Details Section */}
//           <div className="p-4" style={{ paddingTop: '30px' }}>
//             {/* Product Name */}
//             <Link 
//               to={`/product/${product._id}`}
//               className="text-decoration-none"
//             >
//               <h4 
//                 className="mb-2 fw-bold" 
//                 style={{ 
//                   fontSize: '22px',
//                   color: '#2c3e50',
//                   fontWeight: '600',
//                   lineHeight: '1.3'
//                 }}
//               >
//                 {product.title}
//               </h4>
//             </Link>

//             {/* Product Description/Category */}
//             <p 
//               className="mb-4" 
//               style={{ 
//                 fontSize: '16px',
//                 color: '#6c757d',
//                 fontWeight: '400',
//                 lineHeight: '1.4'
//               }}
//             >
//               {product.description || 'A gently formation'}
//             </p>

//             {/* Add to Cart Button */}
//             <div className="d-grid">
//               <button
//                 className="btn btn-lg fw-medium border-0"
//                 style={{
//                   backgroundColor: '#e91e63',
//                   color: '#ffffff',
//                   borderRadius: '12px',
//                   padding: '16px 24px',
//                   fontSize: '16px',
//                   fontWeight: '500',
//                   transition: 'all 0.3s ease',
//                   textTransform: 'none'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.target.style.backgroundColor = '#d81b60';
//                   e.target.style.transform = 'translateY(-1px)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.target.style.backgroundColor = '#e91e63';
//                   e.target.style.transform = 'translateY(0)';
//                 }}
//               >
//                 Add to Cart - ${product.price}
//               </button>
//             </div>

//             {/* Available quantity - subtle display */}
//             <div className="mt-3 text-center">
//               <small 
//                 className="text-muted"
//                 style={{ fontSize: '14px' }}
//               >
//                 Available: {product.quantity}
//               </small>
//             </div>

//             {/* Hidden original Button component for functionality */}
//             <div className="d-none">
//               <Button el={product} />
//             </div>
//           </div>
//         </MDBCard>
//       </MDBCol>
//     </div>
//   );
// }

// export default ProductCard;














import React from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCol,
  MDBRipple,
} from "mdb-react-ui-kit";

import ButtonWishList from "../btn/btnwishlist";
import Button from "../btn/btn";
import { Link } from "react-router-dom";

import styles from "./style.module.css";

function ProductCard({ product }) {
  return (
    <div className="p-0">
      <MDBCol md="12" lg="6" className={`mb-4 mb-lg-0 ${styles.product}`}>
        <MDBCard 
          className="border-0"
          style={{ 
            borderRadius: '0px',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            boxShadow: 'none',
            height: '100%'
          }}
        >
          {/* Product Image Section */}
          <div 
            className="position-relative d-flex align-items-center justify-content-center"
            style={{ 
              height: '100%',
              width: '100%',
              backgroundColor: '#f8f9fa',
              padding: '0px !important'
            }}
          >
            {/* Heart Icon - Top Left */}
            <div 
              className="position-absolute d-flex align-items-center justify-content-center"
              style={{ 
                top: '15px', 
                left: '15px', 
                width: '50px', 
                height: '50px',
                color: 'black',
                zIndex: 10
              }}
            >
              <ButtonWishList product={product} />
            </div>

            {/* Product Image */}
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="d-flex align-items-center justify-content-center"
              style={{ width: '100%', height: '100%' }}
            >
              <Link to={`/product/${product._id}`}>
                <MDBCardImage
                  src={product.images.length ? product.images[0].url : ''}
                  alt={product.title}
                  className={`img-fluid ${styles.mainImg}`}
                  style={{ 
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Link>
            </MDBRipple>
          </div>

          {/* Product Details Section */}
          <div className="" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            {/* Product Name */}
            <Link 
              to={`/product/${product._id}`}
              className="text-decoration-none"
            >
              <h5 
                className={`mb-2 fw-normal ${styles.height}`}
                style={{ 
                  fontSize: '18px',
                  color: '#000000',
                  fontWeight: '400',
                  lineHeight: '1.4',
                  fontFamily: 'Arial, sans-serif'
                }}
              >
                {product.title}
              </h5>
            </Link>

            {/* Product Description */}
            <p 
              className="mb-3" 
              style={{ 
                fontSize: '14px',
                color: '#666666',
                fontWeight: '400',
                lineHeight: '1.3',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              {product.description || 'A gently formation'}
            </p>

            {/* Add to Cart Button */}
            <div className="d-grid">
              <button
                className="btn border-0"
                style={{
                  backgroundColor: '#E8A5C4',
                  color: '#ffffff',
                  borderRadius: '0px',
                  padding: '12px 20px',
                  fontSize: '14px',
                  fontWeight: '400',
                  transition: 'all 0.2s ease',
                  textTransform: 'none',
                  fontFamily: 'Arial, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#E298BC';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#E8A5C4';
                }}
              >
                Add to Cart - ${product.price}
              </button>
            </div>

            {/* Hidden original Button component for functionality */}
            <div className="d-none">
              <Button el={product} />
            </div>
          </div>
        </MDBCard>
      </MDBCol>
    </div>
  );
}

export default ProductCard;





