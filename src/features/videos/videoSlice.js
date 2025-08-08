import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async thunks
export const fetchVideos = createAsyncThunk(
  'videos/fetchVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.videoAPI.getAllVideos();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch videos'
      );
    }
  }
);

export const createVideo = createAsyncThunk(
  'videos/createVideo',
  async (videoData, { rejectWithValue }) => {
    try {
      const response = await api.videoAPI.createVideo(videoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create video'
      );
    }
  }
);

export const updateVideo = createAsyncThunk(
  'videos/updateVideo',
  async ({ id, videoData }, { rejectWithValue }) => {
    try {
      const response = await api.videoAPI.updateVideo(id, videoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update video'
      );
    }
  }
);

export const deleteVideo = createAsyncThunk(
  'videos/deleteVideo',
  async (id, { rejectWithValue }) => {
    try {
      await api.videoAPI.deleteVideo(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete video'
      );
    }
  }
);

const initialState = {
  videos: [],
  currentVideo: null,
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch videos
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create video
      .addCase(createVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos.push(action.payload);
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update video
      .addCase(updateVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.videos.findIndex(video => video._id === action.payload._id);
        if (index !== -1) {
          state.videos[index] = action.payload;
        }
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete video
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = state.videos.filter(video => video._id !== action.payload);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setCurrentVideo } = videoSlice.actions;

export default videoSlice.reducer;
