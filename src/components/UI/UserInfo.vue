<template>
	<slot class="user-img" name="image"></slot>
	<div class="user-info-el">
		<div class="user-fullname"><slot name="fullname"></slot></div>
		<div class="user-email"><slot name="email"></slot></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ui-user-info',
})
</script>

<style scoped>
.user-info-el {
	margin-right: 0.6rem;
}
.user-img {
	width: 40px;
	height: 40px;
	object-fit: cover;
	border: 1px solid white;
	border-radius: 50%;
	background: white;
}
.user-fullname:hover {
	cursor: default;
}
.user-email {
	font-size: 0.7rem;
	color: #606063;
}
.user-email:hover {
	cursor: default;
}
</style>
