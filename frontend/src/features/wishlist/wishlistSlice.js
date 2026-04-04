import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;