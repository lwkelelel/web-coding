import { copyFileSync, constants } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const seed = new URL("../db.json", import.meta.url);
const database = new URL("../db.local.json", import.meta.url);
try {
    copyFileSync(seed, database, constants.COPYFILE_EXCL);
} catch (error) {
    if (error.code !== "EEXIST") throw error;
}

const cli = new URL("../node_modules/json-server/lib/bin.js", import.meta.url);
const server = spawn(process.execPath, [
    fileURLToPath(cli), fileURLToPath(database), "--host", "localhost", "--port", "3000"
], { stdio: "inherit" });
server.on("error", error => {
    console.error(error);
    process.exitCode = 1;
});
server.on("exit", code => { process.exitCode = code ?? 1; });
