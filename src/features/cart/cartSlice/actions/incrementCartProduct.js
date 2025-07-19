// actions/incrementCartProduct.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create the async thunk for incrementing cart product
export const incrementCartProduct = createAsyncThunk(
  'cart/incrementProduct',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token; // Adjust based on your auth state structure
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make API call to increment product quantity
      const response = await axios.post(
        '/api/user/cart', // Your cart endpoint
        {
          product_id: productId,
          quantity: 1, // Increment by 1
          operation: 'increment' // Optional: to identify the operation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Return the updated cart data
      return {
        success: true,
        cart: response.data.cart,
        productId,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error incrementing cart product:', error);
      
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

// Handlers for the increment action
export const incrementProductHandlers = {
  pending: (state, action) => {
    state.incrementStatus = 'loading';
    state.error = null;
    
    // Optional: Optimistically update the UI
    const productId = action.meta.arg;
    const productIndex = state.products.findIndex(
      product => (product.id || product._id) === productId
    );
    
    if (productIndex !== -1) {
      // Optimistically increment the quantity
      const currentQuantity = state.products[productIndex].quantity || 
                             state.products[productIndex].count || 1;
      state.products[productIndex].quantity = currentQuantity + 1;
      state.products[productIndex].count = currentQuantity + 1;
      
      // Update totals
      state.cartCount = state.products.reduce((sum, item) => 
        sum + (item.quantity || item.count || 1), 0
      );
      
      state.totalPrice = state.products.reduce((sum, item) => {
        const quantity = item.quantity || item.count || 1;
        return sum + (item.price * quantity);
      }, 0);
    }
  },
  
  fulfilled: (state, action) => {
    state.incrementStatus = 'succeeded';
    state.error = null;
    
    const { cart, productId } = action.payload;
    
    if (cart && cart.products) {
      // Update the entire cart state with server response
      state.products = cart.products.map(product => ({
        ...product,
        // Ensure both quantity and count are set for consistency
        quantity: product.count || product.quantity,
        count: product.count || product.quantity,
        // Handle nested product data structure
        id: product.product?._id || product.product?.id || product.id || product._id,
        name: product.product?.name || product.name,
        title: product.product?.title || product.title,
        price: product.product?.price || product.price,
        image: product.product?.image || product.image,
        images: product.product?.images || product.images,
        description: product.product?.description || product.description
      }));
      
      state.cartCount = cart.products.reduce((sum, item) => 
        sum + (item.count || item.quantity || 1), 0
      );
      
      state.totalPrice = cart.cartTotal || cart.products.reduce((sum, item) => {
        const quantity = item.count || item.quantity || 1;
        const price = item.product?.price || item.price || 0;
        return sum + (price * quantity);
      }, 0);
      
      state.cartId = cart._id || cart.id;
    }
    
    console.log('Cart increment successful:', action.payload.message);
  },
  
  rejected: (state, action) => {
    state.incrementStatus = 'failed';
    state.error = action.payload?.message || 'Failed to increment product quantity';
    
    // Revert optimistic update if it was applied
    const productId = action.meta.arg;
    const productIndex = state.products.findIndex(
      product => (product.id || product._id) === productId
    );
    
    if (productIndex !== -1) {
      // Revert the optimistic increment
      const currentQuantity = state.products[productIndex].quantity || 
                             state.products[productIndex].count || 2;
      if (currentQuantity > 1) {
        state.products[productIndex].quantity = currentQuantity - 1;
        state.products[productIndex].count = currentQuantity - 1;
        
        // Recalculate totals
        state.cartCount = state.products.reduce((sum, item) => 
          sum + (item.quantity || item.count || 1), 0
        );
        
        state.totalPrice = state.products.reduce((sum, item) => {
          const quantity = item.quantity || item.count || 1;
          return sum + (item.price * quantity);
        }, 0);
      }
    }
    
    console.error('Cart increment failed:', state.error);
  }
};