"use client";

import { cn } from "@/utils/utils";
import { ArrowUpDown, Search } from "lucide-react";
import React, { useState } from "react";

const SearchTodo = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-full h-9">
        <input
          type="text"
          name="search"
          className="w-full h-full bg-white rounded-lg border border-grey pl-1 pr-3 outline-none"
        />

        <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary h-full w-9 rounded flex items-center justify-center">
          <Search className="size-4 text-white" />
        </span>
      </div>

      {/* FILTER BY DROPDOWN */}
      <div className="relative w-[150px] h-9">
        {/* Button */}
        <button
          onClick={() => setOpen(!open)}
          className="border border-grey h-9 px-4 w-full rounded-lg flex items-center gap-2 bg-white"
        >
          Filter By
          <ArrowUpDown size={16} />
        </button>

        {/* Dropdown */}
        <div
          className={cn(
            "absolute right-0 mt-2 w-56 bg-white border border-grey shadow-lg rounded-lg p-3 z-50 transition-all duration-200 origin-top",
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <h4 className="text-sm font-medium mb-2">Date</h4>
          <div className="border-b mb-2" />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Deadline Today
            </label>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Expires in 5 days
            </label>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Expires in 10 days
            </label>

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              Expires in 30 days
            </label>
          </div>
        </div>

        {/* BACKDROP */}
        {open && (
          <div
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SearchTodo;
