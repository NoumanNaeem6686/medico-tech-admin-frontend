import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const gettingAllCustomerHistories = createAsyncThunk(
  "gettingAllCustomerHistories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${URL}/api/customer/get-customer-history-details`,
      );
      const data = response.data;
      console.log("🚀 ~ data cosuter:", data);

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

// export const deletePsychic = createAsyncThunk(
//   "deletePsychic",
//   async (id, thunkAPI) => {
//     try {
//       const response = await axios.delete(
//         `${URL}/api/psyscics/delete-psychic/${id}`,
//       );
//       const data = response.data;

//       if (!data.success) {
//         return thunkAPI.rejectWithValue(
//           data.message || "Failed to delete psychic",
//         );
//       }
//       return id; // Return the deleted psychic ID
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response.data.message || "Error during deletion of psychic",
//       );
//     }
//   },
// );

// export const updatePsychic = createAsyncThunk(
//   "updatePsychic",
//   async (psychic, thunkAPI) => {
//     try {
//       const response = await axios.put(
//         `${URL}/api/psyscics/update-psychic/${psychic.id}`,
//         psychic,
//       );
//       const data = response.data;

//       if (!data.success) {
//         return thunkAPI.rejectWithValue(
//           data.message || "Failed to update psychic",
//         );
//       }
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response.data.message || "Error during updating psychic",
//       );
//     }
//   },
// );

const initialState = {
  customerHistory: [],
  error: null,
  loading: false,
  isError: false,
  isSuccess: false,
};

const customerHistorySlice = createSlice({
  name: "customerHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
    //   .addCase(addPsychics.pending, (state) => {
    //     state.loading = true;
    //     state.isError = false;
    //     state.error = null;
    //   })
    //   .addCase(addPsychics.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.isSuccess = true;
    //     state.psychics.push(action.payload);
    //   })
    //   .addCase(addPsychics.rejected, (state, action) => {
    //     state.loading = false;
    //     state.isError = true;
    //     state.error = action.payload;
    //   });
    builder.addCase(gettingAllCustomerHistories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(gettingAllCustomerHistories.fulfilled, (state, action) => {
      console.log("🚀 ~ builder.addCase ~ action:", action);
      state.loading = false;
      state.customerHistory = action.payload.data;
    });
    builder.addCase(gettingAllCustomerHistories.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
    // builder.addCase(deletePsychic.pending, (state) => {
    //   state.loading = true;
    //   state.isError = false;
    //   state.error = null;
    // });
    // builder.addCase(deletePsychic.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = true;
    //   state.psychics = state.psychics.filter(
    //     (psychic) => psychic.id !== action.payload,
    //   );
    // });
    // builder.addCase(deletePsychic.rejected, (state, action) => {
    //   state.loading = false;
    //   state.isError = true;
    //   state.error = action.payload;
    // });
    // builder.addCase(updatePsychic.pending, (state) => {
    //   state.loading = true;
    //   state.isError = false;
    //   state.error = null;
    // });
    // builder.addCase(updatePsychic.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = true;
    //   state.psychics = state.psychics.map((psychic) =>
    //     psychic.id === action.payload.data.id ? action.payload.data : psychic,
    //   );
    // });
    // builder.addCase(updatePsychic.rejected, (state, action) => {
    //   state.loading = false;
    //   state.isError = true;
    //   state.error = action.payload;
    // });
  },
});

// export const { resetPsychicsState } = customerHistorySlice.actions;
export default customerHistorySlice.reducer;
