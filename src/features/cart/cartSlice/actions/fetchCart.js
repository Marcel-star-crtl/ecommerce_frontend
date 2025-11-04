import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      console.log('🛒 Fetching cart...');
      const response = await api.get("/user/get-cart");
      console.log('📦 Cart response:', response.data);
      
      return {
        products: response.data.cart?.products || [],
        id: response.data.cart?._id,
        total_price: response.data.cart?.cartTotal || response.data.cartTotal || 0
      };
      
    } catch (err) {
      console.error('❌ Fetch cart error:', err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (productId, thunkAPI) => {
    try {
      console.log('🗑️ Deleting cart product:', productId);
      await api.delete(`user/cart/${productId}`);
      return productId;
    } catch (err) {
      console.error('❌ Delete cart product error:', err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const pending = (state) => {
  state.fetchStatus = "loading";
  state.error = null;
};

const fulfilled = (state, action) => {
  state.fetchStatus = "succeeded";
  
  const payload = action.payload || {};
  
  state.products = payload.products || [];
  state.cartId = payload.id || null;
  state.cartCount = Array.isArray(payload.products) 
    ? payload.products.reduce((acc, el) => acc + (el.quantity || el.count || 1), 0)
    : 0;
  state.totalPrice = payload.total_price || 0;
};

const rejected = (state, action) => {
  state.fetchStatus = "failed";
  state.error = action.payload;
};

export const fetchHandlers = {
  pending,
  fulfilled,
  rejected,
};