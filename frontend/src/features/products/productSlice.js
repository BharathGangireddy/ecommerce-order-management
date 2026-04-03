import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

/* =========================
   FETCH ALL PRODUCTS
========================= */
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/products");
      return res.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

/* =========================
   FETCH SINGLE PRODUCT
========================= */
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    product: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default productSlice.reducer;