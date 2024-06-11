<template>
	<div class="post-list">
		<PostItem
			v-for="post in posts"
			:key="post.id"
			:post="post"
			@edit-post="editPost"
			@delete-post="deletePost"
		/>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { usePostStore } from '../../store/PostStore'
import { Post } from '../../types/Post'
import PostItem from './PostItem.vue'

export default defineComponent({
	components: {
		PostItem,
	},
	setup() {
		const postStore = usePostStore()
		return {
			postStore,
		}
	},
	props: {
		posts: {
			type: (Object as PropType<Post[]>) || null,
			required: true,
		},
	},
	methods: {
		async editPost() {
			const postStore = usePostStore()
			await postStore.editPost(this.posts)
		},
		async deletePost() {
			const postStore = usePostStore()
			await postStore.deletePost(this.posts)
		},
	},
})
</script>

<style scoped>
.post-list {
	display: grid;
	grid-template-columns: auto auto auto;
	justify-content: start;
	grid-gap: 20px;
}
</style>
