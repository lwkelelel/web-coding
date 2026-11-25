import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            input: ["index", "catalog", "checkout", "detail", "collection"].map(page =>
                fileURLToPath(new URL("./" + page + ".html", import.meta.url))
            )
        }
    }
});
