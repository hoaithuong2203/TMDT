// registrationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterStore } from '../services/interfaces/authentication';

// Thực hiện yêu cầu đăng ký người dùng
export const registerUser = createAsyncThunk('registration/registerUser', async (userData, { rejectWithValue }) => {
    try {
        // Thực hiện yêu cầu đăng ký và trả về phản hồi từ máy chủ
        const { name, email, password } = userData;
        const response = await RegisterStore(name, email, password);
        return response.data; // Trả về dữ liệu phản hồi từ API (ví dụ: thông tin người dùng)
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    user: null,
    token: null, // Thêm trường để lưu thông tin người dùng nếu cần
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        resetRegistrationState: (state) => {
           return initialState;
        },
        //save token into local storage
        setToken: (state, action) => {
            state.token = action.payload;
        }

    },  
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Lưu thông tin người dùng từ action vào trạng thái
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});
export const { resetRegistrationState, setToken } = registrationSlice.actions;
export default registrationSlice.reducer;
