<template>
<footer class="page__footer site-footer">

        <p class="site-footer__text">
            &copy; 2026 EduPlatform.
            Все права защищены.
        </p>

        <p class="site-footer__text">
            Контакты: info@eduplatform.example
        </p>

    </footer>
</template>
<style lang="scss" scoped>
@use "../assets/scss/variables" as *;
/* =====================================
   14. ПОДВАЛ САЙТА
===================================== */

.site-footer {
  padding: 25px 5%;
  background-color: #252a60;
  color: #dce0ff;

  &__text {
    margin: 5px 0;
    font-size: 14px;
  }
}


</style>
