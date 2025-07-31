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

  const getCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) return '';
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 1];
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
  };

  const getImageUrl = (imageData) => {
    if (!imageData) return 'https://via.placeholder.com/400x500/f5f3f0/999999?text=Product+Image';
    return imageData.url || getCloudinaryUrl(imageData.image) || 'https://via.placeholder.com/400x500/f5f3f0/999999?text=Product+Image';
  };

  const handleAddToCart = async () => {
    try {
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
      } else if (addToCart.rejected.match(result)) {
        console.error('Failed to add to cart:', result.payload);
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
        
        <div className="row g-0">
          <div className="col-lg-6">
            <div className="row g-0" style={{ height: '70vh' }}>
              <div className="col-8" style={{ padding: '0' }}>
                <div 
                  className="d-flex align-items-center justify-content-center position-relative h-100"
                  style={{ 
                    backgroundColor: '#f5f3f0',
                    background: 'linear-gradient(135deg, #f5f3f0 0%, #e8e2db 100%)',
                    padding: '0',
                    margin: '0'
                  }}
                >
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

                  <MDBCardImage
                    src={product.images?.length ? getImageUrl(product.images[img]) : 'https://via.placeholder.com/400x500/f5f3f0/999999?text=Product+Image'}
                    alt={product.title || product.name}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.1))',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                    onClick={() => changeImageOnClick(0)}
                  />
                </div>
              </div>

              <div className="col-4" style={{ padding: '0' }}>
                <div className="d-flex flex-column h-100">
                  <div className="flex-fill" style={{ padding: '0', margin: '0' }}>
                    <div 
                      className="d-flex align-items-center justify-content-center h-100 position-relative cursor-pointer"
                      style={{ 
                        backgroundColor: '#e8ddd4',
                        borderBottom: '1px solid #ffffff',
                        padding: '0',
                        margin: '0'
                      }}
                      onClick={() => changeImageOnClick(1)}
                    >
                      <MDBCardImage
                        src={product.images?.length > 1 ? getImageUrl(product.images[1]) : 'https://via.placeholder.com/200x200/e8ddd4/999999?text=Image+2'}
                        alt="Product view 2"
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          display: 'block'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                  </div>

                  <div className="flex-fill" style={{ padding: '0', margin: '0' }}>
                    <div 
                      className="d-flex align-items-center justify-content-center h-100 position-relative cursor-pointer"
                      style={{ 
                        backgroundColor: '#d4b5a0',
                        padding: '0',
                        margin: '0'
                      }}
                      onClick={() => changeImageOnClick(2)}
                    >
                      <MDBCardImage
                        src={product.images?.length > 2 ? getImageUrl(product.images[2]) : 'https://via.placeholder.com/200x200/d4b5a0/999999?text=Image+3'}
                        alt="Product view 3"
                        style={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                          display: 'block'
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

          <div className="col-lg-6">
            <div className="p-4" style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              
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
                  {product.category?.name || product.category?.title || product.brand || 'Body & Hand Toner'}
                </span>
              </div>

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

              {product.quantity !== undefined && (
                <div className="mb-3">
                  <span
                    style={{
                      fontSize: '12px',
                      color: product.quantity > 10 ? '#28a745' : product.quantity > 0 ? '#ffc107' : '#dc3545',
                      fontWeight: '500'
                    }}
                  >
                    {product.quantity > 10 ? 'In Stock' : product.quantity > 0 ? `Only ${product.quantity} left` : 'Out of Stock'}
                  </span>
                </div>
              )}

              {cartError && (
                <div className="alert alert-danger mb-3" role="alert">
                  {cartError}
                </div>
              )}

              <div className="mb-4">
                <div className="d-flex align-items-center gap-3">
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
                      disabled={product.quantity && quantity >= product.quantity}
                    >
                      +
                    </button>
                  </div>

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
                      opacity: addStatus === 'loading' || (product.quantity !== undefined && product.quantity === 0) ? 0.7 : 1
                    }}
                    onClick={handleAddToCart}
                    disabled={addStatus === 'loading' || (product.quantity !== undefined && product.quantity === 0)}
                  >
                    {addStatus === 'loading' ? 'Adding...' : 
                     (product.quantity !== undefined && product.quantity === 0) ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>

              {(product.skinType || product.size || product.applicationMethod) && (
                <div className="mb-4">
                  {product.skinType && (
                    <div className="mb-2">
                      <small style={{ color: '#666666' }}>
                        <strong>Skin Type:</strong> {product.skinType}
                      </small>
                    </div>
                  )}
                  {product.size && (
                    <div className="mb-2">
                      <small style={{ color: '#666666' }}>
                        <strong>Size:</strong> {product.size}
                      </small>
                    </div>
                  )}
                  {product.applicationMethod && (
                    <div className="mb-2">
                      <small style={{ color: '#666666' }}>
                        <strong>Application:</strong> {product.applicationMethod}
                      </small>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="row g-0" style={{backgroundColor: '#f8f8f8', marginTop: '80px'}}>
          <div className="col-lg-6" style={{ padding: '0' }}>
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{ 
                minHeight: '60vh',
                padding: '0',
                margin: '0'
              }}
            >
              <MDBCardImage
                src={product.detailsImage ? getImageUrl(product.detailsImage) : (process.env.PUBLIC_URL + "/assets/details1.png")}
                alt="Product details"
                style={{ 
                  width: '100%',
                  height: '60vh',
                  objectFit: 'cover',
                  display: 'block'
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
                  {product.title || product.name || 'SHYNEEN FACE TONER'}
                </h2>

                {product.howToUse && (
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
                      {product.howToUse}
                    </p>
                  </div>
                )}

                {product.ingredients && (
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
                      {product.ingredients}
                    </p>
                  </div>
                )}
                {product.keyFeatures && product.keyFeatures.length > 0 && (
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
                      Key Features
                    </h4>
                    <ul style={{ 
                      fontSize: '13px',
                      color: '#888888',
                      lineHeight: '1.6',
                      paddingLeft: '20px',
                      marginBottom: '0'
                    }}>
                      {product.keyFeatures.map((feature, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.benefits && product.benefits.length > 0 && (
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
                      Benefits
                    </h4>
                    <ul style={{ 
                      fontSize: '13px',
                      color: '#888888',
                      lineHeight: '1.6',
                      paddingLeft: '20px',
                      marginBottom: '0'
                    }}>
                      {product.benefits.map((benefit, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

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

                {!product.howToUse && !product.ingredients && (
                  <p 
                    style={{ 
                      fontSize: '13px',
                      color: '#666666',
                      lineHeight: '1.7',
                      marginTop: '20px'
                    }}
                  >
                    {product.description || 'This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across the product.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

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
                
                {product.productionProcess ? (
                  <div style={{ 
                    fontSize: '14px',
                    color: '#666666',
                    lineHeight: '1.8',
                    maxWidth: '400px'
                  }}>
                    {product.productionProcess.split('\n').map((paragraph, index) => (
                      <p key={index} style={{ marginBottom: '20px' }}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <>
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
                      Our production process ensures the highest quality standards while maintaining the natural essence of our ingredients.
                    </p>
                    <p 
                      style={{ 
                        fontSize: '14px',
                        color: '#666666',
                        lineHeight: '1.8',
                        maxWidth: '400px'
                      }}
                    >
                      Each product is carefully crafted to deliver exceptional results while being gentle on your skin.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6" style={{ padding: '0' }}>
            <div 
              style={{ 
                height: '60vh',
                backgroundImage: product.productionImage ? 
                  `url("${getImageUrl(product.productionImage)}")` : 
                  'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: '0'
              }}
            >
            </div>
          </div>
        </div>

        {product.beforeAfterImages && product.beforeAfterImages.before && product.beforeAfterImages.after ? (
          <BeautyComparison 
            beforeImage={getImageUrl(product.beforeAfterImages.before)}
            afterImage={getImageUrl(product.beforeAfterImages.after)}
            product={product}
          />
        ) : (
          <BeautyComparison product={product} />
        )}

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
              <RelatedProduct categoryId={product.category?._id || product.category?.id} />
            </div>
          </div>
        </div>

        <ImageSection />

      </div>
    </div>
  );
}

