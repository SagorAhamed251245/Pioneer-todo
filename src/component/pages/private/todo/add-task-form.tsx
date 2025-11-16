"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Trash2 } from "lucide-react";
import React from "react";

// Schema
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  priority: z.enum<string[]>(["extreme", "moderate", "low"], {
    error: "Select one priority",
  }),
  description: z.string().min(1, "Description is required"),
});

type TTask = z.infer<typeof taskSchema>;

const AddTaskForm = ({ onClose }: { onClose: React.Dispatch<boolean> }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTask>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TTask) => {
    console.log("Task Data:", data);
  };

  return (
    <div className=" max-w-3xl mt-10 mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-lg font-semibold ">Add New Task</p>
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
              {...register("date")}
            />
          </div>
          {errors.date && (
            <p className="text-red text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* PRIORITY */}
        <div>
          <label className="block mb-2 font-semibold">Priority</label>

          <div className="flex items-center gap-6">
            {/* Extreme */}
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <span className="w-2 h-2 bg-red rounded-full"></span>
              Extreme
              <input
                type="checkbox"
                value="extreme"
                {...register("priority")}
                className="w-4 h-4"
              />
            </label>

            {/* Moderate */}
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Moderate
              <input
                type="checkbox"
                value="moderate"
                {...register("priority")}
                className="w-4 h-4"
              />
            </label>

            {/* Low */}
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Low
              <input
                type="checkbox"
                value="low"
                {...register("priority")}
                className="w-4 h-4"
              />
            </label>
          </div>

          {errors.priority && (
            <p className="text-red text-sm">{errors.priority.message}</p>
          )}
        </div>

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

          <button
            type="button"
            className="p-3 bg-red text-white rounded-lg hover:bg-red"
          >
            <Trash2 className="size-5"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
