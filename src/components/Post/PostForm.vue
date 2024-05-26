<template>
	<div class="post-form">
		<div class="post-form-center">
			<i class="pi pi-circle post-form-icon" style="font-size: 3rem" />
		</div>
		<div class="post-form-center">
			<h4 class="post-form-title" v-if="mode === 'createMode'">
				Новая заметка
			</h4>
			<h4 class="post-form-title" v-if="mode === 'updateMode'">
				Редактирование заметки
			</h4>
		</div>
		<div class="post-form-input">
			<label class="post-form-label" for="Заголовок">Заголовок</label>
			<my-input id="Заголовок" v-model.trim="post.title" type="text" />
		</div>
		<div class="post-form-input">
			<label class="post-form-label" for="Текст">Текст</label>
			<my-input id="Текст" v-model.trim="post.body" type="text" />
		</div>
		<div class="post-form-buttons">
			<black-button
				style="align-self: flex-end; margin-top: 15px"
				@click.self="CloseModalWindow"
			>
				Отмена
			</black-button>
			<blue-button
				v-if="mode === 'createMode'"
				style="align-self: flex-end; margin-top: 15px"
				@click="createPost"
			>
				Добавить
			</blue-button>
			<blue-button
				v-if="mode === 'updateMode'"
				style="align-self: flex-end; margin-top: 15px"
				@click="updatePost"
			>
				Изменить
			</blue-button>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { useUserStore } from '../../store/UserStore'
import { Post } from '../../types/Post'
import { User } from '../../types/User'

interface State {
	post: Post
}

export default defineComponent({
	data(): State {
		return {
			post: {
				id: 0,
				title: this.selectedPost.title,
				body: this.selectedPost.body,
				userId: 0,
			},
		}
	},
	setup() {
		const userStore = useUserStore()

		return {
			userStore,
		}
	},
	props: {
		postsCount: {
			type: Number,
			required: true,
		},
		mode: {
			type: String,
			required: true,
		},
		user: {
			type: Object as PropType<User>,
			required: true,
		},
		selectedPost: {
			type: Object as PropType<Post>,
			required: true,
		},
	},
	methods: {
		CloseModalWindow() {
			this.$emit('close')
		},
		createPost() {
			this.post.id = this.postsCount + 1
			const userStore = useUserStore()
			if (userStore.user) this.post.userId = userStore.user.id
			this.$emit('createPost', this.post)
			this.post = {
				id: 0,
				title: '',
				body: '',
				userId: 0,
			}
		},
		updatePost() {
			this.post.userId = this.selectedPost.userId
			this.post.id = this.selectedPost.id
			this.$emit('updatePost', this.post)
			this.post = {
				id: 0,
				title: '',
				body: '',
				userId: 0,
			}
		},
	},
	emits: {
		close: null,
		createPost: (post: Post) => post,
		updatePost: (post: Post) => post,
	},
})
</script>

<style scoped>
.post-form {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.post-form-center {
	display: flex;
	justify-content: center;
}
.post-form-icon {
	margin-bottom: 10px;
}
.post-form-title {
	line-height: 28px;
	font-size: 18px;
}
.post-form-input {
	margin-top: 5px;
	margin-bottom: 5px;
}
.post-form-label {
	margin-top: 5px;
	margin-bottom: 5px;
}
.post-form-buttons {
	display: flex;
	gap: 10px;
}
</style>
