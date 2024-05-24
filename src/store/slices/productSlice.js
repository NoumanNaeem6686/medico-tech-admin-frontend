import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/admin/addProduct`, product);
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to add Product",
        );
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during adding product",
      );
    }
  },
);

export const gettingAllProducts = createAsyncThunk(
  "products/gettingAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/admin/getAllProducts`);
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch products",
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${URL}/api/admin/deleteProduct/${productId}`,
      );
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to delete product",
        );
      }
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during deleting product",
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productDetails }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${URL}/api/admin/updateProduct/${id}`,
        productDetails,
      );
      if (!response.data.success) {
        return thunkAPI.rejectWithValue(
          response.data.message || "Failed to update product",
        );
      }
      return { id, productDetails: response.data.product };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during updating product",
      );
    }
  },
);

const initialState = {
  products: [],
  error: null,
  loading: false,
  isError: false,
  isSuccess: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products.push(action.payload.product);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(gettingAllProducts.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(gettingAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.products = action.payload.data;
      })
      .addCase(gettingAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        console.log("action payload", action.payload);
        state.products = state.products.filter(
          (product) => product.id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        const updatedProductIndex = state.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (updatedProductIndex >= 0) {
          state.products[updatedProductIndex] = action.payload.productDetails;
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
