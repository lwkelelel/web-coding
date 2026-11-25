<script setup>
import CourseCard from './CourseCard.vue';
defineProps({
  items: { type: Array, required: true },
  favorites: { type: Array, default: () => [] }
});
defineEmits(['toggle-favorite']);
const images = import.meta.glob('../../images/*', { eager: true, query: '?url', import: 'default' });
</script>
<template>
  <div class="course-catalog__grid">
    <CourseCard v-for="item in items" :key="item.id" :id="String(item.id)" :title="item.title"
      :instructor="item.teacher" :duration-hours="item.hours" :level="item.level" :price="item.price"
      :has-certificate="item.hasCertificate ?? false" :image-url="images['../../' + item.image] || ''"
      :is-new="item.isNew" :favorite="favorites.includes(String(item.id))"
      @toggle-favorite="$emit('toggle-favorite', $event)" />
  </div>
</template>
