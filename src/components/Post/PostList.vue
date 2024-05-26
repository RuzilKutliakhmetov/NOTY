<template>
	<div class="post-list">
		<PostItem
			v-for="post in posts"
			:key="post.id"
			:post="post"
			@delete-post="deletePost"
			@edit-post="editPost"
		/>
	</div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { Post } from '../../types/Post'
import PostItem from './PostItem.vue'

export default defineComponent({
	components: {
		PostItem,
	},
	props: {
		posts: {
			type: (Object as PropType<Post[]>) || null,
			required: true,
		},
	},
	methods: {
		deletePost(post: Post) {
			this.$emit('deletePost', post)
		},
		editPost(selectedNote: Post) {
			this.$emit('editPost', selectedNote)
		},
	},
	emits: {
		deletePost: (post: Post) => post,
		editPost: (selectedNote: Post) => selectedNote,
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
