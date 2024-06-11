import axios from 'axios'
import { defineStore } from 'pinia'
import {
	User,
	UserAuthorizationData,
	UserData,
	userAuthData,
} from '../types/User'

interface State {
	UserLoginPassword: UserAuthorizationData
	userAuthData: userAuthData | null
	userFullData: User | null
	userData: UserData
	selectedUser: User | null
	users: User[]
	usersCount: number
}

export const useUserStore = defineStore('user', {
	state: (): State => {
		return {
			UserLoginPassword: { login: 'emilys', password: 'emilyspass' },
			userAuthData: null,
			userFullData: null,
			userData: {
				firstLastName: '',
				login: '',
				password: '',
				repeatedPassword: '',
			},
			selectedUser: null,
			users: [],
			usersCount: 0,
		}
	},
	getters: {
		isUserLoggedIn(state): boolean {
			return !!state.userAuthData
		},
		getUserEmail(state): string | null {
			return state.userFullData ? state.userFullData.email : null
		},
		getUserImage(state): string | null {
			return state.userFullData ? state.userFullData.image : null
		},
		getUserFullName(state): string | null {
			return state.userFullData
				? `${state.userFullData.firstName} ${state.userFullData.lastName}`
				: null
		},
		getUserRole(state): string | null {
			return state.userFullData ? state.userFullData.role : null
		},
		Users(state): User[] | null {
			return state.users
		},
	},
	actions: {
		async userLogin(UserAuthorizationData: UserAuthorizationData) {
			try {
				const response = await axios.post(
					'https://dummyjson.com/auth/login',
					{
						username: UserAuthorizationData.login,
						password: UserAuthorizationData.password,
						expiresInMins: 30, // optional, defaults to 60
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				this.userAuthData = response.data
			} catch (error) {
				alert('Не удалось авторизоваться. Повторите попытку.')
			}
		},
		userLogOut() {
			this.userAuthData = null
			this.UserLoginPassword = { login: '', password: '' }
			this.userFullData = null
		},
		async getUserFullData(authorizedUserToken: string | null) {
			try {
				const response = await axios.get('https://dummyjson.com/user/me', {
					headers: {
						Authorization: authorizedUserToken,
					},
				})
				this.userFullData = response.data
			} catch (error) {
				alert('Не удалось получить полную информацию о пользователе')
			}
		},
		async getUsers() {
			try {
				const response = await axios.get(`https://dummyjson.com/users?limit=0`)
				this.users = response.data.users
			} catch (e) {
				alert('Не удалось получить всех пользователей.')
			}
		},
		clearUserData(userData: UserData) {
			userData.firstLastName = ''
			userData.login = ''
			userData.password = ''
			userData.repeatedPassword = ''
		},
		async createUser(user: UserData) {
			try {
				const response = await axios.post(
					'https://dummyjson.com/users/add',
					{
						username: user.firstLastName.replace(' ', '').toLowerCase(),
						email: user.login,
						password: user.password,
						firstName: user.firstLastName.split(' ')[0],
						lastName: user.firstLastName.split(' ')[1]
							? user.firstLastName.split(' ')[1]
							: '',
						image: 'https://dummyjson.com/icon/samanthal/128',
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				response.data.role = 'user'
				if (this.usersCount === 0) {
					this.users.push(response.data)
					this.usersCount = response.data.id
				} else {
					response.data.id = this.usersCount + 1
					this.usersCount += 1
					this.users.push(response.data)
				}
			} catch (error) {
				alert('Не удалось создать пользователя. Повторите попытку.')
			}
		},
		async editUser() {
			try {
				const user = this.userData
				const response = await axios.put(
					`https://dummyjson.com/users/${this.selectedUser?.id}`,
					{
						email: user.login,
						password: user.password,
						firstName: user.firstLastName.split(' ')[0],
						lastName: user.firstLastName.split(' ')[1]
							? user.firstLastName.split(' ')[1]
							: '',
					},
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				)
				response.data.role = this.selectedUser?.role
				if (this.selectedUser) {
					const index = this.users.findIndex(
						user => user.id == this.selectedUser?.id
					)
					if (index !== -1) {
						this.users[index] = response.data
					}
				}
			} catch (error) {
				console.log(this.selectedUser)
				if (this.selectedUser) {
					console.log(this.userData)
					Object.assign(this.selectedUser, this.userData)
					console.log(this.selectedUser)
					this.selectedUser.password = this.userData.password
					const index = this.users.findIndex(
						user => user.id == this.selectedUser?.id
					)
					if (index !== -1) {
						this.users[index] = this.selectedUser
					}
				}
			}
		},
		async deleteUser() {
			this.users = this.users.filter(user => user.id !== this.selectedUser?.id)
		},
	},
})
