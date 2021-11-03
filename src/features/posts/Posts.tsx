import * as React from 'react'
import { useGetPostsQuery } from '../../app/services/posts';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Author, Comment } from '../../app/sharedTypes'

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
	const { entities: postEntities = {}, ids: postIds } = useAppSelector((state) => state.posts.posts);
	const { data, error, isLoading } = useGetPostsQuery(null);

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
								if (postEntities[postId]) {
									let targetPost = postEntities[postId];
									return (
										<Post>
											<PostTitle>{targetPost.title}</PostTitle>
											<PostSubtitle author={targetPost.author} />
											<PostBody>
												<p>{targetPost.body}</p>
											</PostBody>
											<Comments comments={targetPost.comments}/>
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
	author: Author, 
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

const Comments = ({ comments} : CommentsProps) => {

	const { entities: commentAuthors = {}, ids: commentAuthorIds } = useAppSelector((state) => state.posts.commentAuthors);
	;

	return (
		<CommentsWrapper>
			<PostTitle>Comments</PostTitle>
			{commentAuthors && comments.map(comment => {
				return (
					<CommentCard>
						"{comment.body}"
						<CommentAuthor>
							<span>- {commentAuthors[comment.commenter.commenter_id]?.userName}</span>
						</CommentAuthor>
					</CommentCard>
				)
			})}
		</CommentsWrapper>
	)
}
export default Posts;