<template>
	<h1>PET-проект на Vue</h1>
	<h2 class="chapter-title">Описание:</h2>
	<p>
		PET-проект на Vue для работы с записями с реализованной авторизацией и
		управлением записями и пользователями. В качестве API используется
		dummyJSON.
	</p>
	<h2 class="chapter-title">Функциональность:</h2>
	<ul>
		<li>Авторизация пользователей</li>
		<li>Создание, просмотр, редактирование и удаление записей</li>
		<li>
			Управление пользователями (создание, просмотр, редактирование и удаление)
		</li>
	</ul>
	<h2 class="chapter-title">Технологии:</h2>
	<ul>
		<li>Vue</li>
		<li>TypeScript</li>
		<li>Pinia</li>
		<li>dummyJSON</li>
		<li>HTML/CSS</li>
	</ul>
	<h2 class="chapter-title">План разработки:</h2>
	<ol>
		<li>Настройка окружения разработки</li>
		<li>Реализация компонентов для авторизации и управления пользователями</li>
		<li>Разработка компонентов для работы с записями</li>
		<li>Интеграция с dummyJSON API</li>
		<li>Тестирование и отладка</li>
		<li>Деплой и запуск проекта</li>
	</ol>
	<div class="info">
		<div class="info-links">
			<a href="https://github.com/RuzilKutliakhmetov">
				<i class="pi pi-github icon-link" />
			</a>
			<a href="https://t.me/RuzilKutliakhmetov">
				<i class="pi pi-telegram icon-link" />
			</a>
			<i class="pi pi-inbox icon-link"> kutliakhmetovruzil@yandex.ru</i>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	setup() {
		return {}
	},
})
</script>

<style scoped>
.chapter-title,
.info {
	margin-top: 1rem;
}

.info-links {
	display: flex;
	gap: 1rem;
}
.icon-link {
	font-size: 1.5rem;
	transition: color 0.3s;
}
.pi-telegram:hover {
	color: #005ff9;
}
.pi-github:hover {
	color: #9b0bf5;
}
.info-email:hover,
.pi-inbox:hover {
	color: chocolate;
}
</style>
