<template>
	<div class="form">
		<div class="form-input">
			<label class="form-label" for="Заголовок">Заголовок</label>
			<ui-input id="Заголовок" v-model.trim="postData.title" type="text" />
		</div>
		<div class="form-input">
			<label class="form-label" for="Текст">Текст</label>
			<ui-input id="Текст" v-model.trim="postData.body" type="text" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePostStore } from '../../store/PostStore'

export default defineComponent({
	setup() {
		const postStore = usePostStore()
		return { postStore, postData: postStore.postData }
	},
})
</script>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.form-input {
	margin-top: 5px;
	margin-bottom: 5px;
}
.form-label {
	margin-top: 5px;
	margin-bottom: 5px;
}
</style>
