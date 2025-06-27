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