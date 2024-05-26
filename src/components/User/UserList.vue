<template>
	<table class="user-table">
		<tr>
			<th>Имя и Фамилия пользователя</th>
			<th>Почта</th>
			<th>Номер телефона</th>
			<th>Роль</th>
			<th></th>
		</tr>
		<UserItem
			v-for="user in users"
			:key="user.id"
			:user="user"
			@delete-user="deleteUser"
			@edit-user="editUser"
		/>
	</table>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { User } from '../../types/User'
import UserItem from './UserItem.vue'

export default defineComponent({
	components: {
		UserItem,
	},
	props: {
		users: {
			type: (Object as PropType<User[]>) || null,
			required: true,
		},
	},
	methods: {
		deleteUser(user: User) {
			this.$emit('deleteUser', user)
		},
		editUser(selectedUser: User) {
			this.$emit('editUser', selectedUser)
		},
	},
	emits: {
		deleteUser: (user: User) => user,
		editUser: (selectedUser: User) => selectedUser,
	},
})
</script>

<style scoped>
.user-table {
	background: #2a2a2b;
	border-radius: 8px;
	border: 1px;
}
th {
	padding: 12px 24px 12px 24px;
	gap: 12px;
}
</style>
