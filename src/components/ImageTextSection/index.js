import React from 'react';
import PropTypes from 'prop-types';
import './ImageTextSection.css';

const ImageTextSection = ({
  imageUrl,
  title,
  description,
  imagePosition = 'left',
  imageAlt = 'Featured content',
  contactInfo = '',
}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: imagePosition === 'right' ? 'row-reverse' : 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    padding: '40px 0',
    borderBottom: '1px solid #e0e0e0',
  };

  const imageContainerStyle = {
    flex: 1,
    padding: '0',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const contentStyle = {
    flex: 1,
    padding: '0 40px',
    fontFamily: 'Arial, sans-serif',
    color: '#000',
  };

  const storeTitleStyle = {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '10px',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '15px',
  };

  const descriptionStyle = {
    fontSize: '0.95rem',
    color: '#333',
    lineHeight: '1.6',
    marginBottom: '20px',
  };

  const contactStyle = {
    fontWeight: 'bold',
    fontSize: '0.95rem',
  };

  return (
    <div style={containerStyle} className="image-text-section">
      <div style={imageContainerStyle}>
        <img
          src={imageUrl}
          alt={imageAlt}
          style={imageStyle}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
          }}
        />
      </div>
      <div style={contentStyle}>
        <div style={storeTitleStyle}>{title}</div>
        <div style={headingStyle}>No smudging or Flaking</div>
        <div style={descriptionStyle}>{description}</div>
        <div style={contactStyle}>{contactInfo}</div>
      </div>
    </div>
  );
};

ImageTextSection.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  imagePosition: PropTypes.oneOf(['left', 'right']),
  imageAlt: PropTypes.string,
  contactInfo: PropTypes.string,
};

export default ImageTextSection;
