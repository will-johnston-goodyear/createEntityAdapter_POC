import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { normalize, schema } from 'normalizr';
import { Post, NormalizedPostsState } from '../sharedTypes'

export const postsApi = createApi({
	reducerPath: 'postsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http:localhost:3000/' }),
	endpoints: (builder) => ({
		getPosts: builder.query<NormalizedPostsState, null>({
			query: () => 'posts',
			transformResponse: (response : { posts : Post[] } ) : NormalizedPostsState => {
				const { posts } = response;
				
				const commentsSchema = new schema.Entity('comments', undefined, {
				idAttribute: "comment_id"
			})

			const authors = new schema.Entity('authors', undefined, {
				idAttribute: "id"
			})
			
			const usersSchema = new schema.Entity('users', {
				authors: authors,
			})

			const postsSchema = new schema.Entity('posts', {
				comments: [commentsSchema],
				author: usersSchema,
			}) 
	
			const normalizedData = normalize(posts, [postsSchema]);
			
				return {
					posts: {
						entities: normalizedData.entities,
						ids: normalizedData.result,
					}
				
				}
			},
		}),
	}) 
})

export const { useGetPostsQuery } = postsApi;