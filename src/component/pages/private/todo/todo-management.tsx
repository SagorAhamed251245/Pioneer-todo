"use client";
import React, { useEffect, useState } from "react";
import SearchTodo from "./search-todo";
import TodosBody from "./todos-body";
import { Plus } from "lucide-react";
import AddTaskForm from "./add-task-form";
import { TTodoRes } from "@/types/todo.type";

const TodoManagement = ({ todosRes }: { todosRes: TTodoRes }) => {
  const [openForm, setOpenForm] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-4xl font-semibold">Todo</p>
        <button
          onClick={() => setOpenForm(true)}
          className="bg-primary px-4 text-white py-2 rounded-lg flex items-center justify-center"
        >
          <Plus /> New Task
        </button>
      </div>

      <hr className="w-9  border-2  border-primary mb-6" />

      <div className="flex-1  flex flex-col">
        <SearchTodo />
        <TodosBody todos={todosRes.results} />
      </div>

      {openForm && (
        <>
          {/* BACKDROP */}
          <div className="fixed inset-0 bg-black/40 z-50" />

          {/* MODAL */}
          <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto">
            <div className="w-full max-w-3xl px-4">
              <AddTaskForm onClose={() => setOpenForm(false)} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoManagement;
