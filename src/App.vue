<template>
	<Navbar />
	<div class="body"><router-view></router-view></div>
</template>

<script lang="ts">
import 'primeicons/primeicons.css'
import { defineComponent } from 'vue'
import Navbar from './components/Navbar.vue'

export default defineComponent({
	name: 'App',
	components: {
		Navbar,
	},
})
</script>
<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	color: beige;
}
body {
	background: #181819;
}
.body {
	margin: 0 10% 0 10%;
}
.page-name {
	font-size: 2.4rem;
	font-weight: 500;
}
.page-name:hover {
	cursor: default;
}
.page-header {
	display: flex;
	justify-content: space-between;
	margin-bottom: 2rem;
}
</style>
