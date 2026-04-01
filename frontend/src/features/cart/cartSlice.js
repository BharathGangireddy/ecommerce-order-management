import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* FETCH CART */
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await axiosInstance.get("/cart");
  return res.data.items;
});

/* ADD TO CART */
export const addToCartAPI = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const res = await axiosInstance.post("/cart", {
      productId,
      quantity,
    });
    return res.data.items;
  }
);

/* UPDATE */
export const updateCartAPI = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }) => {
    const res = await axiosInstance.put("/cart", {
      productId,
      quantity,
    });
    return res.data.items;
  }
);

/* REMOVE */
export const removeCartAPI = createAsyncThunk(
  "cart/removeCart",
  async ({ productId }) => {
    const res = await axiosInstance.delete("/cart", {
      data: { productId },
    });
    return res.data.items;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;