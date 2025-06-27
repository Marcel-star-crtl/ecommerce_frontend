import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

// cartSlice.js (addToCart thunk)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ product, quantity }, thunkAPI) => {
    try {
      const isLoggedIn = thunkAPI.getState().auth.isLoggedIn;
      if (!isLoggedIn) {
        return thunkAPI.rejectWithValue("Please login to add items to cart");
      }

      // Fix: Ensure color is a string, not an array
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
  
  // Match this with your actual backend response
  const addedProduct = action.payload.cart.products.find(
    p => p.product.toString() === action.meta.arg.product._id
  );
  
  if (addedProduct) {
    const existingProduct = state.products.find(
      p => p.id === action.meta.arg.product.id
    );
    
    if (existingProduct) {
      existingProduct.quantity += action.meta.arg.quantity;
    } else {
      state.products.push({
        ...action.meta.arg.product,
        quantity: addedProduct.count
      });
    }
    
    state.cartCount += action.meta.arg.quantity;
    state.totalPrice = action.payload.cart.cartTotal;
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
