"use server";

import { prisma } from "@/lib/prisma";
import { TodoSchema } from "@/lib/validate";
import { revalidatePath } from "next/cache";

export async function addTodo(formData: FormData) {
  const title = formData.get("title") as string;
  const validatedData = TodoSchema.parse({ title, completed: false });

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
