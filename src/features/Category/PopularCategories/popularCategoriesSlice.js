// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../api/api";

// export const fetchCategories = createAsyncThunk(
//   "category/fetchCategories",
//   async () => {
//     // TODO: with sizeLimit = 4
//     const response = await api.get(`/category`);
//     return response.data;
//   }
// );

// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState: {
//     categories: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default categoriesSlice.reducer;








import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for your API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Async thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch categories'
      );
    }
  }
);

// Async thunk to fetch a single category with its products
export const fetchCategory = createAsyncThunk(
  'categories/fetchCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category'
      );
    }
  }
);

// Async thunk to fetch products by category
export const fetchCategoryProducts = createAsyncThunk(
  'categories/fetchCategoryProducts',
  async ({ categoryId, page = 1, size = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/${categoryId}/products?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch category products'
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    currentCategory: null,
    categoryProducts: {
      results: [],
      count: 0,
      page: 1,
      pages: 0
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCategory: (state) => {
      state.currentCategory = null;
      state.categoryProducts = {
        results: [],
        count: 0,
        page: 1,
        pages: 0
      };
    },
    clearCategoryProducts: (state) => {
      state.categoryProducts = {
        results: [],
        count: 0,
        page: 1,
        pages: 0
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.categories = [];
      })
      // Fetch single category
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCategory = action.payload || null;
        state.error = null;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentCategory = null;
      })
      // Fetch category products
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = {
          results: Array.isArray(action.payload?.results) ? action.payload.results : [],
          count: action.payload?.count || 0,
          page: action.payload?.page || 1,
          pages: action.payload?.pages || 0
        };
        state.error = null;
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.categoryProducts = {
          results: [],
          count: 0,
          page: 1,
          pages: 0
        };
      });
  },
});

export const { clearError, clearCurrentCategory, clearCategoryProducts } = categoriesSlice.actions;
export default categoriesSlice.reducer;