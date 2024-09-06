import path from "node:path";
import { fileURLToPath } from "node:url";

// このパッケージの絶対パスを取得する
const filename = fileURLToPath(import.meta.url);
export const dirname = path.dirname(filename);
export const rootDir = path.join(dirname, "..");
export const cacheDir = path.join(rootDir, "cache");
export const testsDir = path.join(rootDir, "tests");
