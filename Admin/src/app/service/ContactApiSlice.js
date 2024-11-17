import { apiSlice } from './apiSlice'

export const ContactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (data) => '/api/v1/contacts/getContacts',
    }),

    addContact: builder.mutation({
      query: (data) => ({
        url: '/api/v1/contacts/addContact',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useGetContactsQuery, useAddContactMutation } = ContactApiSlice
