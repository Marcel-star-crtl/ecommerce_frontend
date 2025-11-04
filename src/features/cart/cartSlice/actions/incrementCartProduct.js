import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../api/api';

export const incrementCartProduct = createAsyncThunk(
  'cart/incrementProduct',
  async (productId, { getState, rejectWithValue }) => {
    try {
      console.log('➕ Incrementing cart product:', productId);
      
      const state = getState();
      const token = state.auth.token; 
      const isLoggedIn = state.auth.isLoggedIn;
      
      if (!isLoggedIn || !token) {
        return rejectWithValue('Please login to manage cart');
      }

      const response = await api.put('/user/cart/update-quantity', {
        product: productId,
        action: 'INCREASE'
      });

      console.log('✅ Increment response:', response.data);

      return {
        success: true,
        cart: response.data.cart,
        cartTotal: response.data.cartTotal,
        totalItems: response.data.totalItems,
        productId,
        message: response.data.message
      };
    } catch (error) {
      console.error('❌ Error incrementing cart product:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to increment product quantity';
      
      return rejectWithValue({
        message: errorMessage,
        productId,
        status: error.response?.status
      });
    }
  }
);

export const incrementProductHandlers = {
  pending: (state, action) => {
    state.incrementStatus = 'loading';
    state.error = null;
  },
  
  fulfilled: (state, action) => {
    state.incrementStatus = 'succeeded';
    state.error = null;
    
    const { cart, cartTotal, totalItems } = action.payload;
    
    if (cart) {
      state.products = cart.products || [];
      state.cartCount = totalItems || 0;
      state.totalPrice = cartTotal || 0;
      state.cartId = cart._id;
    }
    
    console.log('✅ Cart increment successful:', action.payload.message);
  },
  
  rejected: (state, action) => {
    state.incrementStatus = 'failed';
    state.error = action.payload?.message || 'Failed to increment product quantity';
    
    console.error('❌ Cart increment failed:', state.error);
  }
};