import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    // database
    DB_HOSTNAME: z.string().min(1).default("localhost"),
    DB_PORT: z.string().regex(/^\d+$/).default("5432"),
    DB_NAME: z.string().min(1).default("todo_db"),
    DB_SCHEMA: z.string().min(1).default("public"),
    DB_USERNAME: z.string().min(1).default("todouser"),
    DB_PASSWORD: z.string().min(1).default("todopassword"),
  },
  runtimeEnv: process.env,
});
