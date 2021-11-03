import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from '../sharedTypes'

export const postsApi = createApi({
	reducerPath: 'postsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http:localhost:3000/' }),
	endpoints: (builder) => ({
		getPosts: builder.query<{posts : Post[]}, null>({
			query: () => 'posts',
		})
	})
})

export const { useGetPostsQuery } = postsApi;