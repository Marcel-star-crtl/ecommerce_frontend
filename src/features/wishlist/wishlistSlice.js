import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Fetch user's wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async ({ page = 1, size = 10 } = {}, thunkAPI) => {
    try {
  const response = await api.get(`/wishlist?page=${page}&size=${size}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add product to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, thunkAPI) => {
    try {
  const response = await api.post("/wishlist/add", { productId });
      return { productId, message: response.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Remove product from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    try { 
  const response = await api.post("/wishlist/remove", { productId });
      return { productId, message: response.data.message };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Clear entire wishlist
export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, thunkAPI) => {
    try {
  // No clear endpoint in backend, so just remove all products one by one or implement if needed
      return response.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get wishlist count
export const getWishlistCount = createAsyncThunk(
  "wishlist/getWishlistCount",
  async (_, thunkAPI) => {
    try {
  // No count endpoint in backend, so use fetchWishlist and count products
      return response.data.count;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    fetchStatus: "idle",
    addStatus: "idle",
    removeStatus: "idle",
    clearStatus: "idle",
    error: null,
    totalProductsCount: 0,
    currentPage: 1,
    totalPages: 1,
    wishlistCount: 0,
  },
  reducers: {
    resetWishlistStatus: (state) => {
      state.addStatus = "idle";
      state.removeStatus = "idle";
      state.clearStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.fetchStatus = "loading";
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        if (action.payload.product_details) {
          state.products = action.payload.product_details.results || [];
          state.totalProductsCount = action.payload.product_details.count || 0;
          state.currentPage = action.payload.product_details.page || 1;
          state.totalPages = action.payload.product_details.pages || 1;
        } else {
          state.products = action.payload.products || [];
          state.totalProductsCount = action.payload.count || 0;
          state.currentPage = action.payload.page || 1;
          state.totalPages = action.payload.pages || 1;
        }
        state.wishlistCount = state.totalProductsCount;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })

      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.addStatus = "loading";
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.wishlistCount += 1;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload;
      })

      // Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.removeStatus = "loading";
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.removeStatus = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        );
        state.totalProductsCount = Math.max(0, state.totalProductsCount - 1);
        state.wishlistCount = Math.max(0, state.wishlistCount - 1);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.removeStatus = "failed";
        state.error = action.payload;
      })

      // Clear wishlist
      .addCase(clearWishlist.pending, (state) => {
        state.clearStatus = "loading";
        state.error = null;
      })
      .addCase(clearWishlist.fulfilled, (state) => {
        state.clearStatus = "succeeded";
        state.products = [];
        state.totalProductsCount = 0;
        state.wishlistCount = 0;
        state.currentPage = 1;
        state.totalPages = 1;
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.clearStatus = "failed";
        state.error = action.payload;
      })

      // Get wishlist count
      .addCase(getWishlistCount.fulfilled, (state, action) => {
        state.wishlistCount = action.payload;
      });
  },
});

export const { resetWishlistStatus } = wishlistSlice.actions;
export default wishlistSlice.reducer;