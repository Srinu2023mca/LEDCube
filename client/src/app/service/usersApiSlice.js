// src/app/service/usersApiSlice.js

import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
        query: (data) => ({
          url: '/api/signup',
          method: 'POST',
          body: data,
        }),
      }),

    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
        query: () => ({
          url: '/api/v1/auth/logout',
          method: 'GET', // The backend defines the logout as a GET request
        }),
      }),
    
    otpverification: builder.mutation({
      query: (data) => ({
        url: '/api/v1/users/verifyOtp',
        method: 'POST',
        body: data,
      }),
    }),

    resendotp: builder.mutation({ 
      query: (data) => ({
       
        url: '/api/v1/users/resendOtp',
        method: 'POST',
        body: data,
      }),
    }),

    forgot: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/forgot',
        method: 'POST',
        body: data,
      }),
    }),

    reset: builder.mutation({
      query: ({password,token}) => ({
        url: `/api/v1/auth/reset/${token}`,
        method: 'POST',
        body: {password},
      }),
    }),

    
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/profile',
        method: 'PUT',
        body: data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/api/v1/auth/updatePassword',
        method: 'PATCH',
        body: data,
      }),
    }),
    
    getUser: builder.mutation({
        query: (data) => ({
          url: '/api/v1/auth/getMe',
          method: 'GET',
        }),
      }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutUserMutation,
  useOtpverificationMutation,
  useResendotpMutation,
  useForgotMutation,
  useResetMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  // useGetVerificationQuery,
  useGetUserMutation,
} = userApiSlice
