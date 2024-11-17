import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: '/api/v1/customers',
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

    getCustomers: builder.mutation({
        query: () => ({
          url: '/api/v1/auth/customers',
          method: 'GET',
        }),
      }),

    getCustomer: builder.mutation({
        query: ({id}) => ({
          url: `/api/v1/auth/customers/${id}`,
          method: 'GET',
        }),
      }),

    updateCustomer: builder.mutation({
      query: ({id,data}) => ({
        url: `/api/v1/customers/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

  }),
})



export const {
  useAddCustomerMutation,
  useForgotMutation,
  useResetMutation,
  useGetCustomersMutation,
  useGetCustomerMutation,
  useUpdateCustomerMutation,

} = userApiSlice
