import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Post } from '../types/Post'
import { User } from '../types/User'

export const usePostStore = defineStore('post', {
	state: () => ({
		usersPosts: null as Post[] | null,
		posts: null as Post[] | null,
		postsCount: ref(0),
		isPostLoading: false,
	}),
	getters: {},
	actions: {
		async getUserPosts(loggedUser: User) {
			if (loggedUser) {
				try {
					const response = await axios.get(
						`https://dummyjson.com/posts/user/${loggedUser.id}`
					)
					this.posts = await response.data.posts
				} catch (e) {
					alert('Не удалось получить записи текущего пользователя')
				}
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
		deletePost(selectedPost: Post) {
			if (this.posts) {
				this.posts = this.posts.filter(
					(post: Post) => post.id !== selectedPost.id
				)
			}
		},
		editPost(selectedPost: Post) {
			if (this.posts) {
				const index = this.posts.findIndex(post => post.id === selectedPost.id)
				if (index !== -1) {
					this.posts[index] = selectedPost
				}
			}
		},
		createPost(post: Post) {
			if (this.posts) {
				this.posts.push(post)
				this.postsCount += 1
			}
		},
	},
})
