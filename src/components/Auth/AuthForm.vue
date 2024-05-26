<template>
	<div class="auth-form">
		<div class="auth-form-center">
			<i class="pi pi-lock auth-form-icon" style="font-size: 3rem" />
		</div>
		<div class="auth-form-center">
			<h4>Войти</h4>
		</div>
		<div class="auth-form-input">
			<label class="auth-form-label" for="Логин">Заголовок</label>
			<my-input id="Логин" v-model.trim="userAuthData.login" type="text" />
		</div>
		<div class="auth-form-input">
			<label class="auth-form-label" for="Пароль">Пароль</label>
			<my-input
				id="Пароль"
				v-model.trim="userAuthData.password"
				type="password"
			/>
		</div>
		<blue-button @click="authUserFunction"> Войти </blue-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserAuthData } from '../../types/UserAuthData'

interface State {
	userAuthData: UserAuthData
}

export default defineComponent({
	data(): State {
		return {
			userAuthData: {
				login: 'emilys',
				password: 'emilyspass',
			},
			// userAuthData: {
			// 	login: 'alexanderj',
			// 	password: 'alexanderjpass',
			// },
		}
	},
	methods: {
		authUserFunction() {
			this.$emit('authUserFunction', this.userAuthData)
		},
	},
	emits: {
		authUserFunction: (userAuthData: UserAuthData) => userAuthData,
	},
})
</script>

<style scoped>
.auth-form {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.auth-form-center {
	display: flex;
	justify-content: center;
}
.auth-form-icon {
	margin-bottom: 10px;
}
.auth-form-title {
	line-height: 28px;
	font-size: 18px;
}
.auth-form-input {
	/* margin-top: 5px; */
	margin-bottom: 15px;
}
.auth-form-label {
	margin-top: 5px;
	margin-bottom: 5px;
}
.auth-form-buttons {
	display: flex;
}
</style>
