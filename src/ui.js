const courseImages = import.meta.glob("../images/*", { eager: true, query: "?url", import: "default" });
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
        image.src = courseImages["../" + this.image] ?? "";
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



function renderCatalog(container, courseData, favoriteIds) {
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


function getBeginnerCourses(courses) {
    return courses
        .filter((course) => course.level === "Для начинающих")
        .map((course) => course.title);
}

// Вычисление общей продолжительности всех курсов
function getTotalCourseHours(courses) {
    return courses.reduce((total, course) => total + course.hours, 0);
}


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


function updateFavoriteButton(button, isFavorite) {
    button.setAttribute("aria-pressed", String(isFavorite));
    button.classList.toggle("button_primary", isFavorite);
    button.textContent = isFavorite ? "В избранном" : "В избранное";
}


const favoriteKey = "eduPlatform.favorites";
export function showCatalog(catalogContainer, courses) {
    renderCatalog(catalogContainer, courses, readList(favoriteKey));
    console.info("Каталог загружен", { courses: courses.length, beginnerCourses: getBeginnerCourses(courses), totalHours: getTotalCourseHours(courses) });
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
        status.textContent = "";
        updateFavoriteButton(button, isFavorite);
    });
}

export function showEnrollments(enrollmentList, courses, serverEnrollments) {
    const coursesById = new Map(courses.map(course => [String(course.id), course]));
    const enrollments = [...readList("eduPlatform.enrollments"), ...serverEnrollments];
    const items = enrollments.filter(enrollment => enrollment && coursesById.has(String(enrollment.courseId)))
        .map(enrollment => {
            const item = document.createElement("li");
            const course = coursesById.get(String(enrollment.courseId));
            const schedules = { morning: "утро", evening: "вечер", weekend: "выходные" };
            item.textContent = `${course.title} · ${enrollment.fullname} · ${enrollment.start_date} · ${schedules[enrollment.schedule] ?? enrollment.schedule} · ${enrollment.weeks} нед.`;
            return item;
        });
    enrollmentList.replaceChildren(...items);
    enrollmentList.hidden = items.length === 0;
    document.querySelector("#enrollment-empty").hidden = items.length > 0;

}

export async function withRequest(status, loading, onError, request) {
    status.textContent = loading;
    status.setAttribute("aria-busy", "true");
    try {
        const result = await request();
        status.textContent = "";
        return result;
    } catch (error) {
        console.warn(onError, error);
        status.textContent = onError;
        return null;
    } finally {
        status.removeAttribute("aria-busy");
    }
}
