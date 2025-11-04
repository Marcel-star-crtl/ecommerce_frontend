import React from 'react';
import './AlternatingSection.css';

const AlternatingSection = ({ 
  sectionId,
  label, 
  title, 
  description, 
  address, 
  phone, 
  imageSrc, 
  imageAlt, 
  isReversed = false,
  textPosition = "center" // "top", "center", "bottom"
}) => {
  return (
    <div className={`alternating-section ${isReversed ? 'reversed' : ''}`}>
      <div className="section-content">
        <div className="section-image-container">
          <img src={imageSrc} alt={imageAlt} />
        </div>
        <div className="section-info-container">
          <div className={`section-info section-info-${textPosition}`}>
            <div className="section-header">
              <span className="section-label">{label}</span>
              <h2 className="section-title">{title}</h2>
            </div>
            <p className="section-description">
              {description}
            </p>
            <div className="section-contact">
              <div className="section-address">{address}</div>
              <div className="section-phone">{phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlternatingSection;