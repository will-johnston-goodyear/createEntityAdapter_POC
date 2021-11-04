import * as React from 'react'
import styled from 'styled-components';
import { useGetRecipesQuery } from '../../app/services/recipes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeRecipes, recipesSelectors, addRecipe, removeRecipe } from './recipesSlice';
import { Recipe } from '../../app/sharedTypes';

const ComponentWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const RecipeWrapper = styled.div`
	border: solid thin white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 1rem;
	padding: 1rem;
	width: 50%;
`
const RecipeTitle = styled.span`
	font-size: 2rem;
	font-weight: 900;
`
const Attribution = styled.div`
	margin: 1rem;
	font-size: 1.5rem;
`
const Body = styled.p`
	font-size: 2rem;
`
const Button = styled.button`
	margin: 1rem;
`

const Controls = styled.div`
	display: flex;
`
	
const Recipes = () => {
	const dispatch = useAppDispatch();
	const { data, error, isLoading } = useGetRecipesQuery(null);
	const ids = useAppSelector((state) => state.recipes.ids);
	const recipes = useAppSelector((state) => state.recipes.entities);

	const newRecipe: Recipe = {
		id: "003",
		title: "Bath Water",
		author: {
			"id": '003',
			"userName": 'j.hypes'
		},
		body: " Fill tub. Add self and rest 10 minutes. Serve. "
	}
	return (
		<ComponentWrapper>
			{isLoading && (
				<span>Getting recipes...</span>
			)}
			{
				data && (
					<>
						{ids.map(id => (
							<RecipeWrapper key={id}>
								{/*@ts-ignore*/}
								<RecipeTitle>{recipes[id].title}</RecipeTitle>
								<Attribution>
									{/*@ts-ignore*/}
									<span>Author: {recipes[id].author.userName}</span>
								</Attribution>
								<Body>
									{/*@ts-ignore*/}
									{recipes[id].body}
								</Body>
							</RecipeWrapper>
						))}
						<Controls>
							<Button onClick={() => {
								dispatch(removeRecipes())
								}}>Delete Recipes</Button>
							<Button onClick={() => {
								dispatch(addRecipe(newRecipe))
								}}>Add Recipe</Button>
								{
								ids.includes("003") && (
									<Button onClick={() => {
										dispatch(removeRecipe("003"))
										}}>Remove Recipe</Button>
									)		
								}
						</Controls>
					</>
				)
			}
		</ComponentWrapper>
	)
}

export default Recipes;