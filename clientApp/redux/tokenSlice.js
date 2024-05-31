// tokenSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { setAccessToken } from '../services/interfaces/authentication';

const tokenSlice = createSlice({
  name: 'token',
  initialState: null, // Trạng thái ban đầu của token
  reducers: {
    setToken: (state, action) => {
      const result = setAccessToken(action.payload); // Lưu token vào local storage
      return action.payload; // Lưu token vào trạng thái
    },
    getToken: (state) => state, // Lấy token từ trạng thái
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
