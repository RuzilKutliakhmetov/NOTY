<template>
	<div v-if="!isUserLoggedIn">Необходимо войти</div>
	<div v-else>
		<ui-modal-window @close="closeModalWindow" :show="isOpenModalWindow">
			<template #icon>
				<i class="pi pi-circle post-form-icon" style="font-size: 3rem" />
			</template>
			<template #title> Зарегистрировать пользователя </template>
			<template #content>
				<UserForm />
			</template>
			<template #footer>
				<ui-button :buttonType="'primary'" @click="createUser(userData)">
					Зарегистрировать
				</ui-button>
			</template>
		</ui-modal-window>
		<ui-page>
			<template #title>Список пользователей</template>
			<template #buttons>
				<ui-button :buttonType="'primary'" @click="createUserButton">
					Зарегистрировать пользователя
					<i class="pi pi-plus" style="font-size: 0.7rem" />
				</ui-button>
			</template>
			<template #content>
				<UserList v-if="Users" :users="Users" />
			</template>
		</ui-page>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserForm from '../components/User/UserForm.vue'
import UserList from '../components/User/UserList.vue'
import { usePostStore } from '../store/PostStore'
import { useUserStore } from '../store/UserStore'
import { UserData } from '../types/User'

interface State {
	isOpenModalWindow: boolean
}

export default defineComponent({
	components: {
		UserList,
		UserForm,
	},
	setup() {
		const userStore = useUserStore()
		const postStore = usePostStore()
		return {
			userStore,
			postStore,
			userData: userStore.userData,
		}
	},

	data(): State {
		return {
			isOpenModalWindow: false,
		}
	},
	computed: {
		isUserLoggedIn() {
			return this.userStore.isUserLoggedIn
		},
		Users() {
			return this.userStore.Users
		},
	},
	methods: {
		closeModalWindow() {
			useUserStore().clearUserData(useUserStore().userData)
			this.isOpenModalWindow = false
		},
		createUserButton() {
			useUserStore().clearUserData(useUserStore().userData)
			this.isOpenModalWindow = true
		},
		createUser(userData: UserData) {
			useUserStore().createUser(userData)
			this.isOpenModalWindow = false
		},
	},
})
</script>

<style scoped></style>
