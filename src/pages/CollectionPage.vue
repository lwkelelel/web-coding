<script setup>
import { onMounted, ref } from 'vue';
import { getCourses, getEnrollments } from '../api.js';
import { readList } from '../storage.js';
const status = ref('Загружаем заявки…');
const loaded = ref(false);
const enrollments = ref([]);
const schedules = { morning: 'утро', evening: 'вечер', weekend: 'выходные' };
onMounted(async () => {
  try {
    const [courses, records] = await Promise.all([getCourses(), getEnrollments()]);
    const titles = new Map(courses.map(course => [String(course.id), course.title]));
    enrollments.value = [...readList('eduPlatform.enrollments'), ...records]
      .map((item, index) => ({ ...item, key: index, title: titles.get(String(item?.courseId)) }))
      .filter(item => item.title);
    status.value = '';
    loaded.value = true;
  } catch { status.value = 'Не удалось загрузить заявки. Проверьте сервер и обновите страницу.'; }
});
</script>
<template>
<main class="page__main content">

        <h1 class="content__title">
            Моё расписание на неделю
        </h1>

        <section class="content__section section">
            <h2 class="content__subtitle">Мои заявки на курсы</h2>
            <p id="schedule-status" role="status">{{ status }}</p>
            <p id="enrollment-empty" v-if="loaded && !enrollments.length">Заявок пока нет.</p>
            <ul v-if="enrollments.length" id="enrollment-list">
<li v-for="item in enrollments" :key="item.key">{{ item.title }} · {{ item.fullname }} · {{ item.start_date }} · {{ schedules[item.schedule] }} · {{ item.weeks }} нед.</li>
</ul>
        </section>

        <section class="content__section section">

            <h2 class="content__subtitle">
                Учебные занятия
            </h2>

            <!-- Контейнер для таблицы -->
            <div class="schedule-wrapper"
                 role="region"
                 aria-label="Таблица расписания занятий"
                 tabindex="0">

                <table class="schedule">

                    <caption class="schedule__caption">
                        Расписание занятий на неделю
                    </caption>

                    <thead class="schedule__head">
                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Время</th>
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Понедельник</th>
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Вторник</th>
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Среда</th>
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Четверг</th>
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Пятница</th>
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Суббота</th>
                            <th class="schedule__cell schedule__cell_header"
                                scope="col">Воскресенье</th>
                        </tr>
                    </thead>

                    <tbody class="schedule__body">

                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_time"
                                scope="row">09:00–10:30</th>
                            <td class="schedule__cell schedule__cell_lesson">Python с нуля</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">Python с нуля</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">SQL для аналитика</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                        </tr>

                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_time"
                                scope="row">10:40–12:10</th>
                            <td class="schedule__cell schedule__cell_lesson">Веб-разработка</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">Веб-разработка</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">SQL для аналитика</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                        </tr>

                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_time"
                                scope="row">12:20–13:50</th>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">Python с нуля</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">Python с нуля</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">Веб-разработка</td>
                            <td class="schedule__cell"></td>
                        </tr>

                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_time"
                                scope="row">14:00–15:30</th>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">SQL для аналитика</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">SQL для аналитика</td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                        </tr>

                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_time"
                                scope="row">15:40–17:10</th>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                        </tr>

                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_time"
                                scope="row">17:20–18:50</th>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">Веб-разработка</td>
                        </tr>

                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_time"
                                scope="row">19:00–20:30</th>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell"></td>
                            <td class="schedule__cell schedule__cell_lesson">Python с нуля</td>
                        </tr>

                    </tbody>

                    <tfoot class="schedule__foot">
                        <tr class="schedule__row">
                            <th class="schedule__cell schedule__cell_total"
                                scope="row"
                                colspan="2">
                                Всего занятий за неделю:
                            </th>
                            <td class="schedule__cell schedule__cell_total"
                                colspan="6">
                                13 занятий
                            </td>
                        </tr>
                    </tfoot>

                </table>
            </div>

            <p class="section__note">
                На небольших экранах таблицу можно
                прокручивать горизонтально для просмотра
                всех дней недели.
            </p>

        </section>
    </main>

    <!-- Боковая панель -->
    <aside class="page__sidebar sidebar"
           aria-label="Информация об обучении">

        <section class="sidebar__section">
            <h2 class="sidebar__title">
                Мои курсы
            </h2>

            <ul class="sidebar__list">
                <li class="sidebar__item">
                    Python с нуля
                </li>
                <li class="sidebar__item">
                    Веб-разработка
                </li>
                <li class="sidebar__item">
                    SQL для аналитика
                </li>
            </ul>
        </section>

        <section class="sidebar__section">
            <h2 class="sidebar__title">
                Планирование
            </h2>

            <p class="sidebar__text">
                Следите за расписанием занятий
                и выбирайте удобные временные интервалы.
            </p>
        </section>

    </aside>
</template>
