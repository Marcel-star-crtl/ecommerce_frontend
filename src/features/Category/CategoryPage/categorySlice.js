import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api/api"; 

export const fetchProductsByCategory = createAsyncThunk(
  "category/fetchProductsByCategory",
  async ({ categoryId, pageSize, page }, thunkAPI) => {
    try {
      const response = await api.get(
        `/category/${categoryId}/products?pageSize=${pageSize}&page=${page}`
      );
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/category/"); 
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    products: [],
    totalProductsCount: 0,
    currentCategoryName: null,
    status: "idle", 
    error: null, 

    allCategories: [],
    allCategoriesStatus: "idle",
    allCategoriesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.products || [];
        state.totalProductsCount = action.payload.totalProductsCount || 0;
        state.currentCategoryName = action.payload.categoryName || "Category";
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
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