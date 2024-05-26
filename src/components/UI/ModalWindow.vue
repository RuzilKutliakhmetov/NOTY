<template>
	<div class="modal-window" v-if="show">
		<div @click.stop class="modal-window__content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'my-modal-window',
	props: {
		show: {
			type: Boolean,
			required: true,
		},
	},
})
</script>

<style scoped>
.modal-window {
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	position: fixed;
	display: flex;
}

.modal-window__content {
	margin: auto;
	background: #2a2a2b;
	border-radius: 12px;
	min-height: 256px;
	min-width: 408px;
	padding: 24px;
}
</style>
