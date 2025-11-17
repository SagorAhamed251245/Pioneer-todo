import { getTodoApi } from "@/api/todo-api";
import TodoManagement from "@/component/pages/private/todo/todo-management";
import { cookies } from "next/headers";
import React from "react";

const TodoPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const cookieStore = await cookies();
  const search = (await searchParams).search;

  const token = cookieStore.get("access");

  const todosRes = await getTodoApi(token?.value as string, {
    search: search || "",
  });

  return (
    <div className="p-3 rounded-lg mt-12 flex-1 mb-12  flex flex-col">
      <TodoManagement token={token?.value as string} initialTodo={todosRes} />
    </div>
  );
};

export default TodoPage;
