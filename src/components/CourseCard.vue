<script setup>
import LevelBadge from './LevelBadge.vue';
defineProps({
  id: { type: String, required: true },
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  durationHours: { type: Number, required: true },
  level: { type: String, required: true },
  price: { type: Number, required: true },
  hasCertificate: { type: Boolean, required: true },
  imageUrl: { type: String, required: true },
  isNew: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false }
});
defineEmits(['toggle-favorite']);
</script>
<template>
  <article class="course-catalog__item course-card" :class="{ 'course-card_new': isNew }" :data-id="id">
    <div class="course-card__image-wrapper">
      <img class="course-card__image" :src="imageUrl" :alt="'Иллюстрация курса ' + title" loading="lazy">
      <span v-if="isNew" class="course-card__badge">Новинка</span>
    </div>
    <div class="course-card__content">
      <h3 class="course-card__title">{{ title }}</h3>
      <p class="course-card__teacher">Преподаватель: {{ instructor }}</p>
      <p class="course-card__level"><LevelBadge :level="level" /></p>
      <p class="course-card__hours">Продолжительность: {{ durationHours }} ч.</p>
      <p class="course-card__price">Стоимость: {{ price.toLocaleString('ru-RU') }} ₽</p>
      <p v-if="hasCertificate" class="course-card__description">Сертификат по окончании</p>
      <a class="course-card__button button button_primary" :href="'detail.html?course=' + encodeURIComponent(id)">Подробнее о курсе</a>
      <button type="button" class="course-card__button button" :class="{ button_primary: favorite }"
              :aria-pressed="favorite" @click="$emit('toggle-favorite', id)">
        {{ favorite ? 'В избранном' : 'В избранное' }}
      </button>
    </div>
  </article>
</template>
