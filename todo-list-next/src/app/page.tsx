import { prisma } from "@/lib/prisma";
import { TodoList } from "@/components/TodoList";
import { AddTodoForm } from "@/components/AddTodoForm";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    select: {
      id: true,
      title: true,
      completed: true,
    },
  });

  return (
    <main className="max-w-4xl mx-auto mt-4 ml-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <AddTodoForm />
      <TodoList todos={todos} />
    </main>
  );
}
