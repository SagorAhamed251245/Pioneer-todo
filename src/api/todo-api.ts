"use server";
import { TTodo, TTodoRes } from "@/types/todo.type";
import { baseApi } from "./base-api";
import { updateTag } from "next/cache";

export const getTodoApi = async (
  token: string,
  query?: { search?: string; todo_date?: string }
) => {
  const params = new URLSearchParams();

  if (query?.search) params.append("search", query.search);
  if (query?.todo_date) params.append("todo_date", query.todo_date);

  const url = baseApi(`/api/todos/?${params.toString()}`);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ["update-todo", "add-todo"] },
  });

  return res.json();
};

export const addTodoApi = async (
  token: string,
  data: Partial<TTodo>
): Promise<TTodo> => {
  const res = await fetch(baseApi(`/api/todos/`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  updateTag("add-todo");

  return res.json();
};

export const updateTodoApi = async (
  token: string,
  data: Partial<TTodo>
): Promise<TTodo> => {
  const res = await fetch(baseApi(`/api/todos/${data.id}/`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  updateTag("update-todo");

  return res.json();
};

export const deleteTodoApi = async (
  token: string,
  id: number
): Promise<TTodoRes> => {
  const res = await fetch(baseApi(`/api/todos/${id}/`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  updateTag("delete-todo");

  return res.json();
};
