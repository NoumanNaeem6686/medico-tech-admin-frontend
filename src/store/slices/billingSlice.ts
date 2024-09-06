import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Async thunk for getting all psychic earnings
export const gettingAllPsychicEarnings = createAsyncThunk(
    "gettingAllPsychicEarnings",
    async (id, thunkAPI) => {
        console.log("🚀 ~ id:", id)
        try {
            const response = await axios.get(
                `${URL}/api/customer/billing/${id}`
            );
            const data = response.data;
            console.log("🚀 ~ data earnings:", data);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data);
            }
            return data;
        } catch (e) {
            console.log("error in getting all psychic earnings", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const initialState = {
    psychicEarnings: [],
    error: null,
    loading: false,
    isError: false,
    isSuccess: false,
};

const psychicEarningsSlice = createSlice({
    name: "psychicEarnings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(gettingAllPsychicEarnings.pending, (state) => {
                state.loading = true;
            })
            .addCase(gettingAllPsychicEarnings.fulfilled, (state, action) => {
                console.log("🚀 ~ builder.addCase ~ action:", action);
                state.loading = false;
                state.psychicEarnings = action.payload.data;
            })
            .addCase(gettingAllPsychicEarnings.rejected, (state, action: any) => {
                state.loading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export default psychicEarningsSlice.reducer;
