<template>
	<button class="btn">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'blue-button',
})
</script>

<style scoped>
.btn {
	padding: 5px 15px;
	background: #005ff9;
	border: none;
	border-radius: 10px;
	transition: background 0.3s;
}
.btn:hover {
	cursor: pointer;
	background: #0147b7;
}
</style>
