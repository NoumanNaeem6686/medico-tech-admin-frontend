import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:8000';

export const signUpAdmin = createAsyncThunk(
    "admin/signUpAdmin",
    async (user, thunkAPI) => {
        try {
            const response = await axios.post(`${URL}/api/admin/signUpAdmin`, user);
            const data = response.data;
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message || 'Failed to register');
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Error during registration');
        }
    }
);
export const signInAdmin = createAsyncThunk(
    "admin/signInAdmin",
    async (user, thunkAPI) => {
        try {
            const response = await axios.post(`${URL}/api/admin/signInAdmin`, user);
            const data = response.data;
            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message || 'Failed to Login');
            }
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || 'Error during Login');
        }
    }
);

const initialState = {
    admin: null,
    error: null,
    loading: false,
    isError: false,
    isSuccess: false,
};

const userSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetAdminState: (state) => {
            state.loading = false;
            state.isError = false;
            state.isSuccess = false;
            state.error = null;
            state.admin = null; // Ensure admin data is cleared on reset
        },
        logoutAdmin: (state) => {
            state.admin = null;
            state.isSuccess = false;
            state.isError = false;
            state.loading = false;
            // Optionally clear other state parts related to the admin session
        }
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
            .addCase(signUpAdmin.rejected, (state, action) => {
             
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
                console.log('Payload received on login:', action.payload.admin);
                state.loading = false;
                state.isSuccess = true;
                state.admin = action.payload.admin;
            })
            .addCase(signInAdmin.rejected, (state, action) => {
                console.log('Error on login:', action.payload);
                state.loading = false;
                state.isError = true;
                state.error = action.payload;
            })
           
    },
});

export const { resetAdminState, logoutAdmin  } = userSlice.actions;
export default userSlice.reducer;
