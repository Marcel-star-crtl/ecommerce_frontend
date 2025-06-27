import styles from "./style.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "./productSlice";
import { addToCart } from "../cart/cartSlice"; 

import Button from "../layout/btn/btn";
import DetailsInputQuantity from "../layout/input/DetailsInputQuantity";
import BeautyComparison from "../components/BeautyComparison"
import ImageSection from "../components/ImageSection"

import { Link, useParams } from "react-router-dom";
import ButtonWishList from "../layout/btn/btnwishlist";
import RelatedProduct from "./relatedProduct";
import { MDBCardImage, MDBRipple } from "mdb-react-ui-kit";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.product);
  const { addStatus, error: cartError } = useSelector((state) => state.cart); 
  const currentUser = useSelector((state) => state.auth);
  const [img, setImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Define the correct Cloudinary cloud name
  const CLOUDINARY_CLOUD_NAME = 'ddlhwv65t';

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="alert alert-warning text-center" role="alert">
        Product not found
      </div>
    );
  }

  const changeImageOnClick = (index) => {
    setImage(index);
  };

  const totalPrice = ($event) => {
    setQuantity($event.quantity);
  };

  // Function to get the correct Cloudinary URL
  const getCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) return '';
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 1];
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
  };

  // ProductDetails.js (handleAddToCart function)
  const handleAddToCart = async () => {
    try {
      // Fix: Ensure color is a string, not an array
      let color = product.color || "default";
      if (Array.isArray(color)) {
        color = color[0] || "default";
      }

      const result = await dispatch(addToCart({
        product: {
          ...product,
          color: color
        },
        quantity: quantity
      }));

      if (addToCart.fulfilled.match(result)) {
        console.log('Product added to cart successfully');
        // Show success notification
      } else if (addToCart.rejected.match(result)) {
        console.error('Failed to add to cart:', result.payload);
        // Show error notification
      }
    } catch (error) {
      console.error('Add to cart error:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className="container-fluid" style={{ maxWidth: '1400px', margin: '70px auto', padding: '0px' }}>
        
        {/* Main Product Section - Hero Area */}
        <div className="row g-0">
          {/* Left Side - Product Images Grid */}
          <div className="col-lg-6">
            <div className="row g-0" style={{ height: '70vh' }}>
              {/* Main Featured Image - Left Column (spans 2 rows) */}
              <div className="col-8">
                <div 
                  className="d-flex align-items-center justify-content-center position-relative h-100"
                  style={{ 
                    backgroundColor: '#f5f3f0',
                    background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e2db 100%)'
                  }}
                >
                  {/* Heart Icon - Top Left */}
                  <div 
                    className="position-absolute"
                    style={{ 
                      top: '30px', 
                      left: '30px',
                      zIndex: 10
                    }}
                  >
                    <ButtonWishList product={product} />
                  </div>

                  {/* Main Product Image */}
                  <div className="text-center">
                    <MDBCardImage
                      src={product.images?.length ? getCloudinaryUrl(product.images[img]?.image) || product.images[0]?.url : 'https://via.placeholder.com/400x500/f5f3f0/999999?text=Product+Image'}
                      alt={product.name}
                      style={{ 
                        maxWidth: '350px',
                        maxHeight: '450px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
                        cursor: 'pointer'
                      }}
                      onClick={() => changeImageOnClick(0)}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Two Smaller Images */}
              <div className="col-4">
                <div className="d-flex flex-column h-100">
                  {/* Top Small Image */}
                  <div className="flex-fill">
                    <div 
                      className="d-flex align-items-center justify-content-center h-100 position-relative cursor-pointer"
                      style={{ 
                        backgroundColor: '#e8ddd4',
                        borderBottom: '1px solid #ffffff'
                      }}
                      onClick={() => changeImageOnClick(1)}
                    >
                      <MDBCardImage
                        src={product.images?.length > 1 ? getCloudinaryUrl(product.images[2]?.image) || product.images[2]?.url : 'https://via.placeholder.com/200x200/e8ddd4/999999?text=Image+2'}
                        alt="Product view 2"
                        style={{ 
                          maxWidth: '120px',
                          maxHeight: '150px',
                          objectFit: 'contain',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                  </div>

                  {/* Bottom Small Image */}
                  <div className="flex-fill">
                    <div 
                      className="d-flex align-items-center justify-content-center h-100 position-relative cursor-pointer"
                      style={{ 
                        backgroundColor: '#d4b5a0'
                      }}
                      onClick={() => changeImageOnClick(2)}
                    >
                      <MDBCardImage
                        src={product.images?.length > 2 ? getCloudinaryUrl(product.images[3]?.image) || product.images[3]?.url : 'https://via.placeholder.com/200x200/d4b5a0/999999?text=Image+3'}
                        alt="Product view 3"
                        style={{ 
                          maxWidth: '120px',
                          maxHeight: '150px',
                          objectFit: 'contain',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="col-lg-6">
            <div className="p-4" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              
              {/* Brand/Category */}
              <div className="mb-2">
                <span
                  style={{ 
                    color: '#999999',
                    fontSize: '12px',
                    fontWeight: '400',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {product.category?.name || 'Body & Hand Toner'}
                </span>
              </div>

              {/* Product Name */}
              <h1 
                className="mb-3"
                style={{ 
                  fontSize: '28px',
                  fontWeight: '400',
                  color: '#333333',
                  lineHeight: '1.2',
                  textDecoration: 'underline',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '4px'
                }}
              >
                {product.name || product.title || 'Shyneen Face Toner'}
              </h1>

              {/* Description */}
              <p 
                className="mb-4"
                style={{ 
                  fontSize: '14px',
                  color: '#666666',
                  fontWeight: '400',
                  lineHeight: '1.5',
                  maxWidth: '90%'
                }}
              >
                {product.description || 'This beauty product line was creatively designed to emphasize the flawless beauty of mother nature.'}
              </p>

              {/* Price */}
              <div className="mb-4">
                <div className="d-flex align-items-baseline">
                  <h2 
                    className="mb-0 me-3"
                    style={{ 
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#333333'
                    }}
                  >
                    ${product.price || '100.09'}
                  </h2>
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#999999',
                      fontWeight: '400'
                    }}
                  >
                    ${product.price || '100.09'} per unit
                  </span>
                </div>
              </div>

              {/* Error message for cart */}
              {cartError && (
                <div className="alert alert-danger mb-3" role="alert">
                  {cartError}
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-3">
                  {/* Quantity Selector */}
                  <div className="d-flex align-items-center border rounded" style={{ backgroundColor: '#ffffff' }}>
                    <button 
                      className="btn btn-sm border-0"
                      style={{ fontSize: '16px', color: '#666666', padding: '8px 12px' }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span 
                      className="px-3"
                      style={{ fontSize: '14px', color: '#333333', minWidth: '30px', textAlign: 'center' }}
                    >
                      {quantity}
                    </span>
                    <button 
                      className="btn btn-sm border-0"
                      style={{ fontSize: '16px', color: '#666666', padding: '8px 12px' }}
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="btn flex-grow-1"
                    style={{
                      backgroundColor: '#F7A9C7',
                      border: 'none',
                      color: '#333333',
                      fontSize: '14px',
                      fontWeight: '500',
                      padding: '12px 24px',
                      borderRadius: '4px',
                      opacity: addStatus === 'loading' ? 0.7 : 1
                    }}
                    onClick={handleAddToCart}
                    disabled={addStatus === 'loading'}
                  >
                    {addStatus === 'loading' ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>

              {/* Expandable Sections */}
              <div className="mt-0">
                {/* How To Use */}
                <div className="border-bottom pb-3">
                  <div 
                    className="d-flex justify-content-between align-items-center cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {/* Toggle functionality */}}
                  >
                    <span style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      How To Use
                    </span>
                    <span style={{ fontSize: '18px', color: '#666666' }}>×</span>
                  </div>
                  <div className="mt-2">
                    <p style={{ fontSize: '12px', color: '#666666', lineHeight: '1.5', margin: '0' }}>
                      This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. natural colors to provide a calm and soothing feeling to everyone who comes across the product.
                    </p>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="border-bottom py-3">
                  <div 
                    className="d-flex justify-content-between align-items-center cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {/* Toggle functionality */}}
                  >
                    <span style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      Ingridients
                    </span>
                    <span style={{ fontSize: '18px', color: '#666666' }}>×</span>
                  </div>
                  <div className="mt-2">
                    <p style={{ fontSize: '12px', color: '#666666', lineHeight: '1.5', margin: '0' }}>
                      This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product, natural colors to provide a calm and soothing feeling to everyone who comes across the product.
                    </p>
                  </div>
                </div>

                {/* Production Process */}
                <div className="py-3">
                  <div 
                    className="d-flex justify-content-between align-items-center cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {/* Toggle functionality */}}
                  >
                    <span style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      Production Process
                    </span>
                    <span style={{ fontSize: '18px', color: '#666666' }}>+</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Secondary Image */}
        {/* <div className="row g-0">
          <div className="col-12">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{ 
                minHeight: '50vh',
                backgroundColor: '#d4b5a0',
                background: 'linear-gradient(135deg, #d4b5a0 0%, #c9a892 100%)'
              }}
            >
              <MDBCardImage
                src={product.images?.length > 1 ? getCloudinaryUrl(product.images[1]?.image) || product.images[1]?.url : 'https://via.placeholder.com/600x300/d4b5a0/ffffff?text=Product+Usage'}
                alt="Product usage"
                style={{ 
                  maxWidth: '600px',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))'
                }}
              />
            </div>
          </div>
        </div> */}

        {/* How to Use Section */}
        <div className="row g-0" style={{backgroundColor: '#f8f8f8'}}>
          <div className="col-lg-6">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{ 
                minHeight: '60vh',
                padding: '0'
              }}
            >
              <MDBCardImage
                src={process.env.PUBLIC_URL + "/assets/details1.png"}
                alt="Face toner application"
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  minHeight: '60vh'
                }}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div 
              className="p-5 d-flex align-items-start justify-content-start" 
              style={{ 
                minHeight: '60vh',
                paddingTop: '80px !important',
                paddingLeft: '60px !important',
                paddingRight: '60px !important'
              }}
            >
              <div style={{ maxWidth: '400px' }}>
                {/* Small header */}
                <p 
                  style={{ 
                    fontSize: '11px',
                    fontWeight: '400',
                    color: '#999999',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '15px',
                    margin: '0 0 15px 0'
                  }}
                >
                  HOW TO USE
                </p>

                {/* Main product title */}
                <h2 
                  style={{ 
                    fontSize: '28px',
                    fontWeight: '600',
                    color: '#000000',
                    lineHeight: '1.2',
                    marginBottom: '25px',
                    letterSpacing: '0px',
                    textTransform: 'uppercase'
                  }}
                >
                  SHYNEEN FACE TONER
                </h2>

                {/* How To Use subsection */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 
                    style={{ 
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000000',
                      marginBottom: '8px',
                      textTransform: 'none'
                    }}
                  >
                    How To Use
                  </h4>
                  <p 
                    style={{ 
                      fontSize: '13px',
                      color: '#888888',
                      lineHeight: '1.6',
                      marginBottom: '0'
                    }}
                  >
                    This beauty product line was creatively designed to emphasize the flawless beauty of mother nature.
                  </p>
                </div>

                {/* Ingredients subsection */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 
                    style={{ 
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000000',
                      marginBottom: '8px',
                      textTransform: 'none'
                    }}
                  >
                    Ingredients
                  </h4>
                  <p 
                    style={{ 
                      fontSize: '13px',
                      color: '#888888',
                      lineHeight: '1.6',
                      marginBottom: '0'
                    }}
                  >
                    This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.
                  </p>
                </div>

                {/* Production Process subsection */}
                <div style={{ marginBottom: '30px' }}>
                  <h4 
                    style={{ 
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#000000',
                      marginBottom: '8px',
                      textTransform: 'none',
                      paddingBottom: '8px',
                      borderBottom: '1px solid #e0e0e0'
                    }}
                  >
                    Production Process
                  </h4>
                </div>

                {/* Main description */}
                <p 
                  style={{ 
                    fontSize: '13px',
                    color: '#666666',
                    lineHeight: '1.7',
                    marginTop: '20px'
                  }}
                >
                  This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Production Process Section */}
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="p-5 d-flex align-items-center" style={{ minHeight: '60vh', backgroundColor: '#ffffff' }}>
              <div>
                <p 
                  className="mb-2"
                  style={{ 
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#666666',
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  DISCOVER OUR
                </p>
                <h3 
                  className="mb-4"
                  style={{ 
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#000000',
                    letterSpacing: '0px',
                    textTransform: 'uppercase',
                    lineHeight: '1.2'
                  }}
                >
                  PRODUCTION PROCESS
                </h3>
                <p 
                  style={{ 
                    fontSize: '14px',
                    color: '#666666',
                    lineHeight: '1.8',
                    maxWidth: '400px',
                    marginBottom: '20px'
                  }}
                >
                  This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.
                </p>
                <p 
                  style={{ 
                    fontSize: '14px',
                    color: '#666666',
                    lineHeight: '1.8',
                    maxWidth: '400px',
                    marginBottom: '20px'
                  }}
                >
                  This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.
                </p>
                <p 
                  style={{ 
                    fontSize: '14px',
                    color: '#666666',
                    lineHeight: '1.8',
                    maxWidth: '400px'
                  }}
                >
                  This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div 
              style={{ 
                minHeight: '60vh',
                backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
            </div>
          </div>
        </div>

        {/* Before/After Section */}
        <BeautyComparison />

        {/* Trending Products Section */}
        <div className="row g-0">
          <div className="col-12">
            <div className="p-5" style={{ backgroundColor: '#ffffff' }}>
              <h3 
                className="mb-5 text-center"
                style={{ 
                  fontSize: '28px',
                  fontWeight: '300',
                  color: '#333333',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                Trending Products
              </h3>
              <RelatedProduct categoryId={product.category?.id} />
            </div>
          </div>
        </div>

        <ImageSection />

      </div>
    </div>
  );
}