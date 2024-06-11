import axios from 'axios'
import { defineStore } from 'pinia'
import { Post, PostData } from '../types/Post'

interface State {
	selectedPost: Post | null
	usersPosts: Post[]
	posts: Post[]
	postData: PostData
	postsCount: number
	isPostLoading: boolean
}

export const usePostStore = defineStore('post', {
	state: (): State => {
		return {
			selectedPost: null,
			usersPosts: [],
			posts: [],
			postData: { title: '', body: '' },
			postsCount: 0,
			isPostLoading: false,
		}
	},
	getters: {
		userPosts(state): Post[] | null {
			return state.posts
		},
	},
	actions: {
		async getUserPosts(userID: number | null) {
			try {
				const response = await axios.get(
					`https://dummyjson.com/posts/user/${userID}`
				)
				this.posts = await response.data.posts
			} catch (e) {
				alert('Не удалось получить записи текущего пользователя')
			}
		},
		async getUsersPosts() {
			try {
				const response = await axios.get(`https://dummyjson.com/posts?limit=0`)
				this.usersPosts = await response.data.posts
			} catch (e) {
				alert('Не удалось получить все записи пользователей')
			}
		},
		clearPostData(postData: PostData) {
			postData.title = ''
			postData.body = ''
		},
		async createPost(post: Post, userId: number | undefined) {
			try {
				const response = await axios.post(
					'https://dummyjson.com/posts/add',
					{
						title: post.title,
						body: post.body,
						tags: [],
						reactions: {
							likes: 0,
							dislikes: 0,
						},
						views: 0,
						userId: userId,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)

				if (this.postsCount === 0) {
					this.posts.push(response.data)
					this.postsCount = response.data.id
				} else {
					response.data.id = this.postsCount + 1
					this.postsCount += 1
					this.posts.push(response.data)
				}
			} catch (error) {
				alert('Не удалось авторизоваться. Повторите попытку.')
			}
		},
		async editPost(posts: Post[]) {
			try {
				const response = await axios.put(
					`https://dummyjson.com/posts/${this.selectedPost?.id}`,
					{
						title: this.postData.title,
						body: this.postData.body,
						tags: this.selectedPost?.tags,
						reactions: {
							likes: this.selectedPost?.reactions.likes,
							dislikes: this.selectedPost?.reactions.dislikes,
						},
						views: this.selectedPost?.views,
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				if (this.selectedPost) {
					const index = posts.findIndex(
						post => post.id == this.selectedPost?.id
					)
					if (index !== -1) {
						posts[index] = response.data
					}
				}
			} catch (error) {
				if (this.selectedPost) {
					Object.assign(this.selectedPost, this.postData)
					const index = posts.findIndex(
						post => post.id == this.selectedPost?.id
					)
					if (index !== -1) {
						posts[index] = this.selectedPost
					}
				}
			}
		},
		async deletePost(posts: Post[]) {
			if (posts === this.posts) {
				this.posts = this.posts.filter(
					post => post.id !== this.selectedPost?.id
				)
			}
			if (posts === this.usersPosts) {
				this.usersPosts = this.usersPosts.filter(
					post => post.id !== this.selectedPost?.id
				)
			}
		},
	},
})
