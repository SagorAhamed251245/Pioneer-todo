"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import React from "react";
import { addTodoApi, updateTodoApi } from "@/api/todo-api";
import { storage } from "@/utils/storage";
import { toast } from "sonner";
import { TTodo as TTodoType } from "@/types/todo.type";

// Schema
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  todo_date: z.string().min(1, "Date is required"),
  priority: z.string<"extreme" | "moderate" | "low">({
    error: "Select one priority",
  }),
  is_completed: z.boolean().optional(), // Now boolean
  description: z.string().min(1, "Description is required"),
});

type TTodo = z.infer<typeof taskSchema>;

const AddTaskForm = ({
  onClose,
  todo,
  onDelete,
}: {
  onClose: React.Dispatch<boolean>;
  todo?: TTodoType;
  onDelete?: ((id: number) => void) | undefined;
}) => {
  const token = storage.get("access");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTodo>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: todo?.description || "",
      priority: todo?.priority,
      title: todo?.title,
      todo_date: todo?.todo_date,
      is_completed: todo?.is_completed ?? false, // default to false
    },
  });

  const onSubmit = async (data: TTodo) => {
    if (todo) {
      const res = await updateTodoApi(token as string, {
        ...data,
        id: todo.id,
      });
      if (res?.id) {
        console.log({ res });
        toast.success("Todo Added sussfully");
        onClose(false);
      } else {
        toast.error("Something was wrong");
      }
    } else {
      const res = await addTodoApi(token as string, data);
      if (res.id) {
        toast.success("Todo Added sussfully");
        onClose(false);
      } else {
        toast.error("Something was wrong");
      }
    }
  };

  return (
    <div className=" max-w-3xl mt-10 mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-lg font-semibold ">
            {todo ? "Update the task" : "Add New Task"}
          </p>
          <hr className="w-9  border-2  border-primary" />
        </div>
        <button
          className="text-sm underline text-black font-semibold cursor-pointer"
          onClick={() => onClose(false)}
        >
          Go Back
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* TITLE */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            className="w-full border border-grey px-3 py-2 rounded-lg"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* DATE */}
        <div>
          <label className="block mb-1 font-semibold">Date</label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-grey px-3 py-2 rounded-lg"
              {...register("todo_date")}
            />
          </div>
          {errors.todo_date && (
            <p className="text-red text-sm">{errors.todo_date.message}</p>
          )}
        </div>

        {/* PRIORITY */}
        <div>
          <label className="block mb-2 font-semibold">Priority</label>

          <div className="flex items-center gap-6">
            {/* Extreme */}
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <span className="size-2 bg-red-600 rounded-full"></span>
              Extreme
              <input
                type="radio"
                value="extreme"
                {...register("priority")}
                className="w-4 h-4 text-red-600 focus:ring-red-500 size-4"
              />
            </label>

            {/* Moderate */}
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <span className="size-2 bg-green-500 rounded-full"></span>
              Moderate
              <input
                type="radio"
                value="moderate"
                {...register("priority")}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
            </label>

            {/* Low */}
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <span className="size-2 bg-yellow-500 rounded-full"></span>
              Low
              <input
                type="radio"
                value="low"
                {...register("priority")}
                className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
              />
            </label>
          </div>

          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* COMPLETED */}
        {todo && (
          <div>
            <label className="block mb-2 font-semibold">Completed</label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                {...register("is_completed")}
                className="w-5 h-5 text-[#5A6FF0] rounded focus:ring-[#5A6FF0]"
              />
              <span>Mark as completed</span>
            </label>
          </div>
        )}

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-semibold">Task Description</label>
          <textarea
            rows={6}
            placeholder="Start writing here....."
            className="w-full border border-grey px-3 py-2 rounded-lg resize-none"
            {...register("description")}
          ></textarea>
          {errors.description && (
            <p className="text-red text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="submit"
            className="px-6 h-10 bg-[#5A6FF0] text-white rounded-lg hover:bg-[#4a5ed9]"
          >
            Done
          </button>

          {todo && onDelete && (
            <button
              type="button"
              className="p-3 bg-red text-white rounded-lg hover:bg-red"
              onClick={() => onDelete(todo.id)}
            >
              <Trash2 className="size-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
