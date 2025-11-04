import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';

export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      console.log('🧹 Emptying cart...');
      
      const state = getState();
      const isLoggedIn = state.auth.isLoggedIn;
      const token = state.auth.token;
      
      if (!isLoggedIn || !token) {
        return rejectWithValue("Please login to manage cart");
      }

      const response = await api.delete('/user/empty-cart');
      console.log('✅ Empty cart response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Empty cart error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         "Failed to empty cart";
      return rejectWithValue(errorMessage);
    }
  }
);

export const emptyCartHandlers = {
  pending: (state) => {
    state.emptyStatus = 'loading';
  },
  fulfilled: (state) => {
    state.emptyStatus = 'succeeded';
    state.products = [];
    state.cartCount = 0;
    state.totalPrice = 0;
    state.totalAfterDiscount = null;
    state.appliedCoupon = null;
  },
  rejected: (state, action) => {
    state.emptyStatus = 'failed';
    state.error = action.payload;
  },
};