<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { createEnrollment, getCourses } from '../api.js';
const courses = ref([]);
const busy = ref(false);
const status = ref('Загружаем список курсов…');
const courseId = ref(new URLSearchParams(location.search).get('course') || '');
const hasCourse = computed(() => courses.value.some(course => String(course.id) === courseId.value));
onMounted(async () => {
  try {
    courses.value = await getCourses();
    status.value = courses.value.length ? '' : 'Список курсов пока пуст.';
    if (!hasCourse.value) courseId.value = '';
  } catch { status.value = 'Не удалось загрузить курсы. Проверьте сервер и обновите страницу.'; }
});
async function submit(event) {
  if (busy.value || !hasCourse.value) return;
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form));
  data.weeks = Number(data.weeks);
  data.agree = data.agree !== undefined;
  busy.value = true;
  status.value = 'Отправляем заявку…';
  try {
    await createEnrollment(data);
    const selected = courseId.value;
    form.reset();
    courseId.value = '';
    await nextTick();
    courseId.value = selected;
    status.value = 'Заявка сохранена. Запись доступна в разделе «Моё расписание».';
  } catch { status.value = 'Не удалось отправить заявку. Проверьте сервер и повторите попытку.'; }
  finally { busy.value = false; }
}
</script>
<template>
<main class="page__main content">

        <h1 class="content__title">
            Запись на курс
        </h1>

        <p class="content__text">
            Заполните форму ниже, чтобы оставить
            заявку на обучение в EduPlatform.
        </p>

        <!-- Форма записи -->
        <form class="enrollment-form"
              id="enrollment-form" @submit.prevent="submit"
              action="#"
              method="post">

            <p class="enrollment-form__field">
                <label class="enrollment-form__label" for="course-id">Курс</label>
                <select class="enrollment-form__select" id="course-id" name="courseId" v-model="courseId" required>
                    <option value="">Выберите курс</option>
                    <option v-for="course in courses" :key="course.id" :value="String(course.id)">{{ course.title }}</option>
                </select>
            </p>
            <p id="enrollment-status" role="status" :aria-busy="busy">{{ status }}</p>

            <!-- Личные данные -->
            <fieldset class="enrollment-form__group">

                <legend class="enrollment-form__legend">
                    Личные данные
                </legend>

                <p class="enrollment-form__field">
                    <label class="enrollment-form__label"
                           for="fullname">
                        ФИО:
                    </label>

                    <input class="enrollment-form__input"
                           type="text"
                           id="fullname"
                           name="fullname"
                           required
                           minlength="5"
                           maxlength="100"
                           autocomplete="name"
                           placeholder="Иванов Иван Иванович">
                </p>

                <p class="enrollment-form__field">
                    <label class="enrollment-form__label"
                           for="email">
                        Email:
                    </label>

                    <input class="enrollment-form__input"
                           type="email"
                           id="email"
                           name="email"
                           required
                           autocomplete="email"
                           placeholder="you@example.com">
                </p>

                <p class="enrollment-form__field">
    <label class="enrollment-form__label"
           for="phone">
        Контактный телефон:
    </label>

    <input class="enrollment-form__input"
           type="tel"
           id="phone"
           name="phone"
           required
           autocomplete="tel"
           pattern="\+7[0-9]{10}"
           placeholder="+79991234567"
           aria-describedby="phone-hint">

    <small class="enrollment-form__hint"
           id="phone-hint">
        Формат номера: +7 и 10 цифр,
        например +79991234567.
    </small>
</p>


            </fieldset>

            <!-- Уровень подготовки -->
            <fieldset class="enrollment-form__group">

                <legend class="enrollment-form__legend">
                    Уровень подготовки
                </legend>

                <p class="enrollment-form__choice">
                    <input class="enrollment-form__radio"
                           type="radio"
                           id="level-beginner"
                           name="level"
                           value="beginner"
                           checked>

                    <label class="enrollment-form__choice-label"
                           for="level-beginner">
                        Начинающий
                    </label>
                </p>

                <p class="enrollment-form__choice">
                    <input class="enrollment-form__radio"
                           type="radio"
                           id="level-middle"
                           name="level"
                           value="middle">

                    <label class="enrollment-form__choice-label"
                           for="level-middle">
                        Продолжающий
                    </label>
                </p>

                <p class="enrollment-form__choice">
                    <input class="enrollment-form__radio"
                           type="radio"
                           id="level-advanced"
                           name="level"
                           value="advanced">

                    <label class="enrollment-form__choice-label"
                           for="level-advanced">
                        Продвинутый
                    </label>
                </p>

            </fieldset>

            <!-- Параметры обучения -->
            <fieldset class="enrollment-form__group">

                <legend class="enrollment-form__legend">
                    Параметры обучения
                </legend>

                <p class="enrollment-form__field">
                    <label class="enrollment-form__label"
                           for="schedule">
                        Предпочитаемое расписание:
                    </label>

                    <select class="enrollment-form__select"
                            id="schedule"
                            name="schedule"
                            required>

                        <option value="">
                            — выберите —
                        </option>

                        <option value="morning">
                            Утро
                        </option>

                        <option value="evening">
                            Вечер
                        </option>

                        <option value="weekend">
                            Выходные
                        </option>

                    </select>
                </p>

                <p class="enrollment-form__field">
                    <label class="enrollment-form__label"
                           for="start-date">
                        Желаемая дата начала:
                    </label>

                    <input class="enrollment-form__input"
                           type="date"
                           id="start-date"
                           name="start_date"
                           required>
                </p>

                <p class="enrollment-form__field">
                    <label class="enrollment-form__label"
                           for="weeks">
                        Длительность обучения (недель):
                    </label>

                    <input class="enrollment-form__input"
                           type="number"
                           id="weeks"
                           name="weeks"
                           min="1"
                           max="52"
                           value="8"
                           required>
                </p>

            </fieldset>

            <!-- Дополнительная информация -->
            <fieldset class="enrollment-form__group">

                <legend class="enrollment-form__legend">
                    Дополнительная информация
                </legend>

                <p class="enrollment-form__field">
                    <label class="enrollment-form__label"
                           for="comment">
                        Комментарий:
                    </label>

                    <textarea class="enrollment-form__textarea"
                              id="comment"
                              name="comment"
                              rows="4"
                              maxlength="500"
                              placeholder="Ваши пожелания или вопросы"></textarea>
                </p>

                <p class="enrollment-form__choice">
                    <input class="enrollment-form__checkbox"
                           type="checkbox"
                           id="agree"
                           name="agree"
                           required>

                    <label class="enrollment-form__choice-label"
                           for="agree">
                        Согласен с обработкой
                        персональных данных
                    </label>
                </p>

            </fieldset>

            <!-- Отправка формы -->
            <p class="enrollment-form__actions">

                <button
                    class="enrollment-form__submit button button_primary"
                    type="submit" :disabled="busy || !hasCourse">
                    Отправить заявку
                </button>

            </p>

        </form>

    </main>

    <!-- Боковая панель -->
    <aside class="page__sidebar sidebar"
           aria-label="Информация о записи на курс">

        <section class="sidebar__section">

            <h2 class="sidebar__title">
                Как записаться?
            </h2>

            <ol class="sidebar__list">
                <li class="sidebar__item">
                    Заполните личные данные.
                </li>

                <li class="sidebar__item">
                    Выберите уровень подготовки.
                </li>

                <li class="sidebar__item">
                    Укажите удобное расписание.
                </li>

                <li class="sidebar__item">
                    Отправьте заявку.
                </li>
            </ol>

        </section>

        <section class="sidebar__section">

            <h2 class="sidebar__title">
                Преимущества обучения
            </h2>

            <ul class="sidebar__list">
                <li class="sidebar__item">
                    Онлайн-формат
                </li>

                <li class="sidebar__item">
                    Практические задания
                </li>

                <li class="sidebar__item">
                    Поддержка наставника
                </li>
            </ul>

        </section>

        <section class="sidebar__section">

            <h2 class="sidebar__title">
                Нужна помощь?
            </h2>

            <p class="sidebar__text">
                По вопросам обучения обращайтесь:
            </p>

            <a class="sidebar__contact"
               href="mailto:info@eduplatform.example">
                info@eduplatform.example
            </a>

        </section>

    </aside>
</template>
