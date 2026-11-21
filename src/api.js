const baseUrl = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

async function request(resource, options) {
    const response = await fetch(baseUrl + "/" + resource, options);
    if (!response.ok) throw new Error("HTTP " + response.status + " (" + resource + ")");
    return response.json();
}

export const getCourses = () => request("courses");
export const getEnrollments = () => request("enrollments");
export const createEnrollment = data => request("enrollments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
});
