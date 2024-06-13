import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addPsychics = createAsyncThunk(
  "addPsychics",
  async (psychics, thunkAPI) => {
    try {
      const response = await axios.post(
        `${URL}/api/psyscics/addpsyscics`,
        psychics
      );
      const data = response.data;
      if (!data.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to register Psychics"
        );
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error during registration Psychics"
      );
    }
  }
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
  }
);

export const deletePsychic = createAsyncThunk(
  "deletePsychic",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${URL}/api/psyscics/delete-psychic/${id}`);
      const data = response.data;

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "Failed to delete psychic");
      }
      return id; // Return the deleted psychic ID
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error during deletion of psychic"
      );
    }
  }
);

const initialState = {
  pasychics: [],
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
      state.pasychics = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPsychics.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addPsychics.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.pasychics.push(action.payload);
      })
      .addCase(addPsychics.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder.addCase(gettingAllPsychics.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gettingAllPsychics.fulfilled, (state, action) => {
      state.loading = false;
      state.pasychics = action.payload.data;
    });
    builder.addCase(gettingAllPsychics.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    builder.addCase(deletePsychic.pending, (state) => {
      state.loading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(deletePsychic.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.pasychics = state.pasychics.filter(psychic => psychic.id !== action.payload);
    });
    builder.addCase(deletePsychic.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { resetPsychicsState } = psychicsSlice.actions;
export default psychicsSlice.reducer;
