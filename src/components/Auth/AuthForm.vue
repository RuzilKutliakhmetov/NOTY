<template>
	<div class="auth-form">
		<div class="auth-form-input">
			<label class="auth-form-label" for="login">Логин</label>
			<ui-input id="login" v-model.trim="userLoginPassword.login" type="text" />
		</div>
		<div class="auth-form-input">
			<label class="auth-form-label" for="password">Пароль</label>
			<ui-input
				id="password"
				v-model.trim="userLoginPassword.password"
				type="password"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../../store/UserStore'

export default defineComponent({
	setup() {
		const userStore = useUserStore()
		return { userStore, userLoginPassword: userStore.UserLoginPassword }
	},
})
</script>

<style scoped>
.auth-form {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.auth-form-input {
	margin-bottom: 15px;
}
.auth-form-label {
	margin-top: 5px;
	margin-bottom: 5px;
}
</style>
