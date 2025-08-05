import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../../../../api/api';

export const createCashOrder = createAsyncThunk(
  'cart/createCashOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await cartAPI.createCashOrder(orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrderHandlers = {
  pending: (state) => {
    state.orderStatus = 'loading';
  },
  fulfilled: (state, action) => {
    state.orderStatus = 'succeeded';
    state.lastOrder = action.payload;
    // Clear cart after successful order
    state.products = [];
    state.cartCount = 0;
    state.totalPrice = 0;
    state.totalAfterDiscount = null;
    state.appliedCoupon = null;
  },
  rejected: (state, action) => {
    state.orderStatus = 'failed';
    state.error = action.payload;
  },
};