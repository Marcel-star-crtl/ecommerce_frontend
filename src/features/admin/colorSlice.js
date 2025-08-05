import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { colorAPI } from '../../api/api';

export const fetchColors = createAsyncThunk('colors/fetchColors', async (_, { rejectWithValue }) => {
  try {
    const response = await colorAPI.getColors();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createColor = createAsyncThunk('colors/createColor', async (title, { rejectWithValue }) => {
  try {
    const response = await colorAPI.createColor(title);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateColor = createAsyncThunk('colors/updateColor', async ({ id, title }, { rejectWithValue }) => {
  try {
    const response = await colorAPI.updateColor(id, title);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteColor = createAsyncThunk('colors/deleteColor', async (id, { rejectWithValue }) => {
  try {
    await colorAPI.deleteColor(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const colorSlice = createSlice({
  name: 'colors',
  initialState: {
    colors: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.colors.push(action.payload);
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        const index = state.colors.findIndex(color => color._id === action.payload._id);
        if (index !== -1) {
          state.colors[index] = action.payload;
        }
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.colors = state.colors.filter(color => color._id !== action.payload);
      });
  },
});

export default colorSlice.reducer;