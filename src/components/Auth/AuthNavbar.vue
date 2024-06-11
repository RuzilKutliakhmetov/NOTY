<template>
	<div>
		<div v-if="!isUserLoggedIn">
			<ui-button :buttonType="'primary'" @click="openModalWindowLogin">
				Войти
			</ui-button>
			<ui-modal-window @close="closeModalWindow" :show="isOpenModalWindow">
				<template #icon>
					<i class="pi pi-lock auth-form-icon" style="font-size: 3rem" />
				</template>
				<template #title> Вход в систему </template>
				<template #content>
					<AuthForm />
				</template>
				<template #footer>
					<ui-button
						:buttonType="'primary'"
						@click="userLogin(userStore.UserLoginPassword)"
					>
						Войти
					</ui-button>
				</template>
			</ui-modal-window>
		</div>
		<div class="auth-user-info" v-if="isUserLoggedIn">
			<AuthUserInfo @log-out="logOut" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { usePostStore } from '../../store/PostStore'
import { useUserStore } from '../../store/UserStore'
import { UserAuthorizationData } from '../../types/User'
import AuthForm from './AuthForm.vue'
import AuthUserInfo from './AuthUserInfo.vue'

interface State {
	isOpenModalWindow: boolean
}

export default defineComponent({
	components: {
		AuthForm,
		AuthUserInfo,
	},
	data(): State {
		return {
			isOpenModalWindow: false,
		}
	},
	setup() {
		const userStore = useUserStore()
		return { userStore }
	},
	computed: {
		isUserLoggedIn() {
			return this.userStore.isUserLoggedIn
		},
	},
	methods: {
		openModalWindowLogin() {
			this.isOpenModalWindow = true
		},
		closeModalWindow() {
			this.isOpenModalWindow = false
		},
		async userLogin(userData: UserAuthorizationData) {
			const userStore = useUserStore()
			const postStore = usePostStore()
			await userStore.userLogin(userData)
			await userStore.getUserFullData(userStore.userAuthData?.token || null)
			await postStore.getUserPosts(userStore.userFullData?.id || null)
			if (userStore.getUserRole === 'admin') {
				await postStore.getUsersPosts()
				await userStore.getUsers()
			}
			this.isOpenModalWindow = false
		},
		logOut() {
			const userStore = useUserStore()
			userStore.userLogOut()
		},
	},
})
</script>

<style scoped>
.auth-user-info {
	display: flex;
	align-items: center;
}
</style>
