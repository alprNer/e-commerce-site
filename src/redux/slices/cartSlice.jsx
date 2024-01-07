import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    deleteFromCart(state, action) {
      return state.filter((item) => item.id != action.payload.id);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const productToUpdate = state.find((product) => product.id === productId);

      if (productToUpdate) {
        productToUpdate.quantity = quantity;
      }
    },
    updateTotal: (state, action) => {
      const { productId, totalPrice } = action.payload;
      const productToUpdate = state.find((product) => product.id === productId);
      if (productToUpdate) {
        productToUpdate.totalPrice = totalPrice;
      }
    },
  },
});

export const { addToCart, deleteFromCart, updateQuantity, updateTotal } = cartSlice.actions;
export default cartSlice.reducer;
