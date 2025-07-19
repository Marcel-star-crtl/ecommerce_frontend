
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import Register from "./features/auth/components/register/register";
// import Login from "./features/auth/components/login/Login";
// import Navbar from "./features/layout/navbar/navbar";
// import Fotter from "./features/layout/fotter/fotter";
// import Cart from "./features/cart/cart";
// import WishList from "./features/wishlist/wishlist";
// import CategoryPage from "./features/Category/CategoryPage/CategoryPage";
// import OrderDetails from "./features/order/OrderDetails";
// import NotFound from "./features/404/404";
// import Profile from "./features/auth/components/profile/Profile";
// import ProtectedRoutes from "./ProtectedRoutes";
// import Product from "./features/ProductDetails/ProductDetails";
// import Home from "./features/home/homePage";
// import Shops from "./features/shops/shopsPage";
// import Stores from "./features/stores/storesPage";
// import Orders from "./features/order/Orders";
// import ContactUs from "./features/contactus/ContactUs";
// import Aboutus from "./features/aboutus/Aboutus";
// import CheckoutPage from './features/checkout/CheckoutPage';
// import SuccessPage from './features/checkout/SuccessPage';
// import { fetchCart } from "./features/cart/cartSlice";

// import "./App.css";

// AOS.init();

// function App() {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

//   useEffect(() => {
//     if (isLoggedIn) {
//       dispatch(fetchCart());
//     }
//   }, [dispatch, isLoggedIn]);

//   return (
//     <BrowserRouter basename={process.env.REACT_APP_BASE_NAME || "/"}>
//       <Navbar />
//       <Routes>
//         <Route path="/">
//           <Route element={<ProtectedRoutes requiresLogin={false} redirectTo="/" />}>
//             <Route path="register" element={<Register />} />
//             <Route path="login" element={<Login />} />
//           </Route>
//           <Route element={<ProtectedRoutes requiresLogin={true} redirectTo="/login" />}>
//             <Route path="wishlist" element={<WishList />} />
//             <Route path="cart" element={<Cart />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="orders" element={<Orders />} />
//             <Route path="orders/:orderId" element={<OrderDetails />} />
//           </Route>
//           <Route path="category/:categoryId" element={<CategoryPage />} />
//           <Route path="product/:id" element={<Product />} />
//           <Route path="checkout" element={<CheckoutPage />} />
//           <Route path="checkout/success" element={<SuccessPage />} />
//           <Route path="contact" element={<ContactUs />} />
//           <Route path="aboutus" element={<Aboutus />} />
//           <Route path="stores" element={<Stores />} />
//           <Route path="home" element={<Home />} />
//           <Route path="shops" element={<Shops />} />
//           <Route path="" element={<Home />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//       <Fotter />
//     </BrowserRouter>
//   );
// }

// export default App;












import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

import Register from "./features/auth/components/register/register";
import Login from "./features/auth/components/login/Login";
import Navbar from "./features/layout/navbar/navbar";
import Fotter from "./features/layout/fotter/fotter";
import Cart from "./features/cart/cart";
import WishList from "./features/wishlist/wishlist";
import CategoryPage from "./features/Category/CategoryPage/CategoryPage";
import OrderDetails from "./features/order/OrderDetails";
import NotFound from "./features/404/404";
import Profile from "./features/auth/components/profile/Profile";
import ProtectedRoutes from "./ProtectedRoutes";
import Product from "./features/ProductDetails/ProductDetails";
import Home from "./features/home/homePage";
import Shops from "./features/shops/shopsPage";
import Stores from "./features/stores/storesPage";
import Orders from "./features/order/Orders";
import ContactUs from "./features/contactus/ContactUs";
import Aboutus from "./features/aboutus/Aboutus";
import CheckoutPage from './features/checkout/CheckoutPage';
import SuccessPage from './features/checkout/SuccessPage';
import { fetchCart } from "./features/cart/cartSlice";

// Import additional components for footer links (you'll need to create these)
import NewArrivals from "./features/new-arrivals/NewArrivals";
import SkinCare from "./features/skin-care/SkinCare";
import BathBody from "./features/bath-body/BathBody";
import FAQs from "./features/faqs/FAQs";
import Terms from "./features/legal/Terms";
import PrivacyPolicy from "./features/legal/PrivacyPolicy";
import ShippingPolicy from "./features/legal/ShippingPolicy";
import TermsOfService from "./features/legal/TermsOfService";
import Philosophy from "./features/philosophy/Philosophy";

import "./App.css";

AOS.init();

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_NAME || "/"}>
      <Navbar />
      <Routes>
        <Route path="/">
          {/* Authentication Routes - No login required */}
          <Route element={<ProtectedRoutes requiresLogin={false} redirectTo="/" />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          
          {/* Protected Routes - Login required */}
          <Route element={<ProtectedRoutes requiresLogin={true} redirectTo="/login" />}>
            <Route path="wishlist" element={<WishList />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
          </Route>
          
          {/* Shopping Routes */}
          {/* <Route path="category/:categoryId" element={<CategoryPage />} /> */}
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<SuccessPage />} />
          
          {/* Main Navigation Routes */}
          <Route path="home" element={<Home />} />
          <Route path="shops" element={<Shops />} />
          <Route path="new-arrivals" element={<NewArrivals />} />
          <Route path="skin-care" element={<SkinCare />} />
          <Route path="bath-body" element={<BathBody />} />
          <Route path="phylosophy" element={<Philosophy />} />
          
          {/* Company Information Routes */}
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="stores" element={<Stores />} />
          <Route path="contact" element={<ContactUs />} />
          
          {/* Customer Support Routes */}
          <Route path="faqs" element={<FAQs />} />
          
          {/* Legal Routes */}
          <Route path="terms" element={<Terms />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="shipping-policy" element={<ShippingPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          
          {/* Default Routes */}
          <Route path="" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Fotter />
    </BrowserRouter>
  );
}

export default App;