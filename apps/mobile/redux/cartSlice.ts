import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CartItem, Product } from '../src/types/product';
import { calculateCartItemCount, calculateCartTotal } from '../src/utils/cart';

interface CartState {
  items: CartItem[];
}

interface UpdateQuantityPayload {
  productId: number;
  quantity: number;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (!existingItem) {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<UpdateQuantityPayload>) => {
      const item = state.items.find(
        (cartItem) => cartItem.id === action.payload.productId,
      );

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartItemCount = (state: { cart: CartState }) =>
  calculateCartItemCount(state.cart.items);

export const selectCartTotal = (state: { cart: CartState }) =>
  calculateCartTotal(state.cart.items);

export const selectIsProductInCart =
  (productId: number) => (state: { cart: CartState }) =>
    state.cart.items.some((item) => item.id === productId);

export default cartSlice.reducer;
