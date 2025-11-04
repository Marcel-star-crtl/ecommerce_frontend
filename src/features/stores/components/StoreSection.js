import React from 'react';
import AlternatingSection from './AlternatingSection';
import './StoreSection.css';

const StoreSection = () => {
  return (
    <div className="store-sections-container">
      {/* Store One Section - Image Left, Text Right */}
      <AlternatingSection
        sectionId="store-one"
        label="STORE ONE"
        title="No smudging or Flaking"
        description="This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across this product. This beauty product"
        address="BONAMOUSSADI, TERMINUS, DOUALA CAMEROON"
        phone="+237878960 +237800089587"
        imageSrc="/assets/about1.png"
        imageAlt="Store One - Beauty Products"
        isReversed={false}
        textPosition="bottom"
      />

      {/* Store Two Section - Text Left, Image Right */}
      <AlternatingSection
        sectionId="store-two"
        label="STORE TWO"
        title="No smudging or Flaking"
        description="This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across this product. This beauty product"
        address="BONAMOUSSADI, TERMINUS, DOUALA CAMEROON"
        phone="+237878960 +237800089587"
        imageSrc="/assets/about2.png"
        imageAlt="Store Two - Beauty Consultation"
        isReversed={true}
        textPosition="top"
      />

      {/* Store Three Section - Image Left, Text Right */}
      <AlternatingSection
        sectionId="store-three"
        label="STORE THREE"
        title="No smudging or Flaking"
        description="This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across this product. This beauty product"
        address="BONAMOUSSADI, TERMINUS, DOUALA CAMEROON"
        phone="+237878960 +237800089587"
        imageSrc="/assets/about3.png"
        imageAlt="Store Three - Product Aisle"
        isReversed={false}
        textPosition="bottom"
      />

      {/* Store Four Section - Text Left, Image Right */}
      <AlternatingSection
        sectionId="store-four"
        label="STORE FOUR"
        title="No smudging or Flaking"
        description="This beauty product line was creatively designed to emphasize the flawless beauty of mother nature. We crafted the logo and mixed two natural colors to provide a calm and soothing feeling to everyone who comes across this product. This beauty product"
        address="BONAMOUSSADI, TERMINUS, DOUALA CAMEROON"
        phone="+237878960 +237800089587"
        imageSrc="/assets/details2.png"
        imageAlt="Store Four - Customer Browsing"
        isReversed={true}
        textPosition="top"
      />
    </div>
  );
};

export default StoreSection;