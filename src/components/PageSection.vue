<template>
  <section class="course-catalog">
    <header v-if="$slots.header"><slot name="header" /></header>
    <slot name="default" />
    <footer v-if="$slots.footer"><slot name="footer" /></footer>
  </section>
</template>
