<template>
	<ui-modal-window @close="closeModalWindow" :show="isOpenModalWindow">
		<template #icon>
			<i class="pi pi-circle post-form-icon" style="font-size: 3rem" />
		</template>
		<template v-if="operationType === 'edit'" #title>
			Редактирование заметки
		</template>
		<template v-if="operationType === 'edit'" #content>
			<PostForm />
		</template>
		<template v-if="operationType === 'edit'" #footer>
			<ui-button :buttonType="'primary'" @click="editPost()">
				Изменить
			</ui-button>
		</template>
		<template v-if="operationType === 'delete'" #title>
			Вы уверены, что хотите удалить заметку
		</template>
		<template v-if="operationType === 'delete'" #footer>
			<ui-button :buttonType="'dark'" @click="closeModalWindow()">
				Отмена
			</ui-button>
			<ui-button :buttonType="'danger'" @click="deletePost()">
				Удалить
			</ui-button>
		</template>
	</ui-modal-window>
	<div class="post-item-form">
		<div class="post-item-body">
			<div class="post-item-title">
				{{ post.title }}
			</div>
			<div class="post-item-body">
				{{ post.body }}
			</div>
		</div>
		<div class="post-item-footer">
			<div class="post-item-buttons">
				<div
					class="post-item-button post-item-edit-button"
					@click.stop="editPostButton(post)"
				>
					Изменить
				</div>
				<div
					class="post-item-button post-item-delete-button"
					@click.stop="deletePostButton(post)"
				>
					Удалить
				</div>
			</div>
			<div class="user-info-el">
				<ui-user-info>
					<template #fullname>{{
						userInfo.firstName + ' ' + userInfo.lastName
					}}</template>
					<template #email>{{ userInfo.email }}</template>
				</ui-user-info>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { usePostStore } from '../../store/PostStore'
import { useUserStore } from '../../store/UserStore'
import { Post } from '../../types/Post'
import { User } from '../../types/User'
import PostForm from './PostForm.vue'

interface State {
	isOpenModalWindow: boolean
	operationType: string
}

export default defineComponent({
	components: {
		PostForm,
	},
	data(): State {
		return {
			isOpenModalWindow: false,
			operationType: '',
		}
	},
	setup() {
		const userStore = useUserStore()
		const postStore = usePostStore()
		return {
			userStore,
			postStore,
			postData: postStore.postData,
		}
	},
	props: {
		post: {
			type: Object as PropType<Post>,
			required: true,
		},
	},
	computed: {
		userInfo(): User {
			return useUserStore().users.filter(
				user => user.id === this.post.userId
			)[0]
		},
	},
	methods: {
		closeModalWindow() {
			this.isOpenModalWindow = false
			usePostStore().clearPostData(usePostStore().postData)
		},
		editPostButton(post: Post) {
			this.isOpenModalWindow = true
			this.operationType = 'edit'
			const postStore = usePostStore()
			postStore.selectedPost = post
			Object.assign(postStore.postData, post)
		},
		async editPost() {
			const postStore = usePostStore()
			this.$emit('editPost')
			// await postStore.editPost()
			postStore.clearPostData(postStore.postData)
			this.isOpenModalWindow = false
		},
		deletePostButton(post: Post) {
			this.isOpenModalWindow = true
			this.operationType = 'delete'
			const postStore = usePostStore()
			postStore.selectedPost = post
		},
		async deletePost() {
			this.$emit('deletePost')
			this.isOpenModalWindow = false
			// await usePostStore().deletePost(post)
		},
	},
	emits: {
		editPost: null,
		deletePost: null,
	},
})
</script>

<style scoped>
.post-item-footer {
	display: flex;
	justify-content: space-between;
}
.post-item-title {
	font-size: 24px;
	line-height: 32px;
}
.post-item-body {
	font-size: 16px;
	line-height: 24px;
	color: #9a9a9a;
}
.post-item-form {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	flex-wrap: nowrap;
	height: 450px;
	width: 384px;
	background: #2a2a2b;
	border-radius: 12px;
	padding: 24px 24px 32px 24px;
}
.post-item-buttons {
	display: flex;
	justify-content: flex-start;
	gap: 20px;
}
.post-item-button {
	font-size: 16px;
	line-height: 24px;
}
.post-item-delete-button {
	color: #f61f39;
	transition: color 0.3s;
}
.post-item-delete-button:hover {
	cursor: pointer;
	color: #bd1629;
}
.post-item-edit-button {
	color: #ffffff;
	transition: color 0.3s;
}
.post-item-edit-button:hover {
	cursor: pointer;
	color: #989898;
}
</style>
