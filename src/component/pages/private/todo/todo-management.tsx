"use client";
import React, { useEffect, useState } from "react";
import SearchTodo from "./search-todo";
import TodosBody from "./todos-body";
import { Plus } from "lucide-react";
import AddTaskForm from "./add-task-form";
import { TTodo, TTodoRes } from "@/types/todo.type";
import { useRouter } from "next/navigation";

const TodoManagement = ({
  initialTodo,
}: {
  token: string;
  initialTodo: TTodoRes;
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (search) {
      router.push(`/todo?search=${search}`);
    } else {
      router.push(`/todo`);
    }
  }, [search, router]);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-4xl font-semibold">Todo</p>
        <button
          onClick={() => setOpenForm(true)}
          className="bg-primary px-4 text-white py-2 rounded-lg flex items-center gap-2"
        >
          <Plus /> New Task
        </button>
      </div>

      <hr className="w-9 border-2 border-primary mb-6" />

      {/* Search + Content */}
      <div className="flex flex-col flex-1">
        <SearchTodo search={search} onSearchChange={setSearch} />

        <TodosBody todos={initialTodo.results as TTodo[]} />
      </div>

      {/* Add Task Modal */}
      {openForm && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 z-50" />

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
