import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { normalize, schema } from 'normalizr'
import { NormalizedPostsState, Post } from '../../app/sharedTypes'


const initialState: NormalizedPostsState = {
	posts: {
		entities: {},
		ids: [],
	},
	comments: {
		entities: {},
		ids: [],
	},
	authors: {
		entities: {},
		ids: [],
	},
	commentAuthors: {
		entities: {},
		ids: [],
	}
}
export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPosts(state, action: PayloadAction<{ posts : Post[]}>) {
			const { posts } = action.payload;
			const comments = posts.flatMap(post => post.comments);
			const authors = posts.flatMap(post => post.author);
			const commentAuthors = comments.flatMap(comment => comment.commenter);
			
			const postsEntity = new schema.Entity('posts', undefined, {
				idAttribute: 'id'
			})

			const commentsEntity = new schema.Entity("comments", undefined, {
				idAttribute: "comment_id"
			})
			
			const authorsEntity = new schema.Entity('authors', undefined, {
				idAttribute: 'id'
			})

			const commentAuthorsEntity = new schema.Entity('commentAuthors', undefined, {
				idAttribute: 'commenter_id'
			})

			const postsSchema = [postsEntity]
			const commentsSchema = [commentsEntity]
			const authorsSchema = [authorsEntity]
			const commentAuthorsSchema = [commentAuthorsEntity]

			const normalizedPostState = normalize(posts, postsSchema);
			state.posts.entities = normalizedPostState.entities?.posts;
			state.posts.ids = normalizedPostState?.result
			
			const normalizedCommentsState = normalize(comments, commentsSchema)
			state.comments.entities = normalizedCommentsState.entities?.comments;
			state.comments.ids = normalizedCommentsState?.result

			const normalizedAuthorsState = normalize(authors, authorsSchema);
			console.log(normalizedAuthorsState)

			const normalizedCommentAuthorState = normalize(commentAuthors, commentAuthorsSchema);
			state.commentAuthors.entities = normalizedCommentAuthorState.entities?.commentAuthors;
			state.commentAuthors.ids = Array.from(new Set(normalizedCommentAuthorState?.result))
		},
	},
})

export default postsSlice.reducer;
export const { addPosts } = postsSlice.actions;