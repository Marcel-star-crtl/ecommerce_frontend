import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { faqAPI } from '../../api/api';

// Async thunks
export const fetchFAQs = createAsyncThunk('faqs/fetchFAQs', async (_, { rejectWithValue }) => {
  try {
    const response = await faqAPI.getFAQs();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const createFAQ = createAsyncThunk('faqs/createFAQ', async (faqData, { rejectWithValue }) => {
  try {
    const response = await faqAPI.createFAQ(faqData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateFAQ = createAsyncThunk('faqs/updateFAQ', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await faqAPI.updateFAQ(id, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteFAQ = createAsyncThunk('faqs/deleteFAQ', async (id, { rejectWithValue }) => {
  try {
    await faqAPI.deleteFAQ(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const faqSlice = createSlice({
  name: 'faqs',
  initialState: {
    faqs: [],
    status: 'idle',
    error: null,
    createStatus: 'idle',
    updateStatus: 'idle',
    deleteStatus: 'idle',
  },
  reducers: {
    resetStatus: (state) => {
      state.createStatus = 'idle';
      state.updateStatus = 'idle';
      state.deleteStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch FAQs
      .addCase(fetchFAQs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create FAQ
      .addCase(createFAQ.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.faqs.push(action.payload);
      })
      .addCase(createFAQ.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload;
      })
      // Update FAQ
      .addCase(updateFAQ.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateFAQ.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const index = state.faqs.findIndex(faq => faq._id === action.payload._id);
        if (index !== -1) {
          state.faqs[index] = action.payload;
        }
      })
      .addCase(updateFAQ.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload;
      })
      // Delete FAQ
      .addCase(deleteFAQ.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.faqs = state.faqs.filter(faq => faq._id !== action.payload);
      })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = faqSlice.actions;
export default faqSlice.reducer;
