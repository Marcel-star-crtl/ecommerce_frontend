// import React from "react";
// import "./fotter.css"; 

// export default function Footer() {
//   return (
//     <footer className="container-fluid bg-dark text-light py-5">
//       <div className="row px-xl-5 pt-5">
//         {/* Contact Section */}
//         <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
//           <h5 className="text-light text-uppercase mb-4">Get In Touch</h5>
//           <p className="mb-4">
//             Have questions about our products or custom orders? Contact us. We bring you the finest fashion and art pieces.
//           </p>
//           <p className="mb-2">
//             <i className="fa fa-map-marker-alt text-primary mr-3"></i>
//             Bamenda, Cameroon
//           </p>
//           <p className="mb-2">
//             <i className="fa fa-envelope text-primary mr-3"></i>
//             info@example.com
//           </p>
//           <p className="mb-0">
//             <i className="fa fa-phone-alt text-primary mr-3"></i> +237 670 000 000
//           </p>
//         </div>

//         {/* Quick Shop Links */}
//         <div className="col-lg-8 col-md-12">
//           <div className="row">
//             <div className="col-md-4 mb-5">
//               <h5 className="text-light text-uppercase mb-4">Quick Shop</h5>
//               <ul className="list-unstyled">
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Home
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Our Shop
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Shop Detail
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Shopping Cart
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Checkout
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Contact Us
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* My Account Links */}
//             <div className="col-md-4 mb-5">
//               <h5 className="text-light text-uppercase mb-4">My Account</h5>
//               <ul className="list-unstyled">
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Login
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Register
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> My Profile
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Order History
//                   </a>
//                 </li>
//                 <li className="mb-2">
//                   <a href="#" className="text-light">
//                     <i className="fa fa-angle-right mr-2"></i> Wishlist
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Newsletter Subscription */}
//             <div className="col-md-4 mb-5">
//               <h5 className="text-light text-uppercase mb-4">Newsletter</h5>
//               <p>Join our newsletter for special offers and new arrivals.</p>
//               <form action="">
//                 <div className="form-group d-flex">
//                   <input
//                     type="email"
//                     className="form-control rounded-0"
//                     placeholder="Your Email Address"
//                     style={{ border: "none" }}
//                   />
//                   <button className="btn btn-primary rounded-0 w-50">
//                     Sign Up
//                   </button>
//                 </div>
//               </form>
//               <h6 className="text-light text-uppercase mt-4 mb-3">Follow Us</h6>
//               <div className="d-flex">
//                 <a className="btn btn-outline-light btn-square mr-2" href="#">
//                   <i className="fab fa-twitter"></i>
//                 </a>
//                 <a className="btn btn-outline-light btn-square mr-2" href="#">
//                   <i className="fab fa-facebook-f"></i>
//                 </a>
//                 <a className="btn btn-outline-light btn-square mr-2" href="#">
//                   <i className="fab fa-linkedin-in"></i>
//                 </a>
//                 <a className="btn btn-outline-light btn-square" href="#">
//                   <i className="fab fa-instagram"></i>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom Section */}
//       <div
//         className="row border-top mx-xl-5 py-4"
//         style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
//       >
//         <div className="col-md-6 px-xl-0 text-center text-md-start">
//           <p className="mb-md-0 text-light">
//             &copy; <span className="text-primary">2024</span>. House of Joy<span className="text-primary"> All Rights
//             Reserved.</span>
//           </p>
//         </div>

//         <div className="col-md-6 px-xl-0 d-flex justify-content-center justify-content-md-end">
//           <img
//             className="img-fluid"
//             src={process.env.PUBLIC_URL + "/assets/payments.png"}
//             alt="Payment Methods"
//           />
//         </div>
//       </div>
//     </footer>
//   );
// }









import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Container,
  SimpleGrid,
  Link,
  Stack
} from '@chakra-ui/react';

const footer = () => {
  const footerData = {
    "Join Our Community": [
      "Telegram"
    ],
    "Shop All": [
      "Shop All",
      "New Arrival",
      "Skin Care",
      "Bath & Body"
    ],
    "Who We Are": [
      "About Us",
      "About Us",
      "Stores"
    ],
    "Connect With Us": [
      "Instagram",
      "TikTok",
      "LinkedIn",
      "Facebook",
      "SnapChat"
    ],
    "Customer Support": [
      "Contact",
      "FAQs"
    ],
    "Legal": [
      "Terms",
      "Privacy Policy",
      "Shipping Policy",
      "Terms of Service"
    ]
  };

  return (
    <Box
      bg="pink.200"
      pt={{ base: 16, md: 20 }}
      pb={{ base: 12, md: 16 }}
      width="100%"
    >
      <Container maxW="container.xl">
        <VStack spacing={{ base: 12, md: 16 }} align="center">
          {/* Brand Name */}
          <Text
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="300"
            color="white"
            letterSpacing={{ base: '0.4em', md: '0.5em', lg: '0.6em' }}
            textTransform="uppercase"
            lineHeight="1"
            textAlign="center"
          >
            SHYNEEN
          </Text>

          {/* Footer Links Grid */}
          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 6 }}
            spacing={{ base: 8, md: 12 }}
            width="100%"
            maxW="1200px"
          >
            {Object.entries(footerData).map(([category, links]) => (
              <VStack
                key={category}
                align="flex-start"
                spacing={4}
                minH="120px"
              >
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="medium"
                  color="white"
                  opacity="0.9"
                  mb={2}
                >
                  {category}
                </Text>
                
                <VStack align="flex-start" spacing={2}>
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      fontSize={{ base: 'xs', md: 'sm' }}
                      color="white"
                      opacity="0.8"
                      _hover={{
                        opacity: 1,
                        textDecoration: 'underline'
                      }}
                      transition="opacity 0.2s"
                    >
                      {link}
                    </Link>
                  ))}
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default footer;