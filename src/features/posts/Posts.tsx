import * as React from 'react'
import { useGetPostsQuery } from '../../app/services/posts';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { User, Comment, NormalizedComment } from '../../app/sharedTypes'

import { addPosts } from './postsSlice';

const Status = styled.span`
	font-size: 2rem;
`
const PostsWrapper = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Post = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
	margin: 2rem;
	padding: 2rem;
	border: dashed thin white;
`

const PostTitle = styled.span`
	font-size: 2rem;
	font-weight: 900;
`

const PostBody = styled.section`
	width: 50%;
	padding: 1rem;
	border: solid thin white;
	margin: 0 1rem 1rem 1rem;
	font-size: 1.5rem;
`
const Posts = () => {

	const dispatch = useAppDispatch()
	const { entities: postEntities = {}, ids: postIds } = useAppSelector((state) => state.posts);
	const { data, error, isLoading } = useGetPostsQuery(null);

	/* 
		Listens for changes to data and sends to `postsSlice`. The `data` returned from the query hook is normalized before it is passed to the cache / the component layer. 
	*/
	React.useEffect(() => {
		if (data) {
			dispatch(addPosts(data))
		}
	}, [data])
	
	return (
		<>
			{
				isLoading && (
					<Status>Fetching Data</Status>
				)
			}
			{
				data && (
					<PostsWrapper>
						{postIds?.length && (
							postIds.map(postId => {
								if (postEntities.posts[postId]) {
									let targetPost = postEntities.posts[postId];
									return (
										<Post key={postId}>
											<PostTitle>{targetPost.title}</PostTitle>
											{/* 
												Instead of targeting the authors instance on `targetPost.author` (which is now just a key), we reference that key in the `users` lookup table. This decoupling is the goal of Normalized State. 
											*/}
											<PostSubtitle author={postEntities.users[targetPost.author]} />
											<PostBody>
												<p>{targetPost.body}</p>
											</PostBody>
											<Comments
												comments={targetPost.comments.map((commentKey: string) => (postEntities.comments[commentKey]))}
											/>
										</Post>
									)
								}
							})
						)}
					</PostsWrapper>
				)
			}
			{
				error && (
					<Status>Something went wrong...</Status>
				)
			}
		</>
	)
}

type SubtitleProps = {
	author: User, 
}

const SubtitleWrapper = styled.div`
	display: flex;
	border: solid thin white;
	padding: 1rem;
	justify-content: space-between;
	width: 50%;
	margin: 1rem;
`
const PostSubtitle = ({ author } : SubtitleProps) => {

	const date = new Date();

	const dateString = `${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}`
	return (
		<SubtitleWrapper>
			<span>By : {author.userName}</span>
			<span>{ dateString }</span>
		</SubtitleWrapper>
	)
}

const CommentsWrapper = styled.section`
	width: 50%;
	padding: 1rem;
	border: solid thin white;
`
const CommentCard = styled.div`
	border: solid thin white;
	font-size: 1.5rem;
	padding: 1rem;
	margin: 1rem 0 0 1rem;
`

const CommentAuthor = styled.span`
	margin-top: 1rem;
	margin-left: 1rem;
	font-size: 1rem;
`
type CommentsProps = {
	comments: Comment[],
}

const Comments = ({ comments }: CommentsProps) => {

	const { entities : postEntities } = useAppSelector(state => state.posts)
	return (
		<CommentsWrapper>
			<PostTitle>Comments</PostTitle>
			{comments.map(comment => {
				return (
					<CommentCard key={comment.comment_id}>
						"{comment.body}"
						<CommentAuthor>
							{/*@ts-ignore*/}
							<span>- {postEntities.users[comment.commenter].userName} </span>
						</CommentAuthor>
					</CommentCard>
				)
			})}
		</CommentsWrapper>
	)
}
export default Posts;