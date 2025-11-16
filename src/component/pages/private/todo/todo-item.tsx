"use client";

import React from "react";
import { Pencil, Trash2, MoreVertical, GripVertical } from "lucide-react";

interface TodoItemProps {
  title: string;
  description: string;
  dueDate: string;
  priority: "extreme" | "moderate" | "low";
  onEdit?: () => void;
  onDelete?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  title,
  description,
  dueDate,
  priority,
  onEdit,
  onDelete,
}) => {
  const priorityConfig = {
    extreme: {
      bg: "bg-red/10",
      text: "text-red",
      border: "border-red/20",
    },
    moderate: {
      bg: "bg-green/10",
      text: "text-green",
      border: "border-green/20",
    },
    low: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      border: "border-yellow-200",
    },
  };

  const { bg, text, border } = priorityConfig[priority];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-grey hover:shadow-md transition-all duration-200 hover:border-gray-200">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-semibold text-black flex-1 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1  rounded text-xs font-medium whitespace-nowrap ${bg} ${text} border ${border} shrink-0`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
          <GripVertical className="w-4 h-4 text-grey mt-1 group-hover:text-gray-600 shrink-0" />
        </div>
      </div>

      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-grey">
        <span className="text-xs text-gray-500">
          Due <span className="font-medium text-gray-700">{dueDate}</span>
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-blue-100 transition-colors"
            aria-label="Edit task"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 rounded-lg bg-red/10 text-red hover:bg-red/20 transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
