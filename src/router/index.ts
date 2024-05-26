import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import PostsPage from '../pages/PostsPage.vue'
import UsersPage from '../pages/UsersPage.vue'
import UsersPostsPage from '../pages/UsersPostsPage.vue'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'PostsPage',
		component: PostsPage,
	},
	{
		path: '/usersposts',
		name: 'UsersPostsPage',
		component: UsersPostsPage,
	},
	{
		path: '/users',
		name: 'UserPage',
		component: UsersPage,
	},
]
export const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
})
