<template>
	<div class="page-header">
		<div class="page-header-title"><slot name="title"></slot></div>
		<div class="page-header-buttons">
			<slot name="buttons"></slot>
		</div>
	</div>
	<div class="page-content">
		<slot name="content"></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ui-page',
	setup() {
		return {}
	},
})
</script>

<style scoped>
.page-header {
	display: flex;
	justify-content: space-between;
	flex-wrap: nowrap;
}
.page-header-title {
	font-size: 2.4rem;
	font-weight: 600;
}
.page-header-title:hover {
	cursor: default;
}
.page-header-buttons {
	max-width: 40%;
}
</style>
