import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { NormalizedPostsState, NormalizedStateItem } from '../../app/sharedTypes'

const initialState: NormalizedStateItem = {
		entities: {},
		ids: [],
}

const postsAdapter = createEntityAdapter();

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPosts(state, action: PayloadAction<NormalizedPostsState>){
			const { posts: { entities, ids } } = action.payload;
			state.entities = entities;
			state.ids = ids;
		},
	},
})

export default postsSlice.reducer;
export const { addPosts } = postsSlice.actions;