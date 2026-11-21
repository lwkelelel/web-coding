import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
    build: {
        rollupOptions: {
            input: ["index", "catalog", "checkout", "detail", "collection"].map(page =>
                fileURLToPath(new URL("./" + page + ".html", import.meta.url))
            )
        }
    }
});
