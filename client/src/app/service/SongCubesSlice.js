// src/app/service/songCubesApiSlice.js

import { apiSlice } from './apiSlice'

export const songCubesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    createSongCubes: builder.mutation({
      query: (data) => ({
        url: '/api/v1/songsData',
        method: 'POST',
        body: data,
      }),
    }),

    getSongCubes: builder.mutation({
        query: () => ({
          url: '/api/v1/songsData',
          method: 'GET', // The backend defines the logout as a GET request
        }),
      }),

      getSongCubesById: builder.mutation({
        query: (id) => ({
          url: `/api/v1/songsData/${id}`,
          method: 'GET', // The backend defines the logout as a GET request
        }),
      }),
    
    updateSongCubesById: builder.mutation({
      query: ({id,data}) => ({
        url: `/api/v1/songsData/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteSongCubesById: builder.mutation({
        query: (id) => ({
          url: `/api/v1/songsData/${id}`,
          method: 'DELETE', // The backend defines the logout as a GET request
        }),
      }),
    })
})

export const {
  useCreateSongCubesMutation,
  useGetSongCubesMutation,
  useGetSongCubesByIdMutation,
  useUpdateSongCubesByIdMutation,
  useDeleteSongCubesByIdMutation,
} = songCubesApiSlice
