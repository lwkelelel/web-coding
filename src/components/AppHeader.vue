<script setup>
defineProps({ page: { type: String, required: true }, checkout: { type: String, required: true } });
const links = [
  ['index.html', 'Главная'], ['catalog.html', 'Каталог курсов'],
  ['detail.html', 'О курсе'], ['collection.html', 'Моё расписание'],
  ['checkout.html', 'Запись на курс']
];
</script>
<template>
  <header class="page__header site-header">
    <div class="site-header__inner">
      <a class="site-header__brand" href="index.html">EduPlatform</a>
      <nav class="site-header__nav site-nav" aria-label="Главная навигация">
        <ul class="site-nav__list">
          <li v-for="[href, label] in links" :key="href" class="site-nav__item">
            <a class="site-nav__link" :class="{ 'site-nav__link_active': href === page }"
               :href="href === 'checkout.html' ? checkout : href"
               :aria-current="href === page ? 'page' : undefined">{{ label }}</a>
          </li>
        </ul>
      </nav>
      <a class="site-header__profile" :href="checkout">Записаться</a>
    </div>
  </header>
</template>
<style lang="scss" scoped>
@use "../assets/scss/variables" as *;
/* =====================================
   3. ШАПКА САЙТА
===================================== */

.site-header {
  padding: 30px 5%;
  background-color: #252a60;
  color: $surface-color;

  &__brand {
    margin: 0;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
  }

  &__tagline {
    margin: 10px 0 0;
    color: #dce0ff;
    font-size: 16px;
  }
}


</style>
