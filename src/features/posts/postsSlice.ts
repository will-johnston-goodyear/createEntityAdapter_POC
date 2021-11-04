import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { NormalizedPostsState, NormalizedComment, NormalizedStateItem } from '../../app/sharedTypes'


// const initialState: NormalizedPostsState = {
// 	posts: {
// 		entities: {},
// 		ids: [],
// 	}
// }
const initialState: NormalizedStateItem = {
		entities: {},
		ids: [],
}

const postsAdapter = createEntityAdapter();

console.log(postsAdapter);

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