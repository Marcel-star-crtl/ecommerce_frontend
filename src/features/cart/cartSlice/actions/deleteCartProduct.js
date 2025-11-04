import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (productId, thunkAPI) => {
    try {
      console.log('🗑️ Deleting cart product:', productId);
      
      const state = thunkAPI.getState();
      const isLoggedIn = state.auth.isLoggedIn;
      const token = state.auth.token;
      
      if (!isLoggedIn || !token) {
        return thunkAPI.rejectWithValue("Please login to manage cart");
      }

      const response = await api.delete(`user/cart/${productId}`);
      console.log('✅ Delete response:', response.data);
      
      return {
        productId: productId,
        cart: response.data.cart,
        cartTotal: response.data.cartTotal || 0,
        totalItems: response.data.totalItems || 0,
        message: response.data.message
      };
    } catch (err) {
      console.error('❌ Delete cart product error:', err);
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Failed to remove item from cart";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const pending = (state) => {
  state.deleteStatus = "loading";
  state.error = null;
};

const fulfilled = (state, action) => {
  state.deleteStatus = "succeeded";
  state.error = null;
  
  const { cart, cartTotal, totalItems } = action.payload;
  
  if (cart) {
    // Update cart with response data
    state.products = cart.products || [];
    state.cartCount = totalItems || 0;
    state.totalPrice = cartTotal || 0;
    state.cartId = cart._id;
  } else {
    // Cart is empty
    state.products = [];
    state.cartCount = 0;
    state.totalPrice = 0;
    state.cartId = null;
  }
};

const rejected = (state, action) => {
  state.deleteStatus = "failed";
  state.error = action.payload;
};

export const deleteProductHandlers = {
  pending,
  fulfilled,
  rejected,
};
