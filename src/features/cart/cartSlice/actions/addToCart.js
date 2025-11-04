import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const isLoggedIn = state.auth.isLoggedIn;
      const token = state.auth.token;
      
      console.log('Auth state:', { isLoggedIn, hasToken: !!token });
      
      if (!isLoggedIn || !token) {
        return thunkAPI.rejectWithValue("Please login to add items to cart");
      }

      let color = product.color || "default";
      if (Array.isArray(color)) {
        color = color[0] || "default";
      }

      console.log('Adding to cart:', { product_id: product._id, quantity, color });

      const response = await api.post(`user/cart`, {
        product_id: product._id,
        quantity: quantity,
        color: color
      });

      console.log('Cart response:', response.data);

      return {
        product: product,
        quantity: quantity,
        cart: response.data.cart
      };
    } catch (err) {
      console.error('Add to cart error:', err);
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Failed to add to cart";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


const pending = (state) => {
  state.addStatus = "loading";
  state.error = null;
};

const fulfilled = (state, action) => {
  state.addStatus = "succeeded";
  state.error = null;
  
  // Update cart state with the response data
  if (action.payload.cart) {
    state.products = action.payload.cart.products || [];
    // Calculate total count by summing all quantities
    state.cartCount = action.payload.cart.products?.reduce((total, item) => total + (item.count || item.quantity || 1), 0) || 0;
    state.totalPrice = action.payload.cart.cartTotal || 0;
    state.cartId = action.payload.cart._id;
  }
};

const rejected = (state, action) => {
  state.addStatus = "failed";
  state.error = action.payload;
};

export const addToCartHandlers = {
  pending,
  fulfilled,
  rejected,
};
