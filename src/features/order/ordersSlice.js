// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../api/api";

// export const fetchOrders = createAsyncThunk(
//   "orders/fetchOrders", 
//   async () => {
//   try {
//     const response = await api.get("/orders/get-orders/");
//     return response.data.orders;
//   } catch (error) {
//     throw Error("Failed to fetch orders");
//   }
// });


// const initialState = {
//   orders: [],
//   status: "idle",
//   error: null,
// };

// const ordersSlice = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchOrders.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default ordersSlice.reducer;













import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { token } = auth;
      
      if (!token) {
        return rejectWithValue("User authentication required");
      }

      const response = await api.post('/orders/create-order', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.data.success) {
        return rejectWithValue(response.data.message || "Order creation failed");
      }
      
      return {
        orderId: response.data.orderId,
        orderData: orderData
      };
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Existing fetchOrders thunk (unchanged)
// export const fetchOrders = createAsyncThunk(
//   "orders/fetchOrders", 
//   async ({ userId, timestamp }, { getState, rejectWithValue }) => {
//     try {
//       console.log("fetchOrders called with:", { userId, timestamp });
      
//       if (!userId) {
//         console.error("fetchOrders: userId is missing");
//         return rejectWithValue("User ID is required");
//       }
      
//       const url = `/orders/get-orders/?userId=${userId}&timestamp=${timestamp}`;
//       console.log("Making API call to:", url);
      
//       const response = await api.get(url);
//       console.log("API response:", response.data);
      
//       if (!response.data) {
//         console.error("No data in response");
//         return rejectWithValue("No data received from server");
//       }
      
//       const orders = response.data.orders || response.data || [];
//       console.log("Extracted orders:", orders);
      
//       return orders;
//     } catch (error) {
//       console.error("fetchOrders error:", error);
//       const errorMessage = error.response?.data?.message || 
//                           error.message || 
//                           "Failed to fetch orders";
//       return rejectWithValue(errorMessage);
//     }
// });


export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders/user-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // or however you store the token
        }
      });
      return response.data.orders; // Return the orders array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch orders'
      );
    }
  }
);

const initialState = {
  orders: [],
  status: "idle", // idle, loading, succeeded, failed
  error: null,
  createOrderStatus: "idle",
  createOrderError: null,
  lastCreatedOrder: null
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      console.log("Clearing orders");
      state.orders = [];
      state.status = "idle";
      state.error = null;
    },
    addNewOrder: (state, action) => {
      console.log("Adding new order:", action.payload);
      state.orders.unshift(action.payload);
    },
    resetOrdersState: (state) => {
      return initialState;
    },
    clearCreateOrderState: (state) => {
      state.createOrderStatus = "idle";
      state.createOrderError = null;
      state.lastCreatedOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchOrders cases
      .addCase(fetchOrders.pending, (state) => {
        console.log("fetchOrders.pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log("fetchOrders.fulfilled with payload:", action.payload);
        state.status = "succeeded";
        state.orders = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.log("fetchOrders.rejected with error:", action.payload);
        state.status = "failed";
        state.error = action.payload || action.error?.message || "Unknown error";
        state.orders = [];
      })
      // createOrder cases
      .addCase(createOrder.pending, (state) => {
        console.log("createOrder.pending");
        state.createOrderStatus = "loading";
        state.createOrderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        console.log("createOrder.fulfilled with payload:", action.payload);
        state.createOrderStatus = "succeeded";
        state.lastCreatedOrder = action.payload;
        state.createOrderError = null;
        
        // Optionally add the new order to the orders list
        // if (action.payload.orderDetails) {
        //   state.orders.unshift(action.payload.orderDetails);
        // }
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log("createOrder.rejected with error:", action.payload);
        state.createOrderStatus = "failed";
        state.createOrderError = action.payload || action.error?.message || "Unknown error";
      });
  },
});

export const { 
  clearOrders, 
  addNewOrder, 
  resetOrdersState, 
  clearCreateOrderState 
} = ordersSlice.actions;

export default ordersSlice.reducer;