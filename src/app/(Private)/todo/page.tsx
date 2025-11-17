import { getTodoApi } from "@/api/todo-api";
import TodoManagement from "@/component/pages/private/todo/todo-management";
import { cookies } from "next/headers";
import React from "react";

const TodoPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access");

  const todosRes = await getTodoApi(token?.value as string);

  console.log({ todosRes });

  return (
    <div className="p-3 rounded-lg mt-12 flex-1 mb-12  flex flex-col">
      <TodoManagement todosRes={todosRes} />
    </div>
  );
};

export default TodoPage;
