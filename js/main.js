"use strict";

class Course {
    constructor(id, title, teacher, level, price, hours, image, isNew = false) {
        this.id = id;
        this.title = title;
        this.teacher = teacher;
        this.level = level;
        this.price = price;
        this.hours = hours;
        this.image = image;
        this.isNew = isNew;
    }

    render(isFavorite = false) {
        // Создаём корневой элемент карточки
        const card = document.createElement("article");
        card.className = "course-catalog__item course-card";
        card.dataset.id = String(this.id);

        // Создаём контейнер изображения
        const imageWrapper = document.createElement("div");
        imageWrapper.className = "course-card__image-wrapper";

        // Создаём изображение курса
        const image = document.createElement("img");
        image.className = "course-card__image";
        image.setAttribute("src", this.image);
        image.setAttribute("alt", `Иллюстрация курса ${this.title}`);
        image.setAttribute("loading", "lazy");

        imageWrapper.append(image);

        // Добавляем бейдж "Новинка", если курс новый
        if (this.isNew) {
            const badge = document.createElement("span");
            badge.className = "course-card__badge";
            badge.textContent = "Новинка";

            imageWrapper.append(badge);
        }

        // Создаём текстовую часть карточки
        const content = document.createElement("div");
        content.className = "course-card__content";

        // Название курса
        const title = document.createElement("h3");
        title.className = "course-card__title";
        title.textContent = this.title;

        // Преподаватель
        const teacher = document.createElement("p");
        teacher.className = "course-card__teacher";
        teacher.textContent = `Преподаватель: ${this.teacher}`;

        // Уровень сложности
        const level = document.createElement("p");
        level.className = "course-card__level";
        level.textContent = `Уровень: ${this.level}`;

        // Продолжительность
        const hours = document.createElement("p");
        hours.className = "course-card__hours";
        hours.textContent = `Продолжительность: ${this.hours} ч.`;

        // Стоимость
        const price = document.createElement("p");
        price.className = "course-card__price";
        price.textContent = `Стоимость: ${this.price.toLocaleString("ru-RU")} ₽`;

        // Ссылка на страницу курса
        const link = document.createElement("a");
        link.className = "course-card__button button button_primary";
        link.setAttribute(
            "href",
            `detail.html?course=${encodeURIComponent(String(this.id))}`
        );
        link.textContent = "Подробнее о курсе";


        // Дополнительное описание курса
        const description = document.createElement("p");
        description.className = "course-card__description";
        description.textContent =
        `${this.teacher} · ${this.level} · ${this.hours} ч. обучения`;

        const favoriteButton = document.createElement("button");
        favoriteButton.type = "button";
        favoriteButton.className = "course-card__button button";
        favoriteButton.dataset.favorite = "";
        updateFavoriteButton(favoriteButton, isFavorite);

        content.append(
            title,
            description,
            teacher,
            level,
            hours,
            price,
            link,
            favoriteButton
        );

        card.append(imageWrapper, content);

        // Возвращаем созданный DOM-элемент
        return card;
    }
}


// Исходные данные каталога EduPlatform.
// Массив содержит 15 учебных курсов.

const coursesData = [
    {
        id: 1,
        title: "Python с нуля",
        teacher: "Иванов И. И.",
        level: "Для начинающих",
        price: 24000,
        hours: 72,
        image: "images/course-python.svg",
        isNew: true,
        topics: ["Переменные", "Условия", "Циклы", "Функции"]
    },
    {
        id: 2,
        title: "Веб-разработка: HTML и CSS",
        teacher: "Петрова А. С.",
        level: "Для начинающих",
        price: 21000,
        hours: 64,
        image: "images/course-web.svg",
        isNew: true,
        topics: ["HTML", "CSS", "Flexbox", "Grid"]
    },
    {
        id: 3,
        title: "SQL и основы баз данных",
        teacher: "Сидоров Д. В.",
        level: "Для начинающих",
        price: 19000,
        hours: 56,
        image: "images/course-sql.svg",
        isNew: false,
        topics: ["SQL", "SELECT", "JOIN", "Нормализация"]
    },
    {
        id: 4,
        title: "JavaScript с нуля",
        teacher: "Кузнецова Е. М.",
        level: "Для начинающих",
        price: 23000,
        hours: 68,
        image: "images/course-web.svg",
        isNew: true,
        topics: ["Переменные", "Функции", "DOM", "События"]
    },
    {
        id: 5,
        title: "Основы программирования на Java",
        teacher: "Морозов А. П.",
        level: "Для начинающих",
        price: 26000,
        hours: 80,
        image: "images/course-python.svg",
        isNew: false,
        topics: ["Синтаксис", "Классы", "Объекты", "Коллекции"]
    },
    {
        id: 6,
        title: "Разработка на C++",
        teacher: "Васильев Н. А.",
        level: "Продвинутый",
        price: 32000,
        hours: 96,
        image: "images/course-python.svg",
        isNew: false,
        topics: ["Указатели", "ООП", "Шаблоны", "STL"]
    },
    {
        id: 7,
        title: "React: создание интерфейсов",
        teacher: "Соколова М. В.",
        level: "Средний",
        price: 29000,
        hours: 84,
        image: "images/course-web.svg",
        isNew: true,
        topics: ["Компоненты", "Props", "Hooks", "Роутинг"]
    },
    {
        id: 8,
        title: "Python для анализа данных",
        teacher: "Фёдоров П. И.",
        level: "Средний",
        price: 28000,
        hours: 88,
        image: "images/course-python.svg",
        isNew: false,
        topics: ["NumPy", "Pandas", "Matplotlib", "Анализ данных"]
    },
    {
        id: 9,
        title: "Основы машинного обучения",
        teacher: "Орлова Т. С.",
        level: "Средний",
        price: 35000,
        hours: 100,
        image: "images/course-sql.svg",
        isNew: true,
        topics: ["Регрессия", "Классификация", "Метрики", "Модели"]
    },
    {
        id: 10,
        title: "Git и GitHub",
        teacher: "Николаев Р. Д.",
        level: "Для начинающих",
        price: 12000,
        hours: 32,
        image: "images/course-web.svg",
        isNew: false,
        topics: ["Git", "Коммиты", "Ветки", "Слияние"]
    },
    {
        id: 11,
        title: "Алгоритмы и структуры данных",
        teacher: "Захарова О. И.",
        level: "Средний",
        price: 27000,
        hours: 76,
        image: "images/course-python.svg",
        isNew: false,
        topics: ["Массивы", "Списки", "Деревья", "Сортировка"]
    },
    {
        id: 12,
        title: "Основы тестирования ПО",
        teacher: "Беляев С. Н.",
        level: "Для начинающих",
        price: 17000,
        hours: 48,
        image: "images/course-web.svg",
        isNew: true,
        topics: ["Тест-кейсы", "Баг-репорты", "Проверки", "Автотесты"]
    },
    {
        id: 13,
        title: "Проектирование баз данных",
        teacher: "Андреева Л. В.",
        level: "Средний",
        price: 25000,
        hours: 70,
        image: "images/course-sql.svg",
        isNew: false,
        topics: ["ER-модели", "Связи", "Нормализация", "Индексы"]
    },
    {
        id: 14,
        title: "Backend-разработка на Flask",
        teacher: "Максимов К. Е.",
        level: "Средний",
        price: 30000,
        hours: 90,
        image: "images/course-python.svg",
        isNew: true,
        topics: ["Flask", "Маршруты", "Шаблоны", "API"]
    },
    {
        id: 15,
        title: "Основы кибербезопасности",
        teacher: "Смирнова Ю. А.",
        level: "Для начинающих",
        price: 22000,
        hours: 60,
        image: "images/course-web.svg",
        isNew: false,
        topics: ["Угрозы", "Пароли", "Шифрование", "Защита данных"]
    }
];

// Проверяем исходные данные в консоли браузера.
console.log("EduPlatform: массив курсов загружен.");
console.log("Количество курсов:", coursesData.length);
console.table(coursesData);


// Пункты 6–7. Поиск контейнера и динамическая отрисовка каталога

const catalogContainer = document.querySelector("#catalog-container");

// Функция создаёт карточки всех курсов и добавляет их в каталог
function renderCatalog(container, courseData) {
    // Создаём DOM-фрагмент для подготовки карточек
    const fragment = document.createDocumentFragment();

    // Перебираем все курсы из массива
    courseData.forEach((data) => {
        // Создаём экземпляр класса Course
        const course = new Course(
            data.id,
            data.title,
            data.teacher,
            data.level,
            data.price,
            data.hours,
            data.image,
            data.isNew
        );

        // Метод render() возвращает HTML-элемент карточки
        const card = course.render(favoriteIds.includes(String(course.id)));

        // Добавляем карточку во временный фрагмент
        fragment.append(card);
    });

    // Добавляем все готовые карточки на страницу
    container.replaceChildren(fragment);

    console.log(`В каталог добавлено ${courseData.length} курсов.`);
}

// Пункт 8. Аналитика курсов (вариант №3)

// Получение названий всех курсов для начинающих
function getBeginnerCourses(courses) {
    return courses
        .filter((course) => course.level === "Для начинающих")
        .map((course) => course.title);
}

// Вычисление общей продолжительности всех курсов
function getTotalCourseHours(courses) {
    return courses.reduce((total, course) => total + course.hours, 0);
}

// Выполняем анализ данных
const beginnerCourseTitles = getBeginnerCourses(coursesData);
const totalCourseHours = getTotalCourseHours(coursesData);

// Выводим результаты в консоль
console.log("=== Аналитика EduPlatform ===");

console.log(
    "Курсы уровня «Для начинающих»:",
    beginnerCourseTitles
);

console.log(
    "Количество курсов для начинающих:",
    beginnerCourseTitles.length
);

console.log(
    "Общая продолжительность всех курсов:",
    totalCourseHours,
    "часов"
);

// Лабораторная работа №5
function readList(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function saveList(key, items) {
    try {
        localStorage.setItem(key, JSON.stringify(items));
        return true;
    } catch {
        return false;
    }
}

const favoriteKey = "eduPlatform.favorites";
const enrollmentKey = "eduPlatform.enrollments";
const coursesById = new Map(coursesData.map(course => [String(course.id), course]));
let favoriteIds = readList(favoriteKey);

function updateFavoriteButton(button, isFavorite) {
    button.setAttribute("aria-pressed", String(isFavorite));
    button.classList.toggle("button_primary", isFavorite);
    button.textContent = isFavorite ? "В избранном" : "В избранное";
}

if (catalogContainer) {
    renderCatalog(catalogContainer, coursesData);
    catalogContainer.addEventListener("click", event => {
        const button = event.target.closest("button[data-favorite]");
        const card = button?.closest(".course-card[data-id]");
        if (!card || !catalogContainer.contains(card)) return;

        const id = card.dataset.id;
        const storedIds = readList(favoriteKey);
        const isFavorite = !storedIds.includes(id);
        const nextIds = isFavorite ? [...storedIds, id] : storedIds.filter(savedId => savedId !== id);
        const status = document.querySelector("#favorite-status");
        if (!saveList(favoriteKey, nextIds)) {
            status.textContent = "Не удалось сохранить избранное.";
            return;
        }
        favoriteIds = nextIds;
        status.textContent = "";
        updateFavoriteButton(button, isFavorite);
    });
}

const requestedCourse = new URLSearchParams(location.search).get("course");
if (location.pathname.endsWith("/detail.html") && coursesById.has(requestedCourse)) {
    document.querySelectorAll('a[href="checkout.html"]').forEach(link => {
        link.href = `checkout.html?course=${encodeURIComponent(requestedCourse)}`;
    });
}

const enrollmentForm = document.querySelector("#enrollment-form");
if (enrollmentForm) {
    const courseSelect = enrollmentForm.elements.namedItem("courseId");
    const status = document.querySelector("#enrollment-status");
    coursesById.forEach((course, id) => courseSelect.add(new Option(course.title, id)));
    if (coursesById.has(requestedCourse)) courseSelect.value = requestedCourse;

    enrollmentForm.addEventListener("submit", event => {
        event.preventDefault();
        const fields = Object.fromEntries(new FormData(enrollmentForm));
        if (!coursesById.has(fields.courseId)) return;

        const enrollment = {
            ...fields,
            weeks: Number(fields.weeks),
            agree: enrollmentForm.elements.namedItem("agree").checked
        };
        const enrollments = [...readList(enrollmentKey), enrollment];
        if (!saveList(enrollmentKey, enrollments)) {
            status.textContent = "Не удалось сохранить заявку. Попробуйте ещё раз.";
            return;
        }
        enrollmentForm.reset();
        if (coursesById.has(requestedCourse)) courseSelect.value = requestedCourse;
        status.textContent = "Заявка сохранена. Запись доступна в разделе «Моё расписание».";
    });
}

const enrollmentList = document.querySelector("#enrollment-list");
if (enrollmentList) {
    const enrollments = readList(enrollmentKey);
    const items = enrollments.filter(enrollment => enrollment && coursesById.has(enrollment.courseId))
        .map(enrollment => {
            const item = document.createElement("li");
            const course = coursesById.get(enrollment.courseId);
            const schedules = { morning: "утро", evening: "вечер", weekend: "выходные" };
            item.textContent = `${course.title} · ${enrollment.fullname} · ${enrollment.start_date} · ${schedules[enrollment.schedule] ?? enrollment.schedule} · ${enrollment.weeks} нед.`;
            return item;
        });
    enrollmentList.replaceChildren(...items);
    enrollmentList.hidden = items.length === 0;
    document.querySelector("#enrollment-empty").hidden = items.length > 0;
}
