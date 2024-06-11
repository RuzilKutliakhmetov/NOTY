<template>
	<tr>
		<ui-modal-window @close="closeModalWindow" :show="isOpenModalWindow">
			<template #icon>
				<i class="pi pi-circle post-form-icon" style="font-size: 3rem" />
			</template>
			<template v-if="operationType === 'edit'" #title>
				Редактирование пользователя
			</template>
			<template v-if="operationType === 'edit'" #content>
				<UserForm />
			</template>
			<template v-if="operationType === 'edit'" #footer>
				<ui-button :buttonType="'primary'" @click="editUser()">
					Изменить
				</ui-button>
			</template>
			<template v-if="operationType === 'delete'" #title>
				Вы уверены, что хотите удалить пользователя
			</template>
			<template v-if="operationType === 'delete'" #footer>
				<ui-button :buttonType="'dark'" @click="closeModalWindow()">
					Отмена
				</ui-button>
				<ui-button :buttonType="'danger'" @click="deleteUser()">
					Удалить
				</ui-button>
			</template>
		</ui-modal-window>
		<td class="td-user-info">
			<ui-user-info>
				<template #image>
					<img class="user-info-el user-img" :src="`${user?.image}`" />
				</template>
				<template #fullname>{{
					user.firstName + ' ' + user.lastName
				}}</template>
				<template #email>{{ user.email }}</template>
			</ui-user-info>
		</td>
		<td>{{ user.username }}</td>
		<td>{{ user.password }}</td>
		<td>{{ userPostsCount }}</td>
		<td>{{ user.role }}</td>
		<td>
			<div class="table-buttons">
				<i
					class="pi pi-pencil table-button-edit"
					@click.stop="editUserButton(user)"
				/>
				<i
					class="pi pi-trash table-button-delete"
					@click.stop="deleteUserButton(user)"
				/>
			</div>
		</td>
	</tr>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { usePostStore } from '../../store/PostStore'
import { useUserStore } from '../../store/UserStore'
import { User } from '../../types/User'
import UserForm from './UserForm.vue'

interface State {
	userPostsCountData: number
	isOpenModalWindow: boolean
	operationType: string
}

export default defineComponent({
	components: {
		UserForm,
	},
	data(): State {
		return {
			userPostsCountData: 0,
			isOpenModalWindow: false,
			operationType: '',
		}
	},
	props: {
		user: {
			type: Object as PropType<User>,
			required: true,
		},
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
	computed: {
		userPostsCount(): string {
			return usePostStore()
				.usersPosts.filter(post => post.userId === this.user.id)
				.length.toString()
		},
	},

	methods: {
		closeModalWindow() {
			this.isOpenModalWindow = false
			useUserStore().clearUserData(useUserStore().userData)
		},
		editUserButton(user: User) {
			this.isOpenModalWindow = true
			this.operationType = 'edit'
			const userStore = useUserStore()
			userStore.selectedUser = user
			Object.assign(userStore.userData, user)
			userStore.userData.repeatedPassword = user.password
			userStore.userData.firstLastName = user.firstName + ' ' + user.lastName
			userStore.userData.login = user.email
		},
		editUser() {
			this.$emit('editUser')
			this.isOpenModalWindow = false
		},
		deleteUserButton(user: User) {
			this.isOpenModalWindow = true
			this.operationType = 'delete'
			useUserStore().selectedUser = user
		},
		deleteUser() {
			this.$emit('deleteUser', this.user)
			this.isOpenModalWindow = false
		},
	},
	emits: {
		deleteUser: (user: User) => user,
		editUser: null,
	},
})
</script>

<style scoped>
td {
	padding: 16px 24px 16px 24px;
	text-align: center;
}
.td-user-info {
	display: flex;
	align-items: center;

	gap: 10px;
}
.td-center {
	display: flex;
	justify-content: center;
}

.user-img {
	width: 40px;
	height: 40px;
	object-fit: cover;
	border: 1px solid white;
	border-radius: 50%;
	background: white;
}
.table-buttons {
	display: flex;
	gap: 15px;
}
.table-button-edit {
	font-size: 1.3rem;
	transition: all 0.3s;
}
.table-button-edit:hover {
	cursor: pointer;
	font-size: 1.3rem;
	color: #005ff9;
}
.table-button-delete {
	font-size: 1.3rem;
	transition: all 0.3s;
}
.table-button-delete:hover {
	cursor: pointer;
	font-size: 1.3rem;
	color: #f61f39;
}
</style>
