<template>
	<div>
		<div v-if="!loggedInLocal">
			<blue-button @click="Login"> Войти </blue-button>
			<my-modal-window v-model:show="modalWindowVisible">
				<AuthForm @auth-user-function="authUserFunction" />
			</my-modal-window>
		</div>
		<div class="auth-user-info" v-if="loggedInLocal">
			<AuthUserInfo @log-out="LogOut" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../../store/UserStore'
import { UserAuthData } from '../../types/UserAuthData'
import AuthForm from './AuthForm.vue'
import AuthUserInfo from './AuthUserInfo.vue'

interface State {
	modalWindowVisible: boolean
	loggedInLocal: boolean
}

export default defineComponent({
	components: {
		AuthForm,
		AuthUserInfo,
	},
	data(): State {
		return {
			modalWindowVisible: false,
			loggedInLocal: false,
		}
	},
	setup() {
		const userStore = useUserStore()
		return {
			loggedUser: userStore.user,
			loggedIn: userStore.loggedIn,
		}
	},
	methods: {
		Login() {
			this.modalWindowVisible = true
		},
		async authUserFunction(userData: UserAuthData) {
			const userStore = useUserStore()
			await userStore.authUser(userData)
			this.modalWindowVisible = false
			this.loggedInLocal = true
		},
		LogOut() {
			const userStore = useUserStore()
			userStore.logOut()
			this.loggedInLocal = false
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
