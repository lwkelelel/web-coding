import { createEnrollment, getCourses, getEnrollments } from "./api.js";
import { showCatalog, showEnrollments, withRequest } from "./ui.js";

const catalog = document.querySelector("#catalog-container");
const form = document.querySelector("#enrollment-form");
const schedule = document.querySelector("#enrollment-list");
const requestedCourse = new URLSearchParams(location.search).get("course");

if (catalog) {
    const status = document.querySelector("#catalog-status");
    const courses = await withRequest(status, "Загружаем каталог…",
        "Не удалось загрузить каталог. Проверьте, запущен ли сервер, и обновите страницу.", getCourses);
    if (courses) showCatalog(catalog, courses);
}

if (location.pathname.endsWith("/detail.html") && requestedCourse) {
    document.querySelectorAll('a[href="checkout.html"]').forEach(link => {
        link.href = "checkout.html?course=" + encodeURIComponent(requestedCourse);
    });
}

if (form) {
    const select = form.elements.namedItem("courseId");
    const status = document.querySelector("#enrollment-status");
    const submit = form.querySelector('button[type="submit"]');
    const courses = await withRequest(status, "Загружаем список курсов…",
        "Не удалось загрузить курсы. Проверьте сервер и обновите страницу.", getCourses);
    if (courses?.length) {
        const courseIds = new Set(courses.map(course => String(course.id)));
        courses.forEach(course => select.add(new Option(course.title, String(course.id))));
        if (courseIds.has(requestedCourse)) select.value = requestedCourse;
        submit.disabled = false;
        form.addEventListener("submit", async event => {
            event.preventDefault();
            if (submit.disabled) return;
            const data = Object.fromEntries(new FormData(form));
            if (!courseIds.has(data.courseId)) return;
            data.weeks = Number(data.weeks);
            data.agree = form.elements.namedItem("agree").checked;
            submit.disabled = true;
            try {
                const created = await withRequest(status, "Отправляем заявку…",
                    "Не удалось отправить заявку. Проверьте сервер и повторите попытку.",
                    () => createEnrollment(data));
                if (created) {
                    form.reset();
                    if (courseIds.has(requestedCourse)) select.value = requestedCourse;
                    status.textContent = "Заявка сохранена. Запись доступна в разделе «Моё расписание».";
                }
            } finally {
                submit.disabled = false;
            }
        });
    } else if (courses) {
        status.textContent = "Список курсов пока пуст.";
    }
}

if (schedule) {
    const status = document.querySelector("#schedule-status");
    const result = await withRequest(status, "Загружаем заявки…",
        "Не удалось загрузить заявки. Проверьте сервер и обновите страницу.",
        () => Promise.all([getCourses(), getEnrollments()]));
    if (result) showEnrollments(schedule, ...result);
}
