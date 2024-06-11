<template>
	<div v-if="show" class="modal-window" @click.self="closeModalWindow">
		<div @click.stop class="modal-window-content">
			<div class="modal-window-form">
				<div class="modal-window-form-icon">
					<slot name="icon"></slot>
				</div>
				<div class="modal-window-form-title">
					<h2><slot name="title"></slot></h2>
				</div>
				<slot name="content"></slot>
				<div class="modal-window-form-footer">
					<slot name="footer"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	name: 'ui-modal-window',
	props: {
		show: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		closeModalWindow() {
			this.$emit('close')
		},
	},
	emits: {
		close: null,
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

.modal-window-content {
	margin: auto;
	background: #2a2a2b;
	border-radius: 12px;
	min-height: 0px;
	min-width: 408px;
	padding: 24px;
}

.modal-window-form {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.modal-window-form-center {
	display: flex;
	justify-content: center;
}
.modal-window-form-icon,
.modal-window-form-title {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
}
.modal-window-form-footer {
	margin-top: 1rem;
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	gap: 0.5rem;
}
</style>
