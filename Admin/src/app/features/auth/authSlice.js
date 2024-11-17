// src/app/features/auth/authSlice.js

import { createSlice } from '@reduxjs/toolkit'

const initialState = { isAuthenticated: false, userInfo: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.isAuthenticated = true
      state.userInfo = action.payload
      // localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isAuthenticated = false

      state.userInfo = null

      // localStorage.removeItem('userInfo')
    },
  },
})

export const { setCredentials, logout } = authSlice.actions

export default authSlice.reducer
