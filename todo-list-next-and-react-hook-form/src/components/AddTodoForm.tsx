"use client";

import { addTodo } from "@/app/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoFormSchema, TodoFormData } from "@/lib/validate";

export function AddTodoForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(TodoFormSchema),
  });

  const onSubmit = async (data: TodoFormData) => {
    await addTodo(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <input
        {...register("title")}
        placeholder="New todo"
        className="flex-grow px-2 py-1 border rounded text-gray-800"
        aria-label="New todo"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded"
      >
        Add
      </button>
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
    </form>
  );
}
