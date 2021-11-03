import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import counterReducer from '../features/counter/counterSlice'
import postsReducer from '../features/posts/postsSlice'
import { postsApi } from "./services/posts";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		posts: postsReducer,
		[postsApi.reducerPath]: postsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch