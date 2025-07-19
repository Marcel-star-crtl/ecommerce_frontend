// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux"; 
// import { fetchAllVideos } from "../../slices/videoSlice"; 

// function VideoCarousel() {
//   const dispatch = useDispatch();
//   // Select video data, status, and error from the Redux store
//   const { videos, status, error } = useSelector((state) => state.video);

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Fetch videos when the component mounts
//   useEffect(() => {
//     dispatch(fetchAllVideos());
//   }, [dispatch]);

//   // Adjust scroll logic based on actual number of fetched videos
//   const scrollLeft = () => {
//     setCurrentIndex((prev) => Math.max(0, prev - 1));
//   };

//   const scrollRight = () => {
//     // We want to show 4 videos at a time, so max index is total_videos - 4
//     setCurrentIndex((prev) => Math.min(videos.length - 4, prev + 1));
//   };

//   // ----------------------------------------------------
//   // UI for Loading, Error, and No Videos states
//   // ----------------------------------------------------
//   if (status === 'loading') {
//     return (
//       <div style={{
//         padding: '40px 20px',
//         backgroundColor: '#ffffff',
//         textAlign: 'center',
//         fontFamily: 'Arial, sans-serif'
//       }}>
//         <h2 style={{ fontSize: '28px', fontWeight: '300', color: '#E8A5C4', marginBottom: '30px' }}>
//           Our Videos
//         </h2>
//         <p style={{ color: '#666', fontSize: '16px' }}>Loading videos...</p>
//         {/* You could add a skeleton loader here */}
//       </div>
//     );
//   }

//   if (status === 'failed') {
//     return (
//       <div style={{
//         padding: '40px 20px',
//         backgroundColor: '#ffffff',
//         textAlign: 'center',
//         fontFamily: 'Arial, sans-serif',
//         color: '#d9534f' // Bootstrap danger color for errors
//       }}>
//         <h2 style={{ fontSize: '28px', fontWeight: '300', color: '#E8A5C4', marginBottom: '30px' }}>
//           Our Videos
//         </h2>
//         <p style={{ fontSize: '16px', marginBottom: '10px' }}>Error loading videos:</p>
//         <p style={{ fontSize: '14px', fontStyle: 'italic' }}>{error || "An unknown error occurred."}</p>
//         <p style={{ fontSize: '14px', color: '#666' }}>Please try again later.</p>
//       </div>
//     );
//   }

//   if (videos.length === 0 && status === 'succeeded') {
//     return (
//       <div style={{
//         padding: '40px 20px',
//         backgroundColor: '#ffffff',
//         textAlign: 'center',
//         fontFamily: 'Arial, sans-serif'
//       }}>
//         <h2 style={{ fontSize: '28px', fontWeight: '300', color: '#E8A5C4', marginBottom: '30px' }}>
//           Our Videos
//         </h2>
//         <p style={{ color: '#666', fontSize: '16px' }}>No videos available at the moment.</p>
//       </div>
//     );
//   }

//   // ----------------------------------------------------
//   // Main Carousel UI (only renders if videos are loaded)
//   // ----------------------------------------------------
//   return (
//     <div style={{
//       padding: '40px 20px',
//       backgroundColor: '#ffffff',
//       position: 'relative',
//       fontFamily: 'Arial, sans-serif', // Consistent font family
//       maxWidth: '1400px', // Limit width for better presentation
//       margin: '0 auto', // Center the carousel
//     }}>
//       <h2 style={{ fontSize: '28px', fontWeight: '300', color: '#E8A5C4', marginBottom: '30px', textAlign: 'left' }}>
//         Our Videos
//       </h2>

//       {/* Navigation Arrows */}
//       <button
//         onClick={scrollLeft}
//         disabled={currentIndex === 0}
//         style={{
//           position: 'absolute',
//           left: '20px', // Adjust if needed to fit wider screen
//           top: '50%',
//           transform: 'translateY(-50%)',
//           width: '50px',
//           height: '50px',
//           borderRadius: '50%',
//           border: '2px solid #E8A5C4',
//           backgroundColor: 'white',
//           color: '#E8A5C4',
//           fontSize: '20px',
//           cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//           zIndex: 10,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           opacity: currentIndex === 0 ? 0.5 : 1,
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           transition: 'all 0.3s ease',
//         }}
//       >
//         ←
//       </button>

//       <button
//         onClick={scrollRight}
//         disabled={currentIndex >= videos.length - 4} // Adjust for showing 4 videos
//         style={{
//           position: 'absolute',
//           right: '20px', // Adjust if needed
//           top: '50%',
//           transform: 'translateY(-50%)',
//           width: '50px',
//           height: '50px',
//           borderRadius: '50%',
//           border: '2px solid #E8A5C4',
//           backgroundColor: 'white',
//           color: '#E8A5C4',
//           fontSize: '20px',
//           cursor: currentIndex >= videos.length - 4 ? 'not-allowed' : 'pointer',
//           zIndex: 10,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           opacity: currentIndex >= videos.length - 4 ? 0.5 : 1,
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           transition: 'all 0.3s ease',
//         }}
//       >
//         →
//       </button>

//       {/* Video Grid Container */}
//       <div style={{
//         overflow: 'hidden',
//         margin: '0 80px' // Space for arrows
//       }}>
//         <div style={{
//           display: 'flex',
//           transform: `translateX(-${currentIndex * (100 / 4)}%)`, // 100% / number of visible items
//           transition: 'transform 0.3s ease-in-out',
//           gap: '20px' // Gap between video cards
//         }}>
//           {videos.map((video, index) => (
//             <div
//               key={video.id || index} // Use video.id from backend, fallback to index
//               style={{
//                 minWidth: `calc(${100 / 4}% - 15px)`, // Width for 4 items, accounting for gap
//                 flexShrink: 0, // Prevent shrinking
//                 display: 'flex',
//                 flexDirection: 'column',
//                 cursor: 'pointer',
//                 boxShadow: '0 4px 15px rgba(0,0,0,0.1)', // Soft shadow
//                 borderRadius: '20px', // Consistent border radius
//                 overflow: 'hidden', // Ensure content respects border radius
//                 backgroundColor: '#fefefe', // Slightly off-white background for cards
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               }}
//               onMouseEnter={(e) => { // Hover effect for cards
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
//               }}
//               onClick={() => console.log(`Playing video ${video.id || index}: ${video.videoUrl}`)} // Assuming video.videoUrl exists
//             >
//               {/* Video Thumbnail */}
//               <div style={{
//                 position: 'relative',
//                 width: '100%',
//                 aspectRatio: '16/9', // Common video aspect ratio
//                 borderRadius: '20px 20px 0 0', // Rounded top corners only
//                 overflow: 'hidden',
//                 backgroundImage: `url(${video.thumbnail})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 flexShrink: 0, // Prevent thumbnail from shrinking
//               }}>
//                 {/* Play Button Overlay */}
//                 <div style={{
//                   position: 'absolute',
//                   top: '50%',
//                   left: '50%',
//                   transform: 'translate(-50%, -50%)',
//                   width: '60px',
//                   height: '60px',
//                   backgroundColor: 'rgba(255,255,255,0.9)',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '24px',
//                   color: '#333',
//                   boxShadow: '0 2px 10px rgba(0,0,0,0.2)', // More pronounced shadow for play button
//                 }}>
//                   ▶
//                 </div>
//               </div>

//               {/* Video Info (outside thumbnail div) */}
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 padding: '15px',
//                 flexGrow: 1, // Allow this section to grow
//                 backgroundColor: '#ffffff', // White background for info area
//                 borderRadius: '0 0 20px 20px', // Rounded bottom corners
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   backgroundColor: '#E8A5C4', // Primary accent color for the info bar
//                   borderRadius: '25px',
//                   padding: '8px 15px',
//                   gap: '10px',
//                   marginBottom: '10px', // Space between info bar and product details
//                   boxShadow: '0 2px 8px rgba(232, 165, 196, 0.3)', // Consistent shadow
//                 }}>
//                   {/* Avatar */}
//                   <img
//                     src={video.avatar}
//                     alt="User avatar"
//                     style={{
//                       width: '30px',
//                       height: '30px',
//                       borderRadius: '50%',
//                       objectFit: 'cover'
//                     }}
//                   />

//                   {/* Text Content */}
//                   <div style={{ flex: 1 }}>
//                     <div style={{
//                       fontSize: '12px',
//                       fontWeight: '600',
//                       color: 'white',
//                       marginBottom: '2px',
//                       whiteSpace: 'nowrap', // Prevent wrapping
//                       overflow: 'hidden', // Hide overflow
//                       textOverflow: 'ellipsis', // Add ellipsis
//                     }}>
//                       {video.productName}
//                     </div>
//                     <div style={{
//                       fontSize: '11px',
//                       color: 'rgba(255,255,255,0.9)',
//                       whiteSpace: 'nowrap', // Prevent wrapping
//                       overflow: 'hidden', // Hide overflow
//                       textOverflow: 'ellipsis', // Add ellipsis
//                     }}>
//                       {video.description}
//                     </div>
//                   </div>

//                   {/* Arrow Icon */}
//                   <div style={{
//                     width: '20px',
//                     height: '20px',
//                     borderRadius: '50%',
//                     backgroundColor: 'rgba(255,255,255,0.2)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: '10px',
//                     color: 'white'
//                   }}>
//                     →
//                   </div>
//                 </div>
//                 {/* Add more product details or video stats here if available from backend */}
//                 {/* Example: */}
//                 {/* <p style={{ fontSize: '13px', color: '#555', marginTop: '5px' }}>Views: 1.2K</p> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoCarousel;













import React, { useState } from "react";

function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      id: 1,
      thumbnail: process.env.PUBLIC_URL + "/assets/OriginalWHT.png",
      productName: "Shyneen Face Toner",
      description: "How I Use It",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b29c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      productName: "Shyneen Face Toner",
      description: "How I Use It",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      productName: "Shyneen Face Toner",
      description: "How I Use It",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80"
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      productName: "Shyneen Face Toner",
      description: "How I Use It",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80"
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      productName: "Shyneen Face Toner",
      description: "How I Use It",
      avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80"
    },
    {
      id: 6,
      thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      productName: "Shyneen Face Toner",
      description: "How I Use It",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80"
    },
    {
      id: 7,
      thumbnail: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      productName: "Shyneen Face Toner",
      description: "How I Use It",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b29c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80"
    }
  ];

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex(prev => Math.min(videos.length - 4, prev + 1));
  };

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#ffffff',
      position: 'relative'
    }}>
      {/* Navigation Arrows */}
      <button
        onClick={scrollLeft}
        disabled={currentIndex === 0}
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid #E8A5C4',
          backgroundColor: 'white',
          color: '#E8A5C4',
          fontSize: '20px',
          cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: currentIndex === 0 ? 0.5 : 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        ←
      </button>

      <button
        onClick={scrollRight}
        disabled={currentIndex >= videos.length - 4}
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid #E8A5C4',
          backgroundColor: 'white',
          color: '#E8A5C4',
          fontSize: '20px',
          cursor: currentIndex >= videos.length - 4 ? 'not-allowed' : 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: currentIndex >= videos.length - 4 ? 0.5 : 1,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        →
      </button>

      {/* Video Grid Container */}
      <div style={{
        overflow: 'hidden',
        margin: '0 80px'
      }}>
        <div style={{
          display: 'flex',
          transform: `translateX(-${currentIndex * 25}%)`,
          transition: 'transform 0.3s ease-in-out',
          gap: '20px'
        }}>
          {videos.map((video, index) => (
            <div
              key={video.id}
              style={{
                minWidth: 'calc(25% - 15px)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => console.log(`Playing video ${video.id}`)}
            >
              {/* Video Thumbnail */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundImage: `url(${video.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '15px'
              }}>
                {/* Play Button Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: '#333'
                }}>
                  ▶
                </div>
              </div>

              {/* Video Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#E8A5C4',
                borderRadius: '25px',
                padding: '8px 15px',
                gap: '10px'
              }}>
                {/* Avatar */}
                <img
                  src={video.avatar}
                  alt="User avatar"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />

                {/* Text Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '2px'
                  }}>
                    {video.productName}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    {video.description}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  color: 'white'
                }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoCarousel;