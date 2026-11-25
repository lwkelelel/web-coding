<script setup>
defineProps({
  tone: { type: String, default: 'neutral' }
});
</script>
<template>
  <span class="base-badge" :class="'base-badge_' + tone"><slot /></span>
</template>
<style lang="scss" scoped>
.base-badge { display: inline-block; padding: .25rem .65rem; border-radius: .5rem; font-weight: 600; }
.base-badge_neutral { background: #eef0f6; color: #303956; }
.base-badge_beginner { background: #d9f4e8; color: #145841; }
.base-badge_intermediate { background: #e4eaff; color: #273e86; }
.base-badge_advanced { background: #f6e3ff; color: #632a7f; }
</style>
