"use server";

import { prisma } from "@/lib/prisma";
import { TodoSchema, TodoFormData } from "@/lib/validate";
import { revalidatePath } from "next/cache";

export async function addTodo(data: TodoFormData) {
  const validatedData = TodoSchema.parse({ ...data, completed: false });

  await prisma.todo.create({
    data: validatedData,
  });

  revalidatePath("/");
}

export async function toggleTodo(id: number, completed: boolean) {
  await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
}
