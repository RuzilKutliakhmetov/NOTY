<template>
	<button v-if="buttonType === primaryButton" class="btn btn-primary">
		<slot></slot>
	</button>
	<button v-else-if="buttonType === dangerButton" class="btn btn-danger">
		<slot></slot>
	</button>
	<button v-else-if="buttonType === successButton" class="btn btn-success">
		<slot></slot>
	</button>
	<button v-else-if="buttonType === lightButton" class="btn btn-light">
		<slot></slot>
	</button>
	<button v-else-if="buttonType === darkButton" class="btn btn-dark">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface State {
	primaryButton: string
	dangerButton: string
	successButton: string
	lightButton: string
	darkButton: string
}
export default defineComponent({
	name: 'ui-button',
	props: {
		buttonType: {
			type: String,
			required: true,
		},
	},
	data(): State {
		return {
			primaryButton: 'primary',
			dangerButton: 'danger',
			successButton: 'success',
			lightButton: 'light',
			darkButton: 'dark',
		}
	},
})
</script>

<style scoped>
.btn {
	width: 100%;
	margin: 0.25rem 0.125rem;
	padding: 0.375rem 0.75rem;
	line-height: 1.5;
	font-size: 1rem;
	font-weight: 400;
	border: none;
	border-radius: 0.25rem;
	transition: background-color 0.3s ease-in-out;
}
.btn:hover {
	cursor: pointer;
}
.btn-primary {
	color: #fff;
	background-color: #0d6efd;
}
.btn-primary:hover {
	background-color: #0b5ed7;
}
.btn-success {
	color: #fff;
	background-color: #198754;
}
.btn-success:hover {
	background-color: #157347;
}
.btn-danger {
	color: #fff;
	background-color: #dc3545;
}
.btn-danger:hover {
	background-color: #bb2d3b;
}
.btn-light {
	color: #000;
	background-color: #f8f9fa;
}
.btn-light:hover {
	background-color: #cbcbcb;
}
.btn-dark {
	color: #fff;
	background-color: #181819;
}
.btn-dark:hover {
	background-color: #000000;
}
</style>
