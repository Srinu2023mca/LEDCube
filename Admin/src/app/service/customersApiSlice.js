import { apiSlice } from './apiSlice'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: '/api/v1/signup',
        method: 'POST',
        body: data,
      }),
    }),
    resetCustomer: builder.mutation({
      query: ({id}) => ({
        url: `/api/v1/customers/reset/${id}`,
        method: 'GET',
        
      }),
    }),

    getCustomers: builder.mutation({
        query: () => ({
          url: '/api/v1/customers',
          method: 'GET',
        }),
      }),

    getCustomer: builder.mutation({
        query: (id) => ({
          url: `/api/v1/customers/${id}`,
          method: 'GET',
        }),
      }),

    updateCustomer: builder.mutation({
      query: ({id,data}) => ({
        url: `/api/v1/customers/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    updateActive: builder.mutation({
      query: ({id,data}) => ({
        url: `/api/v1/updateActive/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

  }),
})



export const {
  useAddCustomerMutation,
  useResetCustomerMutation,
  useGetCustomersMutation,
  useGetCustomerMutation,
  useUpdateCustomerMutation,
  useUpdateActiveMutation
} = userApiSlice
