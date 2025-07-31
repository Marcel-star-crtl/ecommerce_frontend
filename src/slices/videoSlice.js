import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchAllVideos = createAsyncThunk(
  'videos/fetchAllVideos',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/videos'); 
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
    status: 'idle', 
    error: null,
  },
  reducers: { 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload; 
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      });
  },
});

export default videoSlice.reducer;