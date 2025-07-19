import React from 'react';

const Philosophy = () => {
  return (
    <div className="bg-white">
      {/* Top Section with Image and Brand Philosophy */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Image */}
        <div className="lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Two women with skincare masks"
            className="w-full h-64 lg:h-full object-cover"
          />
        </div>
        
        {/* Right Content */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <h2 className="text-pink-400 text-lg font-light mb-6">Brand Philosophy</h2>
          <div className="text-gray-700 text-sm leading-relaxed space-y-4">
            <p>
              At shyneen glow our cosmetics prioritize natural materials sourced from natural 
              healthy sources, we create products that work with your skin, not against it. 
              We carefully craft our products with premium, high-quality ingredients that aim to 
              cater to your skin concerns and our aim is to promote beautiful, radiant skin.
            </p>
            <p>
              Quality is at the heart of everything we do and every product is created carefully 
              in our laboratory, and meets the highest standard to ensure it effectiveness and 
              safety for all skin types, We believe beautiful skin is for everyone and we are 
              proud to craft all our products carefully to serve all skin types.
            </p>
            <p>
              Cleansing is a very important continuing and essential routine, and there are 
              countless products to choose from. Here at shyneen glow, we focus on delivering 
              natural effective products from naturally effective, nourishing, and high-quality 
              natural ingredients. Our products are crafted with love to give you the best skin 
              care results and we believe in what we create.
            </p>
            <p>
              Experience the difference with shyneen glow products and let your skin glow 
              naturally. Our skin is the most beautiful human asset body and we must 
              protect it and give it the best and shyneen glow aims to provide solutions to 
              make your skin natural, healthy and radiant. Customers trust us and we are glad 
              and happy to serve our customers with the best products on the market. From 
              cleansing to specialty care, we believe that you deserve to be radiant and healthy 
              at all time and glow with shyneeglows effective products.
            </p>
          </div>
        </div>
      </div>

      {/* Pink Section */}
      <div className="bg-pink-400 text-center py-16">
        <h2 className="text-white text-3xl font-light mb-4">Product that Really Works</h2>
        <p className="text-white text-lg font-light">From clinically proven ingredients to patented processes.</p>
      </div>

      {/* Our Believe Sections */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 lg:p-16">
          <h3 className="text-gray-800 text-xl font-semibold mb-6 tracking-wide">OUR BELIEVE</h3>
          <div className="text-gray-700 text-sm leading-relaxed space-y-4">
            <p>
              We believe in creating gentle formulations that work. We create all our products 
              using clinically proven ingredients. We don't compromise on the quality and 
              effectiveness of our products. At shyneen glow, we commit ourselves to achieving and using only natural, 
              high-quality ingredients. Our products are carefully crafted in the laboratory, 
              and meets the high-quality standard to ensure effectiveness and safety for all 
              skin types.
            </p>
            <p>
              We focus on improving your skin without ignoring it. Through our continuous 
              research, we have been able to develop high-quality skincare products derived 
              from natural highly effective ingredients. We are focused and committed to 
              giving you the best skin care product in the market.
            </p>
          </div>
        </div>

        {/* Right Images */}
        <div className="lg:w-1/2">
          <div className="h-64 lg:h-80">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Hands applying skincare"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-64 lg:h-80">
            <img 
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Skincare application"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Second Our Believe Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Images */}
        <div className="lg:w-1/2 order-2 lg:order-1">
          <img 
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Natural skincare ingredients"
            className="w-full h-64 lg:h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 p-8 lg:p-16 order-1 lg:order-2">
          <h3 className="text-gray-800 text-xl font-semibold mb-6 tracking-wide">OUR BELIEVE</h3>
          <div className="text-gray-700 text-sm leading-relaxed space-y-4">
            <p>
              We believe in healthy skin and we formulate gently but efficient products to improve your skin. We create all our products using clinically 
              proven ingredient on natural sources. We don't compromise on the quality and 
              effectiveness of our product. At shyneenglow, we commit ourselves to promoting 
              beautiful, radiant, healthy skin and using only natural high-quality ingredients.
            </p>
            <p>
              Quality is at the heart of everything we do and every product created carefully 
              in the laboratory, and meets the highest standard to ensure effectiveness and 
              safety for all skin types. We promise to continue promoting healthy skin and helping you 
              taking care of your skin and giving it the glowing it desires.
            </p>
          </div>
        </div>
      </div>

      {/* Pink SHYNEEN Section */}
      <div className="bg-pink-400 text-center py-16">
        <h2 className="text-white text-4xl font-light tracking-[0.5em]">SHYNEEN</h2>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Image */}
        <div className="lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Woman applying face cream"
            className="w-full h-64 lg:h-full object-cover"
          />
        </div>
        
        {/* Right Content */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <h3 className="text-gray-800 text-xl font-semibold mb-6 tracking-wide">SHYNEEN GLOW</h3>
          <div className="text-gray-700 text-sm leading-relaxed space-y-4 mb-8">
            <p>
              Shyneen is the best cosmetic company in the market, we focus on creating healthy, radiant, and beautiful skin for our customers. We create all our products using clinically proven ingredient.
            </p>
          </div>
          
          {/* Pink divider line */}
          <div className="w-16 h-1 bg-pink-400 mb-8"></div>
          
          <div className="text-gray-700 text-sm leading-relaxed">
            <p>
              Experience the difference with shyneen glow products and let your skin glow naturally.
            </p>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;