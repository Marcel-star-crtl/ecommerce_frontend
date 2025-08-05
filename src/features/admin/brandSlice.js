import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { brandAPI } from '../../api/api';

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async (_, { rejectWithValue }) => {
  try {
    const response = await brandAPI.getBrands();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createBrand = createAsyncThunk('brands/createBrand', async (title, { rejectWithValue }) => {
  try {
    const response = await brandAPI.createBrand(title);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateBrand = createAsyncThunk('brands/updateBrand', async ({ id, title }, { rejectWithValue }) => {
  try {
    const response = await brandAPI.updateBrand(id, title);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteBrand = createAsyncThunk('brands/deleteBrand', async (id, { rejectWithValue }) => {
  try {
    await brandAPI.deleteBrand(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const brandSlice = createSlice({
  name: 'brands',
  initialState: {
    brands: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        const index = state.brands.findIndex(brand => brand._id === action.payload._id);
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(brand => brand._id !== action.payload);
      });
  },
});

export default brandSlice.reducer;