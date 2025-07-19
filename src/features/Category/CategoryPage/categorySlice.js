// src/redux/slices/categorySlice.js (or wherever your categorySlice is)
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api"; // Adjust path if needed

// New thunk to fetch products for a specific category with pagination
export const fetchProductsByCategory = createAsyncThunk(
  "category/fetchProductsByCategory",
  async ({ categoryId, pageSize, page }, thunkAPI) => {
    try {
      // *** FIX: Ensure 'pageSize' is sent as the query parameter name ***
      const response = await api.get(
        `/category/${categoryId}/products?pageSize=${pageSize}&page=${page}`
      );
      return response.data; // This should now contain { products: [...], totalProductsCount: N, categoryName: "..." }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch all categories (used by DiscoverByCategory and HomePage)
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/category/"); // Endpoint for all categories
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    // For CategoryPage (products by category)
    products: [],
    totalProductsCount: 0,
    currentCategoryName: null,
    status: "idle", // status for products of a specific category
    error: null, // error for products of a specific category

    // For DiscoverByCategory and HomePage (all categories)
    allCategories: [],
    allCategoriesStatus: "idle",
    allCategoriesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for fetchProductsByCategory
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        // *** FIX: Map backend response keys to frontend state keys ***
        state.products = action.payload.products || [];
        state.totalProductsCount = action.payload.totalProductsCount || 0;
        state.currentCategoryName = action.payload.categoryName || "Category";
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Reducers for fetchAllCategories (no changes needed here from previous corrections)
      .addCase(fetchAllCategories.pending, (state) => {
        state.allCategoriesStatus = "loading";
        state.allCategoriesError = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.allCategoriesStatus = "succeeded";
        state.allCategories = action.payload.map((category) => ({
          _id: category._id,
          title: category.title,
          image: category.image || null,
          productCount: category.productCount || 0,
        }));
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.allCategoriesStatus = "failed";
        state.allCategoriesError = action.payload;
      });
  },
});

export default categorySlice.reducer;