import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { normalize, schema } from 'normalizr'
import { NormalizedPostsState, Post } from '../../app/sharedTypes'


const initialState: NormalizedPostsState = {
	posts: {
		entities: {},
		ids: [],
	}
}
export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPosts(state, action: PayloadAction<NormalizedPostsState>){
			const { posts: { entities, ids } } = action.payload;
			state.posts.entities = entities;
			state.posts.ids = ids;
		}
	},
})

export default postsSlice.reducer;
export const { addPosts } = postsSlice.actions;