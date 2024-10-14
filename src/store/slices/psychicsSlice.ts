import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addPsychics = createAsyncThunk(
  "addPsychics",
  async (psychics, thunkAPI) => {
    try {
      // First API call to add the psychic
      const response = await axios.post(
        `${URL}/api/psyscics/addpsyscics`,
        psychics,
      );
      const data = response.data;
      console.log("🚀 ~ First API response data:", data);

      if (!data.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to register Psychics",
        );
      }

      // Log the entire response data structure
      console.log("🚀 ~ Full response data structure:", data);

      // Extract the id from the response data
      const { id } = data.data;
      console.log("🚀 ~ Extracted id:", id);

      if (!id) {
        return thunkAPI.rejectWithValue(
          "Psychic ID is missing in the response",
        );
      }

      // Construct the psychicStatus object
      const psychicStatus = {
        psychicId: id,
        chatStatus: false, // Default call status
        callStatus: false, // Default chat status
      };

      // Second API call to save the psychic's status
      const statusResponse = await axios.post(
        `${URL}/api/psyscics/psychics-status`,
        psychicStatus,
      );
      const statusData = statusResponse.data;
      console.log("🚀 ~ Second API response statusData:", statusData);

      if (!statusData.success) {
        return thunkAPI.rejectWithValue(
          statusData.message || "Failed to save Psychic status",
        );
      }

      return { ...data, status: statusData };
    } catch (error: any) {
      console.error("🚀 ~ Error:", error.response?.data);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error during registration Psychics",
      );
    }
  },
);

export const gettingAllPsychics = createAsyncThunk(
  "getAllPsychics",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(`${URL}/api/psyscics/get-all-psychics`);
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

export const deletePsychic = createAsyncThunk(
  "deletePsychic",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${URL}/api/psyscics/delete-psychic/${id}`,
      );
      const data = response.data;

      if (!data.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to delete psychic",
        );
      }
      return id; // Return the deleted psychic ID
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error during deletion of psychic",
      );
    }
  },
);

export const updatePsychic = createAsyncThunk(
  "updatePsychic",
  async (psychic: any, thunkAPI) => {
    console.log("🚀 ~ psychic:", psychic)
    try {
      const response = await axios.put(
        `${URL}/api/psyscics/update-psychic/${psychic.id}`,
        psychic,
      );
      const data = response.data;

      if (!data.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to update psychic",
        );
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Error during updating psychic",
      );
    }
  },
);

const initialState = {
  psychics: [],
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
      state.psychics = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPsychics.pending, (state) => {
        state.loading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addPsychics.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isSuccess = true;
        //@ts-ignore
        state.psychics.push(action?.payload);
      })
      .addCase(addPsychics.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      });
    builder.addCase(gettingAllPsychics.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gettingAllPsychics.fulfilled, (state, action) => {
      state.loading = false;
      state.psychics = action.payload.data;
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
      state.psychics = state.psychics.filter(
        (psychic: any) => psychic.id !== action.payload,
      );
    });
    builder.addCase(
      deletePsychic.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      },
    );
    builder.addCase(updatePsychic.pending, (state) => {
      state.loading = true;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(updatePsychic.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      const data: any = state.psychics.map((psychic: any) =>
        psychic.id === action.payload.data.id ? action.payload.data : psychic,
      );
      console.log("🚀 ~ builder.addCase ~ data:", data)
      state.psychics = data;
    });
    builder.addCase(
      updatePsychic.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.isError = true;
        state.error = action.payload;
      },
    );
  },
});

export const { resetPsychicsState } = psychicsSlice.actions;
export default psychicsSlice.reducer;
