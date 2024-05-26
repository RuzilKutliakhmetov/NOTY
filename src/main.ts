import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import { createPinia } from 'pinia'
import components from './components/UI'
const app = createApp(App)

components.forEach(component => {
	if (component.name) {
		app.component(component.name, component)
	}
})

app.use(router).use(createPinia()).mount('#app')
