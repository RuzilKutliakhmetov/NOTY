<template>
	<div v-if="!userStore.user">Необходимо войти</div>

	<div v-else>
		<div class="page-header">
			<div class="page-name">Ваши заметки</div>
			<blue-button @click="createPostButton">
				Новая заметка <i class="pi pi-plus" style="font-size: 0.7rem" />
			</blue-button>
		</div>
		<my-modal-window v-model:show="modalWindowVisible">
			<PostForm
				:mode="mode"
				:user="userStore.user"
				:selected-post="selectedPost"
				:posts-count="postsCount"
				@close="closeForm"
				@create-post="createPost"
				@update-post="editPost"
			/>
		</my-modal-window>
		<div v-if="postStore.posts">
			<PostList
				:posts="postStore.posts"
				@delete-post="deletePost"
				@edit-post="editPostButton"
				v-if="!isPostsLoading"
			/>
			<div v-else>Идет загрузка...</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import PostForm from '../components/Post/PostForm.vue'
import PostList from '../components/Post/PostList.vue'
import { usePostStore } from '../store/PostStore'
import { useUserStore } from '../store/UserStore'
import { Post } from '../types/Post'

interface State {
	postsCount: number
	selectedPost: Post
	modalWindowVisible: boolean
	isPostsLoading: boolean
	mode: string
}

export default defineComponent({
	components: {
		PostList,
		PostForm,
	},
	setup() {
		const userStore = useUserStore()
		const postStore = usePostStore()

		watch(
			() => userStore.user,
			(newUser, oldUser) => {
				console.log('userStore.user изменился:', newUser, oldUser)
				if (newUser) {
					const postStore = usePostStore()
					const userStore = useUserStore()
					if (userStore.user) postStore.getUserPosts(userStore.user)
					if (userStore.user?.role === 'admin') {
						userStore.getUsers()
						postStore.getUsersPosts()
					}
				}
			},
			{ deep: true }
		)

		return {
			userStore,
			postStore,
		}
	},
	data(): State {
		return {
			postsCount: 0,
			selectedPost: { id: 0, title: '', body: '', userId: 0 },
			modalWindowVisible: false,
			isPostsLoading: false,
			mode: '',
		}
	},
	methods: {
		closeForm() {
			this.modalWindowVisible = false
		},
		deletePost(selectedPost: Post) {
			const postStore = usePostStore()
			if (postStore.posts) {
				postStore.posts = postStore.posts.filter(
					(post: Post) => post.id !== selectedPost.id
				)
			}
		},
		editPostButton(post: Post) {
			this.selectedPost = post
			this.mode = 'updateMode'
			this.modalWindowVisible = true
		},
		editPost(editedPost: Post) {
			const postStore = usePostStore()
			if (postStore.posts) {
				const index = postStore.posts.findIndex(
					post => post.id === editedPost.id
				)
				if (index !== -1) {
					postStore.posts[index] = editedPost
				}
			}

			this.modalWindowVisible = false
		},
		createPostButton() {
			this.mode = 'createMode'
			this.modalWindowVisible = true
		},
		createPost(post: Post) {
			const postStore = usePostStore()
			if (postStore.posts) {
				postStore.posts.push(post)
				this.postsCount += 1
			}

			this.modalWindowVisible = false
		},
	},
})
</script>

<style scoped></style>
