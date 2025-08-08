import { createSlice } from '@reduxjs/toolkit';

const loadersSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = loadersSlice.actions;
export default loadersSlice.reducer;