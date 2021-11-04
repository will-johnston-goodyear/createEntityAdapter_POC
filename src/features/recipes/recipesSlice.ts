import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { recipesApi } from '../../app/services/recipes';

const recipesAdapter = createEntityAdapter();

export const recipesSlice = createSlice({
	name: 'recipes',
	initialState : recipesAdapter.getInitialState(),
	reducers: {
		removeRecipes: recipesAdapter.removeAll,
		addRecipe: recipesAdapter.addOne,
		removeRecipe: recipesAdapter.removeOne,
	},
	extraReducers: (builder) => {
		builder.addMatcher(recipesApi.endpoints.getRecipes.matchFulfilled, (state, action) => {
			recipesAdapter.setAll(state, action.payload.recipes)
		})
	}
})

export const recipesSelectors = recipesAdapter.getSelectors();
export default recipesSlice.reducer;
export const { removeRecipes, addRecipe, removeRecipe } = recipesSlice.actions;