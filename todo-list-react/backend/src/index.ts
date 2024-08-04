import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const TodoSchema = z.object({
  title: z.string().min(1),
  completed: z.boolean().optional(),
});

const app = new Elysia()
  .use(cors())
  .get("/todos", async () => {
    return await prisma.todo.findMany();
  })
  .post("/todos", async ({ body }) => {
    const validatedData = TodoSchema.parse(body);
    return await prisma.todo.create({ data: validatedData });
  })
  .put("/todos/:id", async ({ params, body }) => {
    const id = parseInt(params.id);
    const validatedData = TodoSchema.partial().parse(body);
    return await prisma.todo.update({
      where: { id },
      data: validatedData,
    });
  })
  .delete("/todos/:id", async ({ params }) => {
    const id = parseInt(params.id);
    await prisma.todo.delete({ where: { id } });
    return new Response(null, { status: 204 });
  })
  .listen(3000);

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`);
