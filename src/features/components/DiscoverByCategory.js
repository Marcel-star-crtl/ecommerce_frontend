// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchCategories } from "../Category/PopularCategories/popularCategoriesSlice";

// function DiscoverByCategory() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { categories, loading, error } = useSelector((state) => state.categories);

//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   const handleCategoryClick = (categoryId, categoryName) => {
//     navigate(`/category/${categoryId}`, { 
//       state: { categoryName } 
//     });
//   };

//   const getCloudinaryUrl = (imageObj) => {
//     if (!imageObj || !imageObj.url) return '';
//     return imageObj.url;
//   };

//   const getFallbackImage = (categoryTitle) => {
//     const fallbackImages = {
//       'Moisturizers': process.env.PUBLIC_URL + "/assets/cat1.png",
//       'Cleanser': process.env.PUBLIC_URL + "/assets/cat2.png",
//       'Face Lotion': process.env.PUBLIC_URL + "/assets/cat3.png",
//       'Toner': process.env.PUBLIC_URL + "/assets/cat4.png",
//       'Scrub': process.env.PUBLIC_URL + "/assets/cat5.png",
//     };
//     return fallbackImages[categoryTitle] || process.env.PUBLIC_URL + "/assets/default-category.png";
//   };

//   if (loading) {
//     return <div style={{ padding: '20px', textAlign: 'center' }}>Loading categories...</div>;
//   }

//   if (error) {
//     return <div style={{ padding: '20px', textAlign: 'center' }}>Error loading categories: {error}</div>;
//   }

//   return (
//     <div style={{ padding: '10px 20px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
//       <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//         <h2 style={{ fontSize: '28px', fontWeight: '300', color: '#E8A5C4', marginBottom: '30px', textAlign: 'left' }}>
//           Discover By Category
//         </h2>

//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//           gap: '15px'
//         }}>
//           {categories && categories.length > 0 ? (
//             categories.slice(0, 6).map((category) => (
//               <div
//                 key={category._id}
//                 onClick={() => handleCategoryClick(category._id, category.title)}
//                 style={{
//                   position: 'relative',
//                   aspectRatio: '3/4',
//                   overflow: 'hidden',
//                   cursor: 'pointer',
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = 'translateY(-5px)';
//                   e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
//                 }}
//               >
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     backgroundImage: `url(${
//                       category.image && category.image.url
//                         ? getCloudinaryUrl(category.image)
//                         : getFallbackImage(category.title)
//                     })`,
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center'
//                   }}
//                 />

//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)'
//                   }}
//                 />

//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: '20px',
//                     left: '20px',
//                     right: '20px',
//                     display: 'flex',
//                     justifyContent: 'center'
//                   }}
//                 >
//                   <button
//                     style={{
//                       backgroundColor: '#E8A5C4',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: '20px',
//                       padding: '8px 16px',
//                       fontSize: '12px',
//                       fontWeight: '500',
//                       cursor: 'pointer',
//                       transition: 'all 0.3s ease',
//                       boxShadow: '0 2px 8px rgba(232, 165, 196, 0.3)',
//                       textTransform: 'none',
//                       whiteSpace: 'nowrap'
//                     }}
//                     onMouseEnter={(e) => {
//                       e.target.style.backgroundColor = '#E298BC';
//                       e.target.style.transform = 'scale(1.05)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.target.style.backgroundColor = '#E8A5C4';
//                       e.target.style.transform = 'scale(1)';
//                     }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleCategoryClick(category._id, category.title);
//                     }}
//                   >
//                     {category.title}
//                   </button>
//                 </div>

//                 <div
//                   style={{
//                     position: 'absolute',
//                     bottom: '20px',
//                     left: '20px',
//                     right: '20px',
//                     display: 'flex',
//                     justifyContent: 'center'
//                   }}
//                 >
//                   <span
//                     style={{
//                       color: 'white',
//                       fontSize: '12px',
//                       fontWeight: '400',
//                       textShadow: '0 1px 2px rgba(0,0,0,0.7)'
//                     }}
//                   >
//                     {category.productCount || 0} Products
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px' }}>
//               <p style={{ color: '#666', fontSize: '16px' }}>No categories available</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DiscoverByCategory;














// src/DiscoverByCategory.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Correctly import fetchAllCategories
import { fetchAllCategories } from "../Category/CategoryPage/categorySlice"; // Ensure this path is correct for your main category slice

function DiscoverByCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Access state from the correct slice and properties
  const { allCategories: categories, allCategoriesStatus: loading, allCategoriesError: error } = useSelector((state) => state.category); // Assuming your root reducer has category: categoryReducer

  useEffect(() => {
    dispatch(fetchAllCategories()); // Dispatch the new thunk to get all categories
  }, [dispatch]);

  const handleCategoryClick = (categoryId, categoryName) => {
    // Log the categoryId before navigating to ensure it's not undefined here
    console.log("DiscoverByCategory: Navigating to category ID:", categoryId, "Name:", categoryName);
    if (categoryId) {
      navigate(`/category/${categoryId}`, {
        state: { categoryName },
      });
    } else {
      console.error("DiscoverByCategory: Category ID is undefined, cannot navigate.");
      // Optionally show a user-friendly message or prevent navigation
    }
  };

  const getCloudinaryUrl = (imageObj) => {
    if (!imageObj || !imageObj.url) return "";
    return imageObj.url;
  };

  const getFallbackImage = (categoryTitle) => {
    const fallbackImages = {
      'Moisturizers': process.env.PUBLIC_URL + "/assets/cat1.png",
      'Cleanser': process.env.PUBLIC_URL + "/assets/cat2.png",
      'Face Lotion': process.env.PUBLIC_URL + "/assets/cat3.png",
      'Toner': process.env.PUBLIC_URL + "/assets/cat4.png",
      'Scrub': process.env.PUBLIC_URL + "/assets/cat5.png",
    };
    return fallbackImages[categoryTitle] || process.env.PUBLIC_URL + "/assets/default-category.png";
  };

  if (loading === 'loading') { // Use the status string
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading categories...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Error loading categories: {error}</div>;
  }

  return (
    <div style={{ padding: '10px 20px', backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '300', color: '#E8A5C4', marginBottom: '30px', textAlign: 'left' }}>
          Discover By Category
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {categories && categories.length > 0 ? (
            categories.slice(0, 6).map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category._id, category.title)}
                style={{
                  position: 'relative',
                  aspectRatio: '3/4',
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
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${
                      category.image && category.image.url
                        ? getCloudinaryUrl(category.image)
                        : getFallbackImage(category.title)
                    })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />

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
                      e.stopPropagation(); // Prevent the parent div's onClick from firing twice
                      handleCategoryClick(category._id, category.title);
                    }}
                  >
                    {category.title}
                  </button>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    style={{
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '400',
                      textShadow: '0 1px 2px rgba(0,0,0,0.7)'
                    }}
                  >
                    {category.productCount || 0} Products
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 20px' }}>
              <p style={{ color: '#666', fontSize: '16px' }}>No categories available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiscoverByCategory;