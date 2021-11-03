export interface Author {
	id: string,
	userName: string,
}

export interface Commenter {
	commenter_id: string,
	userName: string,
}

export interface Comment {
	comment_id: string,
	commenter: Commenter,
	body: string,
}

export interface Post {
	id: string,
	title: string,
	author: Author
	body: string,
	comments: Comment[],
}

interface NormalizedStateItem {
	entities?: { [key: string]: any },
	ids?: Array<string>
}

// Normalized State
export interface NormalizedPostsState {
	[key: string] : NormalizedStateItem
}