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
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
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
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    /* CLEAR PRODUCT (IMPORTANT) */
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH ALL */
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

      /* FETCH ONE */
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.product = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const { clearProduct } = productSlice.actions;

export default productSlice.reducer;