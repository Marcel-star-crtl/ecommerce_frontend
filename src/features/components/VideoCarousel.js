import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../videos/videoSlice";

function VideoCarousel() {
  const dispatch = useDispatch();
  const { videos: apiVideos, loading, error } = useSelector((state) => state.videos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive values
  const getResponsiveValues = () => {
    if (windowWidth <= 480) {
      return {
        itemsPerView: 1,
        itemWidth: '100%',
        gap: '10px',
        margin: '0 10px',
        padding: '20px 10px',
        arrowSize: '40px',
        videoHeight: '250px',
        fontSize: { title: '11px', description: '10px' },
        avatarSize: '25px',
        infoPadding: '6px 12px'
      };
    } else if (windowWidth <= 768) {
      return {
        itemsPerView: 2,
        itemWidth: 'calc(50% - 10px)',
        gap: '15px',
        margin: '0 30px',
        padding: '30px 15px',
        arrowSize: '45px',
        videoHeight: '280px',
        fontSize: { title: '12px', description: '11px' },
        avatarSize: '28px',
        infoPadding: '7px 14px'
      };
    } else if (windowWidth <= 1024) {
      return {
        itemsPerView: 3,
        itemWidth: 'calc(33.333% - 13px)',
        gap: '20px',
        margin: '0 60px',
        padding: '35px 20px',
        arrowSize: '48px',
        videoHeight: '300px',
        fontSize: { title: '12px', description: '11px' },
        avatarSize: '30px',
        infoPadding: '8px 15px'
      };
    } else {
      return {
        itemsPerView: 4,
        itemWidth: 'calc(25% - 15px)',
        gap: '20px',
        margin: '0 80px',
        padding: '40px 20px',
        arrowSize: '50px',
        videoHeight: '300px',
        fontSize: { title: '12px', description: '11px' },
        avatarSize: '30px',
        infoPadding: '8px 15px'
      };
    }
  };

  const responsive = getResponsiveValues();

  // Fallback videos in case API fails or is empty
  const fallbackVideos = [
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

  // Use API videos if available, otherwise fallback
  const videos = apiVideos && apiVideos.length > 0 ? apiVideos.map((video, index) => ({
    id: video._id || index + 1,
    thumbnail: video.thumbnail || fallbackVideos[index % fallbackVideos.length].thumbnail,
    productName: video.title || video.productName || "Shyneen Product",
    description: video.description || "How I Use It",
    avatar: video.avatar || fallbackVideos[index % fallbackVideos.length].avatar,
    url: video.url || video.videoUrl
  })) : fallbackVideos;

  const scrollLeft = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    const maxIndex = Math.max(0, videos.length - responsive.itemsPerView);
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <div style={{
      padding: responsive.padding,
      backgroundColor: '#ffffff',
      position: 'relative'
    }}>
      {/* Navigation Arrows - Hide on mobile if single item view */}
      {!(windowWidth <= 480 && videos.length <= 1) && (
        <>
          <button
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            style={{
              position: 'absolute',
              left: windowWidth <= 480 ? '10px' : '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: responsive.arrowSize,
              height: responsive.arrowSize,
              borderRadius: '50%',
              border: '2px solid #E8A5C4',
              backgroundColor: 'white',
              color: '#E8A5C4',
              fontSize: windowWidth <= 480 ? '16px' : '20px',
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
            disabled={currentIndex >= Math.max(0, videos.length - responsive.itemsPerView)}
            style={{
              position: 'absolute',
              right: windowWidth <= 480 ? '10px' : '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: responsive.arrowSize,
              height: responsive.arrowSize,
              borderRadius: '50%',
              border: '2px solid #E8A5C4',
              backgroundColor: 'white',
              color: '#E8A5C4',
              fontSize: windowWidth <= 480 ? '16px' : '20px',
              cursor: currentIndex >= Math.max(0, videos.length - responsive.itemsPerView) ? 'not-allowed' : 'pointer',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: currentIndex >= Math.max(0, videos.length - responsive.itemsPerView) ? 0.5 : 1,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            →
          </button>
        </>
      )}

      {/* Video Grid Container */}
      <div style={{
        overflow: 'hidden',
        margin: responsive.margin
      }}>
        <div style={{
          display: 'flex',
          transform: `translateX(-${currentIndex * (100 / responsive.itemsPerView)}%)`,
          transition: 'transform 0.3s ease-in-out',
          gap: responsive.gap
        }}>
          {videos.map((video, index) => (
            <div
              key={video.id}
              style={{
                minWidth: responsive.itemWidth,
                maxWidth: responsive.itemWidth,
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                flexShrink: 0,
                transition: 'transform 0.2s ease'
              }}
              onClick={() => {
                if (video.url) {
                  window.open(video.url, '_blank');
                } else {
                  console.log(`Playing video ${video.id}`);
                }
              }}
              onMouseEnter={(e) => {
                if (windowWidth > 768) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (windowWidth > 768) {
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              {/* Video Thumbnail */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: responsive.videoHeight,
                borderRadius: windowWidth <= 480 ? '15px' : '20px',
                overflow: 'hidden',
                backgroundImage: `url(${video.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: windowWidth <= 480 ? '10px' : '15px'
              }}>
                {/* Play Button Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: windowWidth <= 480 ? '50px' : '60px',
                  height: windowWidth <= 480 ? '50px' : '60px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: windowWidth <= 480 ? '20px' : '24px',
                  color: '#333',
                  transition: 'transform 0.2s ease'
                }}>
                  ▶
                </div>
              </div>

              {/* Video Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#E8A5C4',
                borderRadius: windowWidth <= 480 ? '20px' : '25px',
                padding: responsive.infoPadding,
                gap: windowWidth <= 480 ? '8px' : '10px'
              }}>
                {/* Avatar */}
                <img
                  src={video.avatar}
                  alt="User avatar"
                  style={{
                    width: responsive.avatarSize,
                    height: responsive.avatarSize,
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />

                {/* Text Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: responsive.fontSize.title,
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '2px',
                    lineHeight: 1.2
                  }}>
                    {video.productName}
                  </div>
                  <div style={{
                    fontSize: responsive.fontSize.description,
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.1
                  }}>
                    {video.description}
                  </div>
                </div>

                {/* Arrow Icon */}
                <div style={{
                  width: windowWidth <= 480 ? '18px' : '20px',
                  height: windowWidth <= 480 ? '18px' : '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: windowWidth <= 480 ? '9px' : '10px',
                  color: 'white'
                }}>
                  →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#E8A5C4',
          fontSize: '14px'
        }}>
          Loading videos...
        </div>
      )}
      
      {error && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#666',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          Using sample videos (API unavailable)
        </div>
      )}
    </div>
  );
}

export default VideoCarousel;