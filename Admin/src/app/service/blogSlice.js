// import { apiSlice } from './apiSlice'

// export const BlogApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getBlogs: builder.query({
//       query: () => '/api/v1/blogs/getAllBlogs',
//     }),
//     getBlog: builder.query({
//       query: (id) => `/api/v1/blogs/${id}`,
//     }),

//     createBlog: builder.mutation({
//       query: (data) => ({
//         url: '/api/v1/blogs/createBlog',
//         method: 'POST',

//         body: data,
//       }),
//     }),
//     updateBlog: builder.mutation({
//       query: ({ id, formData }) => ({
//         url: `/api/v1/blogs/${id}`,
//         method: 'PATCH',

//         body: formData,
//       }),
//     }),
//     deleteBlog: builder.mutation({
//       query: (id) => ({
//         url: `/api/v1/blogs/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//   }),
// })

// export const {
//   useGetBlogsQuery,
//   useCreateBlogMutation,
//   useGetBlogQuery,
//   useUpdateBlogMutation,
//   useDeleteBlogMutation,
// } = BlogApiSlice
