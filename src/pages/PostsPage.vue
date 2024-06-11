<template>
	<div v-if="!isUserLoggedIn">Необходимо войти</div>
	<div v-else>
		<ui-modal-window @close="closeModalWindow" :show="isOpenModalWindow">
			<template #icon>
				<i class="pi pi-circle post-form-icon" style="font-size: 3rem" />
			</template>
			<template #title> Новая заметка </template>
			<template #content>
				<PostForm />
			</template>
			<template #footer>
				<ui-button :buttonType="'primary'" @click="createPost(postData)">
					Добавить
				</ui-button>
			</template>
		</ui-modal-window>
		<ui-page>
			<template #title>Мои заметки</template>
			<template #buttons>
				<ui-button :buttonType="'primary'" @click="createPostButton">
					Новая заметка <i class="pi pi-plus" style="font-size: 0.7rem" />
				</ui-button>
			</template>
			<template #content>
				<PostList v-if="userPosts" :posts="userPosts" />
			</template>
		</ui-page>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PostForm from '../components/Post/PostForm.vue'
import PostList from '../components/Post/PostList.vue'
import { usePostStore } from '../store/PostStore'
import { useUserStore } from '../store/UserStore'
import { Post, PostData } from '../types/Post'

interface State {
	post: Post
	isOpenModalWindow: boolean
	isPostsLoading: boolean
}

export default defineComponent({
	components: {
		PostList,
		PostForm,
	},
	data(): State {
		return {
			post: {
				id: 0,
				title: '',
				body: '',
				tags: [],
				reactions: {
					likes: 0,
					dislikes: 0,
				},
				views: 0,
				userId: 0,
			},
			isOpenModalWindow: false,
			isPostsLoading: false,
		}
	},
	setup() {
		const userStore = useUserStore()
		const postStore = usePostStore()
		return {
			userStore,
			postStore,
			postData: postStore.postData,
			postsCount: postStore.postsCount,
		}
	},
	computed: {
		isUserLoggedIn() {
			return this.userStore.isUserLoggedIn
		},
		userPosts() {
			return this.postStore.userPosts
		},
	},
	methods: {
		closeModalWindow() {
			this.isOpenModalWindow = false
			usePostStore().clearPostData(usePostStore().postData)
		},
		createPostButton() {
			this.isOpenModalWindow = true
		},
		createPost(postData: PostData) {
			usePostStore().createPost(
				Object.assign(this.post, postData),
				useUserStore().userFullData?.id
			)
			usePostStore().clearPostData(postData)
			this.isOpenModalWindow = false
		},
	},
})
</script>

<style scoped></style>
