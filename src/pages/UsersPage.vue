<template>
	<div v-if="!userStore.user">Необходимо войти</div>
	<div v-else>
		<div class="page-header">
			<div class="page-name">Список пользователей</div>
		</div>
		<div v-if="userStore.users">
			<UserList
				:users="userStore.users"
				@delete-user="deleteUser"
				@edit-user="editUserButton"
				v-if="!isUsersLoading"
			/>
			<div v-else>Идет загрузка...</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import UserList from '../components/User/UserList.vue'
import { usePostStore } from '../store/PostStore'
import { useUserStore } from '../store/UserStore'
import { User } from '../types/User'

interface State {
	postsCount: number
	selectedUser: User
	modalWindowVisible: boolean
	isUsersLoading: boolean
	mode: string
}

export default defineComponent({
	components: {
		UserList,
	},
	setup() {
		const userStore = useUserStore()
		const postStore = usePostStore()

		watch(
			() => userStore.user,
			(newUser, oldUser) => {
				console.log('userStore.user изменился:', newUser, oldUser)
				if (newUser) {
					const postStore = usePostStore()
					const userStore = useUserStore()
					if (userStore.user) postStore.getUserPosts(userStore.user)
					if (userStore.user?.role === 'admin') {
						userStore.getUsers()
						postStore.getUsersPosts()
					}
				}
			},
			{ deep: true }
		)
		return {
			userStore,
			postStore,
		}
	},
	data(): State {
		return {
			postsCount: 0,
			selectedUser: {
				id: 0,
				firstName: '',
				lastName: '',
				gender: '',
				email: '',
				phone: '',
				login: '',
				password: '',
				image: '',
				username: '',
				token: '',
				status: '',
				role: '',
			},
			modalWindowVisible: false,
			isUsersLoading: false,
			mode: '',
		}
	},
	methods: {
		deleteUser(selectedUser: User) {
			const userStore = useUserStore()
			if (userStore.users) {
				userStore.users = userStore.users.filter(
					(user: User) => user.id !== selectedUser.id
				)
			}
		},
		editUserButton(user: User) {
			this.selectedUser = user
			this.mode = 'updateMode'
			this.modalWindowVisible = true
		},
		editUser(editedUser: User) {
			const userStore = useUserStore()
			if (userStore.users) {
				const index = userStore.users.findIndex(
					user => user.id === editedUser.id
				)
				if (index !== -1) {
					userStore.users[index] = editedUser
				}
			}
			this.modalWindowVisible = false
		},
	},
})
</script>

<style scoped></style>
