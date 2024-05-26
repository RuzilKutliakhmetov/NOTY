<template>
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
					@click.stop="editPost"
				>
					Изменить
				</div>
				<div
					class="post-item-button post-item-delete-button"
					@click.stop="deletePost"
				>
					Удалить
				</div>
			</div>
			<div v-if="userStore.user && postStore.usersPosts">
				<div v-if="post.userId !== userStore.user.id">
					<!-- Вывод на экран пользователя поста{{ post.userId }} -->
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { usePostStore } from '../../store/PostStore'
import { useUserStore } from '../../store/UserStore'
import { Post } from '../../types/Post'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		const postStore = usePostStore()
		return {
			userStore,
			postStore,
		}
	},
	props: {
		post: {
			type: Object as PropType<Post>,
			required: true,
		},
	},
	methods: {
		deletePost() {
			this.$emit('deletePost', this.post)
		},
		editPost() {
			this.$emit('editPost', this.post)
		},
	},
	emits: {
		deletePost: (post: Post) => post,
		editPost: (post: Post) => post,
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
