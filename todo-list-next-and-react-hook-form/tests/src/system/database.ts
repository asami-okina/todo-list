import { execSync } from "node:child_process";
import { env } from "../env.js";
import path from "node:path";
import { rootDir } from "../dirname.js";

const prismaPackageDir = path.resolve(rootDir, "../prisma");
const databaseUrl = `postgresql://${env.DB_USERNAME}:${encodeURIComponent(
  env.DB_PASSWORD
)}@${env.DB_HOSTNAME}:${env.DB_PORT}/${env.DB_NAME}?schema=${env.DB_SCHEMA}`;

export const resetDatabase = async () => {
  execSync(`DATABASE_URL=${databaseUrl} yarn prisma migrate reset --force`, {
    cwd: prismaPackageDir,
  });
};
