import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI } from '../../../../api/api';

export const applyCoupon = createAsyncThunk(
  'cart/applyCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await cartAPI.applyCoupon(couponCode);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyCouponHandlers = {
  pending: (state) => {
    state.couponStatus = 'loading';
  },
  fulfilled: (state, action) => {
    state.couponStatus = 'succeeded';
    state.totalAfterDiscount = action.payload.totalAfterDiscount;
    state.appliedCoupon = action.payload.coupon;
  },
  rejected: (state, action) => {
    state.couponStatus = 'failed';
    state.error = action.payload;
  },
};