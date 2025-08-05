import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity }, thunkAPI) => {
    try {
      const isLoggedIn = thunkAPI.getState().auth.isLoggedIn;
      if (!isLoggedIn) {
        return thunkAPI.rejectWithValue("Please login to add items to cart");
      }

      let color = product.color || "default";
      if (Array.isArray(color)) {
        color = color[0] || "default";
      }

      const response = await api.post(`user/cart/`, {
        product_id: product._id,
        quantity: quantity,
        color: color
      });

      return {
        product: product,
        quantity: quantity,
        cart: response.data.cart
      };
    } catch (err) {
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
  // Don't manually update cart state here - let fetchCart() handle it
  // This prevents race conditions and ensures consistency with backend
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
