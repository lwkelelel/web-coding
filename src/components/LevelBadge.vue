<script setup>
import { computed } from 'vue';
import BaseBadge from './BaseBadge.vue';
const props = defineProps({ level: { type: String, required: true } });
const tone = computed(() => ({
  'Для начинающих': 'beginner', 'Средний': 'intermediate', 'Продвинутый': 'advanced'
}[props.level] || 'neutral'));
</script>
<template>
  <BaseBadge class="level-badge" :class="'level-badge_' + tone" :tone="tone">{{ level }}</BaseBadge>
</template>
