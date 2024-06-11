<template>
	<input :value="modelValue" @input="updateInput" class="input" type="text" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ui-input',
	props: {
		modelValue: [String, Number],
	},
	methods: {
		updateInput(event: Event) {
			this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
		},
	},
})
</script>

<style scoped>
.input {
	width: 100%;
	border-radius: 8px;
	padding: 10px 15px;
	color: #181819;
	margin-top: 5px;
}
</style>
