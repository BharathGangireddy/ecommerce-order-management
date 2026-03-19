import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* ================================
   FETCH CART
================================ */
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/cart");
      return res.data.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching cart");
    }
  }
);

/* ================================
   ADD TO CART
================================ */
export const addToCartAPI = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/cart", {
        productId,
        quantity,
      });
      return res.data.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding to cart");
    }
  }
);

/* ================================
   UPDATE CART ITEM
================================ */
export const updateCartAPI = createAsyncThunk(
  "cart/updateCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/cart", {
        productId,
        quantity,
      });
      return res.data.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating cart");
    }
  }
);

/* ================================
   REMOVE FROM CART
================================ */
export const removeCartAPI = createAsyncThunk(
  "cart/removeCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete("/cart", {
        data: { productId },
      });
      return res.data.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error removing item");
    }
  }
);

/* ================================
   CART SLICE
================================ */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder

      /* FETCH */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD */
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      /* UPDATE */
      .addCase(updateCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      /* REMOVE */
      .addCase(removeCartAPI.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

/* ================================
   EXPORTS
================================ */
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;