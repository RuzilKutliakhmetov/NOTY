<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'black-button',
})
</script>

<style scoped>
.btn {
	padding: 5px 15px;
	background: #181819;
	border: none;
	border-radius: 10px;
	transition: background 0.3s;
}
.btn:hover {
	cursor: pointer;
	background: #000000;
}
</style>
