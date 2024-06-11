<template>
	<table class="user-table">
		<tr>
			<th>Основная информация</th>
			<th>Имя пользователя</th>
			<th>Пароль</th>
			<th>Кол-во заметок</th>
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
import { useUserStore } from '../../store/UserStore'
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
		async editUser() {
			await useUserStore().editUser()
		},
		async deleteUser() {
			await useUserStore().deleteUser()
		},
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
