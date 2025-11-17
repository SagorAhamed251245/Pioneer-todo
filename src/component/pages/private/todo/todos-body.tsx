"use client";

import React, { useState } from "react";
import TodoItem from "./todo-item";
import { GripVertical } from "lucide-react";
import { TTodo } from "@/types/todo.type";
import { storage } from "@/utils/storage";
import { deleteTodoApi, updateTodoApi } from "@/api/todo-api";
import Image from "next/image";

const TodosBody = ({ todos }: { todos: TTodo[] }) => {
  const [draggedTask, setDraggedTask] = useState<TTodo | null>(null);
  const token = storage.get("access");

  const handleDragStart = (todo: TTodo) => {
    setDraggedTask(todo);
  };

  const handleDrop = async (targetPriority: "extreme" | "moderate" | "low") => {
    if (!draggedTask) return;

    await updateTodoApi(token as string, {
      ...draggedTask,
      priority: targetPriority,
    });

    setDraggedTask(null);
  };

  const handleDelete = async (id: number) => {
    const res = await deleteTodoApi(token as string, id);
    console.log({ res });
  };

  const extremeTasks = todos?.filter((t) => t.priority === "extreme");
  const moderateTasks = todos?.filter((t) => t.priority === "moderate");
  const lowTasks = todos?.filter((t) => t.priority === "low");

  return todos.length < 1 ? (
    <div className="flex-1 bg-white mt-8 rounded-lg flex flex-col">
      <div className="flex-1 flex justify-center items-center flex-col">
        <Image
          src={"/icon-no projects.png"}
          height={216}
          width={240}
          alt="icon-no projects.png"
        />
        <p>No todos yet</p>
      </div>
    </div>
  ) : (
    <div className="grid flex-1 grid-cols-1 lg:grid-cols-3 gap-2 mt-6 ">
      {" "}
      <Column
        priority="extreme"
        columnTasks={extremeTasks}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDelete={handleDelete}
      />
      <Column
        priority="moderate"
        columnTasks={moderateTasks}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDelete={handleDelete}
      />
      <Column
        priority="low"
        columnTasks={lowTasks}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TodosBody;

const Column = ({
  priority,
  columnTasks,
  onDragStart,
  onDrop,
  onDelete,
}: {
  priority: "extreme" | "moderate" | "low";
  columnTasks: TTodo[];
  onDragStart: (todo: TTodo) => void;
  onDrop: (priority: "extreme" | "moderate" | "low") => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 ">
      {/* HEADER */}

      {/* DROP AREA */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onDrop(priority)}
        className="flex-1 space-y-3 w-full "
      >
        {columnTasks?.length > 0 ? (
          columnTasks.map((todo) => (
            <div
              key={todo.id}
              draggable
              onDragStart={() => onDragStart(todo)}
              className="cursor-grab active:cursor-grabbing group w-full"
            >
              <TodoItem
                title={todo.title}
                description={todo.description}
                dueDate={todo.todo_date}
                priority={todo.priority}
                onEdit={() => {}}
                onDelete={() => onDelete(todo.id)}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm font-medium">
            Drop todos here
          </div>
        )}
      </div>
    </div>
  );
};
