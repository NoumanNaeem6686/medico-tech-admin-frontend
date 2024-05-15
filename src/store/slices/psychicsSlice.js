import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addPsychics = createAsyncThunk(
  "addPsychics",
  async (psychics, thunkAPI) => {
    try {
      const response = await axios.post(
        `${URL}/api/psyscics/addpsyscics`,
        psychics,
      );
      const data = response.data;
      if (!data.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to register Psychics",
        );
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error during registration Psychics",
      );
    }
  },
);
export const gettingAllPsychics = createAsyncThunk(
  "getAllPsychics",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/psyscics/getAllPsychics`);
      const data = response.data;

      if (!data.success) {
        return thunkAPI.rejectWithValue(data);
      }
      return data;
    } catch (e) {
      console.log("error in getting all psychics", e);
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const initialState = {
  pasychics: null,
  error: null,
  loading: false,
  isError: false,
  isSuccess: false,
};

const psychicsSlice = createSlice({
  name: "psychics",
  initialState,
  reducers: {
    resetPsychicsState: (state) => {
      state.loading = false;
      state.isError = false;
      state.isSuccess = false;
      state.error = null;
      state.pasychics = null;
    },
    // logoutAdmin: (state) => {
    //     state.admin = null;
    //     state.isSuccess = false;
    //     state.isError = false;
    //     state.loading = false;
    //     // Optionally clear other state parts related to the admin session
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPsychics.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
        return state;
      })
      .addCase(addPsychics.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.pasychics = action.payload;
        return state;
      })
      .addCase(addPsychics.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
        return state;
      });
    builder.addCase(gettingAllPsychics.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(gettingAllPsychics.fulfilled, (state, action) => {
      state.loading = false;
      state.pasychics = action.payload;
    });
    builder.addCase(gettingAllPsychics.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { resetPsychicsState, logoutAdmin } = psychicsSlice.actions;
export default psychicsSlice.reducer;
