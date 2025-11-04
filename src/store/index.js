import { configureStore } from "@reduxjs/toolkit";
import loaderMiddleware from './loaderMiddleware';
import apiStatusSlice from "../features/utils/apiStatusSlice";
import authSlice from "../features/auth/authSlice";
import categorySlice from "../features/Category/CategoryPage/categorySlice";
import categoriesSlice from "../features/Category/PopularCategories/popularCategoriesSlice";
import productSlice from "../features/ProductDetails/productSlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";
import cartSlice from "../features/cart/cartSlice";
import ordersSlice from "../features/order/ordersSlice";
import productHomePageSlice from "../features/home/productHomePageSlice";
import shopsReducer from "../features/shops/shopsSlice";
import bestSellersReducer from '../features/ProductDetails/bestSellersSlice';
import videoReducer from '../features/videos/videoSlice';
import brandSlice from '../features/admin/brandSlice';
import colorSlice from '../features/admin/colorSlice';
import couponSlice from '../features/admin/couponSlice';
import loaderReducer from '../features/utils/loadersSlice'; 
import faqReducer from '../features/faqs/faqSlice';
import bannersReducer from '../features/components/bannersSlice';

const store = configureStore({
  reducer: {
    apiStatus: apiStatusSlice,
    auth: authSlice,
    category: categorySlice,
    categories: categoriesSlice,
    product: productSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    orders: ordersSlice,
    productHomePage: productHomePageSlice,
    shops: shopsReducer,
    bestSellers: bestSellersReducer,
    videos: videoReducer,
    brands: brandSlice,
    colors: colorSlice,
    coupons: couponSlice,
    loader: loaderReducer,
    faqs: faqReducer,
    banners: bannersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loaderMiddleware),
});

export default store;
