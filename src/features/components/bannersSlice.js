import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bannerAPI } from '../../api/api';

// Async thunks
export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (section, { rejectWithValue }) => {
    try {
      const response = await bannerAPI.getBanners(section);
      return response.data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      return rejectWithValue(error.message || 'Failed to fetch banners');
    }
  }
);

export const fetchHomepageBanners = createAsyncThunk(
  'banners/fetchHomepageBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bannerAPI.getHomepageBanners();
      return response.data;
    } catch (error) {
      console.error('Error fetching homepage banners:', error);
      return rejectWithValue(error.message || 'Failed to fetch homepage banners');
    }
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState: {
    banners: [],
    heroBanners: [],
    originalBanners: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch homepage banners
      .addCase(fetchHomepageBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomepageBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.heroBanners = action.payload.hero || [];
        state.originalBanners = action.payload.original || [];
      })
      .addCase(fetchHomepageBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = bannersSlice.actions;

export default bannersSlice.reducer;