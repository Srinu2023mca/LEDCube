// // src/app/service/adminApiSlice.js

// import { apiSlice } from './apiSlice'

// export const adminApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     saveSlots: builder.mutation({
//       query: (slotsData) => ({
//         url: '/api/v1/users/dates',
//         method: 'PATCH',
//         body: slotsData,
//       }),
//     }),
//     getSlotsByDate: builder.query({
//       query: (date) => `/api/v1/users/dates/${date}`,
//     }),
//     getAllSlots: builder.query({
//       query: () => '/api/v1/users/dates',
//     }),
//     deleteSlotsByDate: builder.mutation({
//       query: (data) => ({
//         url: `/api/v1/users/dates/${data.date}`,
//         method: 'DELETE',
//         body: { slots: data.slots },
//       }),
//     }),
//   }),
// })

// export const {
//   useSaveSlotsMutation,
//   useGetSlotsByDateQuery,
//   useGetAllSlotsQuery,
//   useDeleteSlotsByDateMutation,
// } = adminApiSlice
