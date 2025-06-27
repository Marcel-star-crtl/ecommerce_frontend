// import { createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../../api/api";

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get("user/get-cart/");
//       return response.data.cart;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// const pending = (state) => {
//   state.fetchStatus = "loading";
//   state.error = null;
// };

// const fulfilled = (state, action) => {
//   state.fetchStatus = "succeeded";
//   state.products = action.payload.products;
//   state.cartId = action.payload.id;
//   state.cartCount = action.payload.products.reduce(
//     (acc, el) => acc + el.quantity,
//     0
//   );
//   state.totalPrice = action.payload.total_price;
// };

// const rejected = (state, action) => {
//   state.fetchStatus = "failed";
//   state.error = action.payload;
// };

// export const fetchHandlers = {
//   pending,
//   fulfilled,
//   rejected,
// };











import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../api/api";

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get("/user/get-cart/");
//       return response.data.cart;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/user/get-cart/");
      
      // Transform the response to match what your Redux store expects
      return {
        products: response.data.products || [],
        id: response.data._id,
        total_price: response.data.cartTotal || 0
      };
      
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "cart/deleteCartProduct",
  async (productId, thunkAPI) => {
    try {
      await api.delete(`user/delete-cart-product/${productId}/`);
      return productId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const pending = (state) => {
  state.fetchStatus = "loading";
  state.error = null;
};

const fulfilled = (state, action) => {
  state.fetchStatus = "succeeded";
  
  // Safely handle the payload
  const payload = action.payload || {};
  
  state.products = payload.products || [];
  state.cartId = payload.id || null;
  state.cartCount = Array.isArray(payload.products) 
    ? payload.products.reduce((acc, el) => acc + (el.quantity || 1), 0)
    : 0;
  state.totalPrice = payload.total_price || 0;
};

const rejected = (state, action) => {
  state.fetchStatus = "failed";
  state.error = action.payload;
};

export const fetchHandlers = {
  pending,
  fulfilled,
  rejected,
};