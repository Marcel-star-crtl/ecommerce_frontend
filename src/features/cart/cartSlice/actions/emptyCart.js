import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../../../../api/api';

export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.emptyCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
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