<template>
	<ui-user-info>
		<template #image>
			<img class="user-info-el user-img" :src="userImage ? userImage : ''" />
		</template>
		<template #fullname>{{ userFullName }}</template>
		<template #email>{{ userEmail }}</template>
	</ui-user-info>
	<i class="pi pi-sign-out logout" @click.self="LogOut"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../../store/UserStore'
import UserInfo from '../UI/UserInfo.vue'

export default defineComponent({
	components: {
		UserInfo,
	},
	setup() {
		const userStore = useUserStore()
		return { userStore }
	},
	computed: {
		userFullName() {
			return this.userStore.getUserFullName
		},
		userEmail() {
			return this.userStore.getUserEmail
		},
		userImage() {
			return this.userStore.getUserImage
		},
	},
	methods: {
		LogOut() {
			this.$emit('LogOut')
		},
	},
	emits: {
		LogOut: null,
	},
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
.logout {
	font-size: 1.2rem;
	transition: color 0.3s;
}
.logout:hover {
	color: #005ff9;
	cursor: pointer;
}
</style>
