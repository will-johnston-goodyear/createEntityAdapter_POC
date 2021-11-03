import * as React from 'react';
import './App.css';
import { createServer } from 'miragejs'
//@ts-ignore
import Posts from './features/posts/Posts'

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
					commenter: { commenter_id: "002", userName: "Opal_Tatertot" },
					body: "This is a comment on post 001"
				},
				{
					comment_id: "004",
					commenter: { commenter_id: "003", userName: "j.hypes" },
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
					commenter: { commenter_id: "002", userName: "Opal_Tatertot" },
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
					commenter: { commenter_id: "001", userName: "wijohnst" },
					body: "This is a comment on post 003"
				},
			]
		},
	]
})

const App = () => {

	return <Posts />
}

export default App;