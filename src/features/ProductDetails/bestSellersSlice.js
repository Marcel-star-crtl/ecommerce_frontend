import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchBestSellers = createAsyncThunk(
  "bestSellers/fetchBestSellers",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/product/", {
        params: {
          tags: "best-sellers",
          size: 8
        }
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const bestSellersSlice = createSlice({
  name: "bestSellers",
  initialState: {
    products: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSellers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.results;
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export default bestSellersSlice.reducer;