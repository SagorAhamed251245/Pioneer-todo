import TodoManagement from "@/component/pages/private/todo/todo-management";
import { Plus } from "lucide-react";
import React from "react";

const TodoPage = () => {
  return (
    <div className="p-3 rounded-lg mt-12 flex-1 mb-12  flex flex-col">
      <TodoManagement />
    </div>
  );
};

export default TodoPage;
