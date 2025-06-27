// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchShops = createAsyncThunk(
//   'shops/fetchShops',
//   async () => {
//     const response = await axios.get('/api/shops');
//     return response.data;
//   }
// );

// const shopsSlice = createSlice({
//   name: 'shops',
//   initialState: {
//     shops: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchShops.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchShops.fulfilled, (state, action) => {
//         state.loading = false;
//         state.shops = action.payload;
//       })
//       .addCase(fetchShops.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default shopsSlice.reducer;