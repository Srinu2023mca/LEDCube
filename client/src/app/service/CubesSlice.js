// src/app/service/songCubesApiSlice.js

import { apiSlice } from './apiSlice'

export const cubesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    createCubes: builder.mutation({
      query: (data) => ({
        url: '/api/v1/cubesData',
        method: 'POST',
        body: data,
      }),
    }),

    getCubes: builder.mutation({
        query: () => ({
          url: '/api/v1/cubesData',
          method: 'GET', // The backend defines the logout as a GET request
        }),
      }),

      getCubesById: builder.mutation({
        query: (id) => ({
          url: `/api/v1/cubesData/${id}`,
          method: 'GET', // The backend defines the logout as a GET request
        }),
      }),
    
    updateCubesById: builder.mutation({
      query: ({id,data}) => ({
        url: `/api/v1/cubesData/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteCubesById: builder.mutation({
        query: (id) => ({
          url: `/api/v1/cubesData/${id}`,
          method: 'DELETE', // The backend defines the logout as a GET request
        }),
      }),
    })
})

export const {
  useCreateCubesMutation,
  useGetCubesMutation,
  useGetCubesByIdMutation,
  useUpdateCubesByIdMutation,
  useDeleteCubesByIdMutation,
} = cubesApiSlice
