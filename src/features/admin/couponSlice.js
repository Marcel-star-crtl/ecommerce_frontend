import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { couponAPI } from '../../api/api';

export const fetchCoupons = createAsyncThunk('coupons/fetchCoupons', async (_, { rejectWithValue }) => {
  try {
    const response = await couponAPI.getCoupons();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createCoupon = createAsyncThunk('coupons/createCoupon', async (couponData, { rejectWithValue }) => {
  try {
    const response = await couponAPI.createCoupon(couponData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCoupon = createAsyncThunk('coupons/updateCoupon', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await couponAPI.updateCoupon(id, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteCoupon = createAsyncThunk('coupons/deleteCoupon', async (id, { rejectWithValue }) => {
  try {
    await couponAPI.deleteCoupon(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const couponSlice = createSlice({
  name: 'coupons',
  initialState: {
    coupons: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload);
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex(coupon => coupon._id === action.payload._id);
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload);
      });
  },
});

export default couponSlice.reducer;