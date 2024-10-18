import { SiginUser } from "@/types/user";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const signUpAdmin = createAsyncThunk(
  "admin/signUpAdmin",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/admin/signUpAdmin`, user);
      const data = response.data;

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "Failed to register");
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error during registration",
      );
    }
  },
);

export const signInAdmin = createAsyncThunk(
  "admin/signInAdmin",
  async (user: SiginUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/admin/signInAdmin`, user);
      const data = response.data;
      console.log("🚀 ~ data:", data);

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to Login");
      }
      const stringyData = JSON.stringify(data.admin);
      document.cookie = `login=${stringyData}; path=/;`;
      localStorage.setItem("login", stringyData);

      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Error during Login",
      );
    }
  },
);

export const getCurrentAdmin = createAsyncThunk(
  "admin/loadAdminFromLocalStorage",
  async (_, thunkAPI) => {
    try {
      const loginData = localStorage.getItem("login");
      if (loginData) {
        const admin = JSON.parse(loginData);
        return { admin };
      } else {
        return thunkAPI.rejectWithValue("No admin data found in local storage");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Failed to load admin data from local storage",
      );
    }
  },
);

const initialState = {
  admin: null,
  isUserLogined: false,
  error: null,
  loading: false,
  isError: false,
  isSuccess: false,
};

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.loading = false;
      state.isError = false;
      state.isUserLogined = false;
      state.isSuccess = false;
      state.error = null;
      state.admin = null;
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.isSuccess = false;
      state.isError = false;
      state.isUserLogined = false;
      state.loading = false;
      document.cookie = "login=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      localStorage.removeItem("login");
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAdmin.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(signUpAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(signUpAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(signInAdmin.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(signInAdmin.fulfilled, (state, action) => {
        console.log("Payload received on login:", action.payload.admin);
        state.loading = false;
        state.isSuccess = true;
        state.isUserLogined = true;

        state.admin = action.payload.admin;
      })
      .addCase(signInAdmin.rejected, (state, action: PayloadAction<any>) => {
        console.log("Error on login:", action.payload);
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(getCurrentAdmin.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getCurrentAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.isUserLogined = true;

        state.admin = action.payload.admin;
      })
      .addCase(
        getCurrentAdmin.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.isError = true;
          state.error = action.payload;
        },
      );
  },
});

export const { resetAdminState, logoutAdmin } = userSlice.actions;
export default userSlice.reducer;
