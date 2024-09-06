import "@testing-library/jest-dom";
import { beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from "@testcontainers/postgresql";
import { setTestPrisma } from "./prisma";

let container: StartedPostgreSqlContainer;
let prisma: PrismaClient;

export const getContainer = async () => {
  if (container) {
    return container;
  } else {
    await setupTestDBContainer();
    return container;
  }
};

export async function setupTestDBContainer() {
  container = await new PostgreSqlContainer(
    "public.ecr.aws/docker/library/postgres:16.1-alpine"
  )
    .withDatabase("todo_db")
    .withUsername("todouser")
    .withPassword("todopassword") // パスワードを設定
    .withReuse()
    .start();

  const port = container.getMappedPort(5432);

  await container.exec(
    `psql -U ${container.getUsername()} -c "CREATE DATABASE todo_db;"`
  );

  process.env[
    "DATABASE_URL"
  ] = `postgresql://${container.getUsername()}:${container.getPassword()}@${container.getHost()}:${port}/todo_db?schema=public`;

  execSync("npx prisma migrate deploy", { stdio: "inherit" });

  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
  setTestPrisma(prisma);
}

beforeAll(async () => {
  console.log("Start Global setup");
  await setupTestDBContainer();
  console.log("End Global setup");
});

afterAll(async () => {
  console.log("Start Global teardown");
  await prisma.$disconnect();
  const container = await getContainer();
  await container.stop();
  console.log("End Global teardown");
});
