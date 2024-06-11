<template>
	<div class="form">
		<div class="form-input">
			<label class="form-label" for="Имя Фамилия">Имя Фамилия</label>
			<ui-input
				id="Имя Фамилия"
				v-model.trim="userData.firstLastName"
				type="text"
			/>
		</div>
		<div class="form-input">
			<label class="form-label" for="Логин">Логин (email)</label>
			<ui-input id="Логин" v-model.trim="userData.login" type="text" />
		</div>
		<div class="form-input">
			<label class="form-label" for="Пароль">Пароль</label>
			<ui-input id="Пароль" v-model.trim="userData.password" type="password" />
		</div>
		<div class="form-input">
			<label class="form-label" for="Повторите пароль">Повторите пароль</label>
			<ui-input
				id="Повторите пароль"
				v-model.trim="userData.repeatedPassword"
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
		return { userStore, userData: userStore.userData }
	},
})
</script>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}
.form-input {
	margin-top: 5px;
	margin-bottom: 5px;
}
.form-label {
	margin-top: 5px;
	margin-bottom: 5px;
}
</style>
