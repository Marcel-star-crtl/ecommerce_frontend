import { configureStore } from "@reduxjs/toolkit";
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
    bestSellers: bestSellersReducer
  },
});

export default store;
