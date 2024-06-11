<template>
	<div class="header">
		<div class="navbar-router">
			<router-link class="router-element noty" to="/">NOTY</router-link>
			<router-link
				v-if="userStore.userFullData"
				class="router-element"
				to="/userpost"
				>Мои заметки
			</router-link>
			<router-link
				v-if="userStore.userFullData && userStore.userFullData.role === 'admin'"
				class="router-element"
				to="/usersposts"
				>Заметки пользователей
			</router-link>
			<router-link
				v-if="
					userStore.userFullData && userStore.userFullData?.role === 'admin'
				"
				class="router-element"
				to="/users"
				>Пользователи
			</router-link>
		</div>
		<AuthNavbar class="auth-info" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '../store/UserStore'
import AuthNavbar from './Auth/AuthNavbar.vue'

export default defineComponent({
	components: {
		AuthNavbar,
	},
	setup() {
		const userStore = useUserStore()
		return {
			userStore,
		}
	},
})
</script>

<style scoped>
.auth-info {
	display: flex;
	align-items: center;
}

.header {
	padding: 0 10% 0 10%;
	margin-bottom: 50px;
	height: 80px;
	border-bottom: 1px solid rgb(50, 49, 49);
	display: flex;
	justify-content: space-between;
}
.navbar-router {
	display: flex;
	justify-content: flex-start;
	flex-wrap: nowrap;
	align-items: center;
}

.router-element {
	transition: color 0.3s;
	text-decoration: none;
	margin-right: 2rem;
}
.router-element:hover {
	color: #005ff9;
	cursor: pointer;
}
.noty {
	margin-right: 2.5rem;
	font-size: 1.4rem;
	font-weight: bold;
}
</style>
