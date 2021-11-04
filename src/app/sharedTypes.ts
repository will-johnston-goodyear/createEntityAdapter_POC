export interface User {
	id: string,
	userName: string,
}
export interface Comment {
	comment_id: string,
	commenter: User,
	body: string,
}

export interface Post {
	id: string,
	title: string,
	author: User,
	body: string,
	comments: Comment[],
}

export interface NormalizedStateItem {
	entities?: { [key: string]: any },
	ids?: Array<string>
}

// Normalized State
export interface NormalizedPostsState {
	[key: string] : NormalizedStateItem
}
export interface NormalizedComment {
	[key: string]: {
		comment_id: string,
		commenter: string,
		body: string,
	}
}

export interface Recipe {
	id: string,
	title: string,
	author: User,
	body: string, 
}