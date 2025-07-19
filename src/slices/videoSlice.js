// src/redux/slices/videoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

// Async thunk to fetch all videos from the backend
export const fetchAllVideos = createAsyncThunk(
  'videos/fetchAllVideos',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/videos'); // Endpoint from your backend (e.g., /api/videos)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videos: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Add any synchronous reducers if needed later (e.g., to clear videos)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload; // Store the fetched videos
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Store the error message
      });
  },
});

export default videoSlice.reducer;