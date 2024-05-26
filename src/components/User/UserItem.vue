<template>
	<tr>
		<td class="td-user-info">
			<img class="user-info-el user-img" :src="`${user?.image}`" />
			<div>{{ user.firstName }} {{ user.lastName }}</div>
		</td>
		<td>
			{{ user.email }}
		</td>
		<td>
			{{ user.phone }}
		</td>
		<td>
			{{ user.role }}
		</td>
		<td>
			<div class="table-buttons">
				<i class="pi pi-pencil table-button-edit" @click.stop="editUser" />
				<i class="pi pi-trash table-button-delete" @click.stop="deleteUser" />
			</div>
		</td>
	</tr>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { User } from '../../types/User'

export default defineComponent({
	props: {
		user: {
			type: Object as PropType<User>,
			required: true,
		},
	},
	methods: {
		deleteUser() {
			this.$emit('deleteUser', this.user)
		},
		editUser() {
			this.$emit('editUser', this.user)
		},
	},
	emits: {
		deleteUser: (user: User) => user,
		editUser: (user: User) => user,
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
