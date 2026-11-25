<script setup>
import { onMounted, ref } from 'vue';
import ItemList from '../components/ItemList.vue';
import PageSection from '../components/PageSection.vue';
import { getCourses } from '../api.js';
import { readList } from '../storage.js';
const props = defineProps({ items: { type: Array, required: true } });
const items = ref(props.items);
const favorites = ref(readList('eduPlatform.favorites'));
const status = ref('');
onMounted(async () => {
  try { items.value = await getCourses(); }
  catch { status.value = 'Сервер недоступен. Показан исходный каталог.'; }
});
function toggleFavorite(id) {
  const next = favorites.value.includes(id) ? favorites.value.filter(value => value !== id) : [...favorites.value, id];
  try {
    localStorage.setItem('eduPlatform.favorites', JSON.stringify(next));
    favorites.value = next;
  } catch { status.value = 'Не удалось сохранить избранное.'; }
}
</script>
<template>
<main class="page__main content">

        <h1 class="content__title">
            Каталог курсов
        </h1>

        <p class="content__text">
            Выбирайте интересное направление
            обучения. Все курсы доступны
            в онлайн-формате.
        </p>


        <!-- Общий контейнер каталога -->
        <PageSection>
  <template #header><h2 class="content__subtitle">Все курсы EduPlatform</h2></template>
  <p class="content__text">Ознакомьтесь с доступными программами и выберите курс.</p>
  <ItemList :items="items" :favorites="favorites" @toggle-favorite="toggleFavorite" />
  <template #footer><p v-if="status" role="status">{{ status }}</p></template>
</PageSection>

    </main>

    <!-- Боковая панель -->
    <aside class="page__sidebar sidebar"
           aria-label="Дополнительная информация о курсах">

        <section class="sidebar__section">

            <h2 class="sidebar__title">
                Направления обучения
            </h2>

            <ul class="sidebar__list">
                <li class="sidebar__item">
                    Программирование
                </li>

                <li class="sidebar__item">
                    Веб-разработка
                </li>

                <li class="sidebar__item">
                    Аналитика данных
                </li>
            </ul>

        </section>

        <section class="sidebar__section">

            <h2 class="sidebar__title">
                Почему EduPlatform?
            </h2>

            <p class="sidebar__text">
                Онлайн-занятия, практические
                задания и поддержка преподавателей.
            </p>

            <p class="sidebar__text">
                Выбирайте удобное расписание
                и учитесь в собственном темпе.
            </p>

        </section>

        <section class="sidebar__section">

            <h2 class="sidebar__title">
                Начните обучение
            </h2>

            <p class="sidebar__text">
                Оставьте заявку на выбранный курс.
            </p>

            <a class="sidebar__button button button_secondary"
               href="checkout.html">
                Записаться на курс
            </a>

        </section>

    </aside>
</template>
