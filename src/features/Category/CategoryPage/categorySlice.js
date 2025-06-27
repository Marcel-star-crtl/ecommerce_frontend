import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api";

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/category/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch single category
export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await api.get(`/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    currentCategory: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Map backend fields to frontend expectations
        state.categories = action.payload.map(category => ({
          id: category._id,
          name: category.title,
          // Handle different image formats from backend
          image: category.image || null, // Keep the original image data structure
          products: category.products || [],
          productCount: category.productCount || 0,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt
        }));
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch single category
      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCategory = {
          id: action.payload._id,
          name: action.payload.title,
          image: action.payload.image || null,
          products: action.payload.products || [],
          productCount: action.payload.productCount || 0,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt
        };
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;