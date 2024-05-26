import axios from 'axios'
import { defineStore } from 'pinia'
import { User } from '../types/User'
import { UserAuthData } from '../types/UserAuthData'

export const useUserStore = defineStore('user', {
	state: () => ({
		user: null as User | null,
		users: null as User[] | null,
		isUserLogged: false,
	}),
	getters: {
		loggedIn(state): boolean {
			return !!state.user
		},
		userEmail(state): string | null {
			return state.user ? state.user.email : null
		},
		userFullName(state): string | null {
			return state.user
				? `${state.user.firstName} ${state.user.lastName}`
				: null
		},
	},
	actions: {
		async authUser(userAuthData: UserAuthData) {
			try {
				const response = await axios.post(
					'https://dummyjson.com/auth/login',
					{
						username: userAuthData.login,
						password: userAuthData.password,
						expiresInMins: 30, // optional, defaults to 60
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				this.user = await response.data
				this.isUserLogged = true
				if (this.user) {
					if (response.data.gender === 'female') this.user.role = 'admin'
					else this.user.role = 'user'
				}
			} catch (error) {
				alert('Не удалось получить запись.')
			}
		},
		logOut() {
			this.user = null
			this.isUserLogged = false
		},
		async getUsers() {
			try {
				const response = await axios.get(`https://dummyjson.com/users?limit=0`)
				this.users = await response.data.users
			} catch (e) {
				alert('Не удалось получить все записи пользователей')
			}
		},
	},
})
