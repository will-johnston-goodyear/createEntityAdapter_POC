import { schema, normalize } from "normalizr";
import { NormalizedPostsState, Post } from "./sharedTypes";

/**
 * Utility for normalizing a successful response from the `/posts` endpoint
 * 
 * @param { posts: Post[] }response 
 * @returns { NormalizedPostsState }
 */
export const normalizePostsResponse = (response: { posts: Post[] }): NormalizedPostsState => {
	
	const { posts : data } = response;
	
	const authors = new schema.Entity('authors', undefined, {
		idAttribute: "id"
	})

	const commentAuthors = new schema.Entity('commentAuthor',
		undefined,
		{
			idAttribute: "commenter_id"
		}
	)

	const user = new schema.Entity('users', undefined, {
		idAttribute: 'id'
	});
	
		const comments = new schema.Entity(
		'comments',
		{
			commenter: 	user,
		},
		{
				idAttribute: "comment_id"
		}
	)

	const post = new schema.Entity('posts', {
		comments: [comments],
		author: user,
	}) 
	
	const normalizedData = normalize(data, [post]);
	
		return {
			posts: {
				entities: normalizedData.entities,
				ids: normalizedData.result,
			}
		
		}
}