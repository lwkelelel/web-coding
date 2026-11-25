<template>
<main class="page__main content">

        <section class="content__section section section_hero">
            <h1 class="content__title">
                Учитесь новому вместе с EduPlatform
            </h1>

            <p class="content__text">
                EduPlatform — это платформа
                онлайн-образования, где вы можете
                изучать программирование, дизайн,
                аналитику данных и другие направления
                в удобном темпе.
            </p>

            <p class="content__text">
                Занятия ведут практикующие
                преподаватели, а расписание
                подстраивается под вас.
            </p>

            <a class="section__button button button_primary"
               href="catalog.html">
                Выбрать курс
            </a>
        </section>

        <!-- Преимущества -->
        <section class="content__section section">
            <h2 class="content__subtitle">
                Почему выбирают нас
            </h2>

            <div class="feature-list">

                <article class="feature-list__item feature">
                    <h3 class="feature__title">
                        Гибкое расписание
                    </h3>

                    <p class="feature__description">
                        Утренние, вечерние и выходные
                        группы — выбирайте удобный слот.
                    </p>
                </article>

                <article class="feature-list__item feature">
                    <h3 class="feature__title">
                        Практика с первого дня
                    </h3>

                    <p class="feature__description">
                        Каждый курс построен вокруг
                        реальных проектов.
                    </p>
                </article>

                <article class="feature-list__item feature">
                    <h3 class="feature__title">
                        Поддержка наставника
                    </h3>

                    <p class="feature__description">
                        Личный наставник отвечает
                        на вопросы и проверяет
                        домашние задания.
                    </p>
                </article>

            </div>
        </section>

    </main>

    <!-- Боковая панель -->
    <aside class="page__sidebar sidebar"
       aria-labelledby="sidebar-heading">


        <section class="sidebar__section">
            <h2 class="sidebar__title"
                id="sidebar-heading">
                Ближайший набор
            </h2>


            <p class="sidebar__text">
                Открыта запись на курс
                «Веб-разработка».
            </p>

            <p class="sidebar__text">
                Количество мест ограничено.
            </p>

            <a class="sidebar__button button button_secondary"
               href="checkout.html">
                Записаться
            </a>
        </section>

        <section class="sidebar__section">
            <h2 class="sidebar__title">
                Популярные направления
            </h2>

            <ul class="sidebar__list">
                <li class="sidebar__item">
                    Python
                </li>
                <li class="sidebar__item">
                    Веб-разработка
                </li>
                <li class="sidebar__item">
                    SQL и аналитика
                </li>
            </ul>
        </section>
    </aside>
</template>
