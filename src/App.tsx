import * as React from 'react';
import './App.css';
import { createServer } from 'miragejs'
//@ts-ignore
import Posts from './features/posts/Posts'
import Recipes from './features/recipes/Recipes'
import { Post } from './app/sharedTypes'

let server = createServer({})
server.get("/posts", {
	//@ts-ignore
	posts: [
		{
			id: "001",
			title: "The first post!",
			author: {
				id: "001",
				userName: "wijohnst"
			},
			body: "This is the first blog post.",
			comments: [
				{
					comment_id: "001",
					commenter: { id: "002", userName: "Opal_Tatertot" },
					body: "This is a comment on post 001"
				},
				{
					comment_id: "004",
					commenter: { id: "003", userName: "j.hypes" },
					body: "This is another comment on post 001"
				},
			]
		},
		{
			id: "002",
			title: "The second post!",
			author: {
				id: "001",
				userName: "wijohnst"
			},
			body: "This is the second blog post.",
			comments: [
				{
					comment_id: "002",
					commenter: { id: "002", userName: "Opal_Tatertot" },
					body: "This is a comment on post 002"
				},
			]
		},
		{
			id: "003",
			title: "The third post!",
			author: {
				id: "002",
				userName: "Opal_Tatertot"
			},
			body: "This is the third blog post.",
			comments: [
				{
					comment_id: "003",
					commenter: { id: "001", userName: "wijohnst" },
					body: "This is a comment on post 003"
				},
			]
		},
	]
})

server.get("/recipes", {
	//@ts-ignore
	recipes: [
		{
			id: "001",
			title: "Ice Water",
			author: {
				id: "001",
				userName: "wijohnst"
			},
			body: "Combine ice with water and serve."
		},
		{
			id: "002",
			title: "Steam",
			author: {
				id: "002",
				userName: "Opal_Tatertot"
			},
			body: "Heat water until gas and serve."
		}
	]
})

const App = () => {

	const [demo, setDemo] = React.useState('Recipes');

	return (
	<>
		{
			demo === 'Posts' && (
				<>	
					<Posts />
					<button onClick={() => setDemo('Recipes')}>Recipes Demo</button>
				</>
			)
		}
		{
			demo === 'Recipes' && (
				<>
					<Recipes />
					<button onClick={() => setDemo('Posts')}>Posts Demo</button>
				</>
			)		
		}
		</>
	)	
}

export default App;