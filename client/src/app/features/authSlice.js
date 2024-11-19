// src/app/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = { isAuthenticated: false, userInfo: null }

// Safe parsing function for JSON from localStorage
// const parseJSON = (value, fallback) => {
//   try {
//     return JSON.parse(value) ?? fallback;
//   } catch (e) {
//     return fallback;
//   }
// };
// // Load initial authentication state from localStorage
// const initialState = {
//   isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
//   userInfo: parseJSON(localStorage.getItem('userInfo'), null),
// };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true
      state.userInfo = action.payload;

      // Persist state in localStorage
      // localStorage.setItem('isAuthenticated', JSON.stringify(true));
      // localStorage.setItem('userInfo', JSON.stringify(action.payload));

    },
    logout: (state) => {
      state.isAuthenticated = false
      state.userInfo = null;
      
       // Remove from localStorage
      // localStorage.removeItem('isAuthenticated');
      // localStorage.removeItem('userInfo');
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
