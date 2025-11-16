"use client";

import React, { useState } from "react";
import TodoItem from "./todo-item";
import { GripVertical } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "extreme" | "moderate" | "low";
}

const TodosBody = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Backend Infrastructure",
      description: "Upgrading backend infrastructure for better performance",
      dueDate: "Apr 15, 2025",
      priority: "extreme",
    },
    {
      id: 5,
      title: "Security Audit",
      description: "Conduct comprehensive security audit of all systems",
      dueDate: "Feb 28, 2025",
      priority: "extreme",
    },
    {
      id: 2,
      title: "Mobile App Redesign",
      description:
        "Redesigning the mobile app interface for better user experience",
      dueDate: "Mar 25, 2025",
      priority: "moderate",
    },
    {
      id: 4,
      title: "Database Optimization",
      description: "Optimize database queries and improve response times",
      dueDate: "May 10, 2025",
      priority: "moderate",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Creating a new analytics dashboard for clients",
      dueDate: "Mar 30, 2025",
      priority: "low",
    },
    {
      id: 6,
      title: "Documentation Update",
      description: "Update API documentation and add new examples",
      dueDate: "Apr 5, 2025",
      priority: "low",
    },
  ]);

  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (targetPriority: "extreme" | "moderate" | "low") => {
    if (!draggedTask) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggedTask.id ? { ...t, priority: targetPriority } : t
      )
    );

    setDraggedTask(null);
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const extremeTasks = tasks.filter((t) => t.priority === "extreme");
  const moderateTasks = tasks.filter((t) => t.priority === "moderate");
  const lowTasks = tasks.filter((t) => t.priority === "low");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-6">
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
  columnTasks: Task[];
  onDragStart: (task: Task) => void;
  onDrop: (priority: "extreme" | "moderate" | "low") => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* HEADER */}

      {/* DROP AREA */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => onDrop(priority)}
        className="flex-1 space-y-3 w-full"
      >
        {columnTasks.length > 0 ? (
          columnTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => onDragStart(task)}
              className="cursor-grab active:cursor-grabbing group w-full"
            >
              <TodoItem
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
                onEdit={() => {}}
                onDelete={() => onDelete(task.id)}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm font-medium">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};
