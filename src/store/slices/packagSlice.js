// store/slices/packageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const createPackage = createAsyncThunk(
  "packages/createPackage",
  async (newPackage, thunkAPI) => {
    try {
      const response = await axios.post(
        `${URL}/api/admin/create-package`,
        newPackage,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const getAllPackages = createAsyncThunk(
  "packages/gettingAllPackages",
  async (newPackage, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/admin/getting-packages`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const deletePackage = createAsyncThunk(
  "packages/deletePackage",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${URL}/api/admin/delete-package/${id}`,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updatePackage = createAsyncThunk(
  'packages/updatePackage',
  async (updatedPackage, thunkAPI) => {
    try {
      const response = await axios.put(`${URL}/api/admin/update-package/${updatedPackage.id}`, updatedPackage);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    packages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages.push(action.payload);
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages.push(action.payload);
      })
      .addCase(getAllPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = state.packages
          .map((pkg) => ({
            ...pkg,
            data: pkg.data.filter((data) => data.id !== action.payload.id),
          }))
          .filter((pkg) => pkg.data.length > 0);
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = state.packages.map(pkg => ({
          ...pkg,
          data: pkg.data.map(data => data.id === action.payload.id ? action.payload : data)
        }));
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  
  },
});

export default packageSlice.reducer;
