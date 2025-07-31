import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlist,
  resetWishlistStatus,
} from "./wishlistSlice";

export default function Wishlist() {
  const dispatch = useDispatch();

  // Get data from Redux store
  const {
    products,
    fetchStatus,
    removeStatus,
    error,
    totalProductsCount,
    currentPage,
    totalPages,
  } = useSelector((state) => state.wishlist);

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [removingProductId, setRemovingProductId] = useState(null); 

  const CLOUDINARY_CLOUD_NAME = 'ddlhwv65t';

  const getCloudinaryUrl = (imageUrl) => {
    if (!imageUrl) {
      console.log('No imageUrl provided');
      return '';
    }
    
    console.log('Processing imageUrl:', imageUrl);
    
    if (imageUrl.includes('res.cloudinary.com')) {
      console.log('Already a Cloudinary URL');
      return imageUrl;
    }
    
    const urlParts = imageUrl.split('/');
    const imageId = urlParts[urlParts.length - 1];
    const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
    console.log('Constructed Cloudinary URL:', cloudinaryUrl);
    return cloudinaryUrl;
  };

  const getWishlistItemImageUrl = (item) => {
    console.log('Wishlist item data:', item); 
    
    if (item.images && Array.isArray(item.images) && item.images.length > 0) {
      const firstImage = item.images[0];
      console.log('First image:', firstImage); 
      
      if (firstImage?.url) {
        return getCloudinaryUrl(firstImage.url);
      } else if (firstImage?.image) {
        return getCloudinaryUrl(firstImage.image);
      } else if (typeof firstImage === 'string') {
        return getCloudinaryUrl(firstImage);
      }
    } 
    
    if (item.image) {
      console.log('Using item.image:', item.image);
      return getCloudinaryUrl(item.image);
    }
    
    if (item.product?.images && Array.isArray(item.product.images) && item.product.images.length > 0) {
      const firstImage = item.product.images[0];
      
      if (firstImage?.url) {
        return getCloudinaryUrl(firstImage.url);
      } else if (firstImage?.image) {
        return getCloudinaryUrl(firstImage.image);
      } else if (typeof firstImage === 'string') {
        return getCloudinaryUrl(firstImage);
      }
    }
    
    console.log('No valid image found, using fallback');
    return 'https://via.placeholder.com/120x120/f8f9fa/666666?text=No+Image';
  };

  const deleteItem = async (productId) => {
    setRemovingProductId(productId);
    try {
      await dispatch(removeFromWishlist(productId)).unwrap();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    } finally {
      setRemovingProductId(null);
    }
  };

  const addToCart = (product) => {
    console.log("Adding to cart:", product);
  };

  const toggleWishlist = (productId) => {
    if (productId && removingProductId !== productId) {
      deleteItem(productId);
    }
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishlist());
    }
  };

  useEffect(() => {
    dispatch(fetchWishlist({ page, size: pageSize }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    return () => {
      dispatch(resetWishlistStatus());
    };
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  
  if (fetchStatus === "failed") {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          color: "red",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <h3>Error loading wishlist</h3>
          <p>{error}</p>
          <button
            onClick={() => dispatch(fetchWishlist({ page, size: pageSize }))}
            style={{
              padding: "10px 20px",
              backgroundColor: "#E8A5C4",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty wishlist state
  if (fetchStatus === "succeeded" && (!products || products.length === 0)) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "60px 40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#f0f0f0",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
              color: "#ccc",
            }}
          >
            ❤️
          </div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#333",
              margin: "0 0 10px 0",
            }}
          >
            Your Wishlist looks empty
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "#666",
              margin: "0 0 25px 0",
            }}
          >
            What are you waiting for?
          </p>
          <button
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#E8A5C4",
              color: "white",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#E298BC")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#E8A5C4")}
            onClick={() => (window.location.href = "/products")}
          >
            START SHOPPING
          </button>
        </div>
      </div>
    );
  }

  // Main wishlist content
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "400",
              color: "#333",
              margin: "0 0 30px 0",
            }}
          >
            Loves ({totalProductsCount})
          </h1>

          {/* Navigation Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "20px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <button
                onClick={handleClearWishlist}
                disabled={!products || products.length === 0}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "14px",
                  color: products && products.length > 0 ? "#333" : "#ccc",
                  cursor:
                    products && products.length > 0 ? "pointer" : "not-allowed",
                  fontWeight: "500",
                }}
              >
                Clear All
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "14px",
                  color: "#333",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Share
              </button>
            </div>

            <div
              style={{
                fontSize: "14px",
                color: "#666",
              }}
            >
              Sort by: <strong>Recently Added</strong>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {fetchStatus === "loading" && (
          <div
            style={{
              height: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                border: "3px solid #f3f3f3",
                borderTop: "3px solid #E8A5C4",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
        )}

        {/* Products List */}
        {fetchStatus === "succeeded" && products && products.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
            }}
          >
            {products.map((product, index) => (
              <div
                key={product?._id || `product-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "30px 0",
                  borderBottom:
                    index < products.length - 1
                      ? "1px solid #f0f0f0"
                      : "none",
                  gap: "20px",
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    backgroundColor: "#f8f9fa",
                    // borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden", 
                    padding: "0px" 
                  }}
                >
                  <img
                    src={getWishlistItemImageUrl(product)}
                    alt={product?.title || product?.name || 'Product'}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover", 
                      display: "block",
                      cursor: "pointer",
                    }}
                    onClick={() => console.log("Navigate to product:", product?._id)}
                  />
                </div>

                {/* Product Details */}
                <div
                  style={{
                    flex: 1,
                    paddingRight: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#333",
                      margin: "0 0 8px 0",
                      cursor: "pointer",
                    }}
                  >
                    {product?.title || product?.name || 'Unknown Product'}
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: "0 0 8px 0",
                      lineHeight: "1.5",
                    }}
                  >
                    {product?.description || 'No description available.'}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#999",
                      margin: "0 0 8px 0",
                      letterSpacing: "0.5px",
                    }}
                  >
                    ITEM {product?._id ? product._id.slice(-8).toUpperCase() : 'N/A'}
                  </p>
                  {product?.size && (
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#333",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Size: {product.size}
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      margin: "0 0 12px 0",
                    }}
                  >
                    Brand: {product?.brand || 'Unknown Brand'}
                  </p>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "14px",
                      color: "#4285f4",
                      cursor: "pointer",
                      textDecoration: "underline",
                      padding: "0",
                      fontWeight: "500",
                    }}
                  >
                    View similar products
                  </button>
                </div>

                {/* Price and Actions */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "15px",
                    minWidth: "200px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#333",
                    }}
                  >
                    ${product?.price ? product.price.toFixed(2) : "0.00"}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#E8A5C4",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#E298BC")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#E8A5C4")
                      }
                    >
                      ADD TO CART
                    </button>

                    {/* Heart Icon (Remove from Wishlist) */}
                    <button
                      onClick={() => toggleWishlist(product?._id)}
                      disabled={!product?._id || removingProductId === product?._id}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "20px",
                        color: removingProductId === product?._id ? "#ccc" : "#ff4757",
                        cursor: (!product?._id || removingProductId === product?._id) ? "not-allowed" : "pointer",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: (!product?._id || removingProductId === product?._id) ? 0.5 : 1,
                        transition: "all 0.2s ease",
                      }}
                      title={removingProductId === product?._id ? "Removing..." : "Remove from wishlist"}
                    >
                      {removingProductId === product?._id ? "⏳" : "❤️"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              gap: "10px",
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                color: "#333",
                cursor: currentPage <= 1 ? "not-allowed" : "pointer",
                borderRadius: "4px",
                fontSize: "14px",
                opacity: currentPage <= 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  backgroundColor:
                    index + 1 === currentPage ? "#E8A5C4" : "white",
                  color: index + 1 === currentPage ? "white" : "#333",
                  cursor: "pointer",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                backgroundColor: "white",
                color: "#333",
                cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
                borderRadius: "4px",
                fontSize: "14px",
                opacity: currentPage >= totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
