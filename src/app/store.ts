import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice'
import recipesReducer from '../features/recipes/recipesSlice'
import { postsApi } from "./services/posts";
import { recipesApi } from "./services/recipes";

export const store = configureStore({
	reducer: {
		posts: postsReducer,
		recipes: recipesReducer,
		[postsApi.reducerPath]: postsApi.reducer,
		[recipesApi.reducerPath]: recipesApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware,recipesApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch