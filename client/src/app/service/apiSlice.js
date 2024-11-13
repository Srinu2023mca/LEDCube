// src/app/service/apiSlice.js

import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react'

// console.log(import.meta.env.VITE_BASE_URL);
const url='http://localhost:5002' ;
// const url='https://ledcube-server.onrender.com' ;

const baseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: 'include',
})

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
})