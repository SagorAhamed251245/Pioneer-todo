"use client";

import { cn } from "@/utils/utils";
import { ArrowUpDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
}

const SearchTodo = ({ search, onSearchChange }: Props) => {
  const [open, setOpen] = useState(false);

  const filters = [
    { label: "Deadline Today", value: "today" },
    { label: "Expires in 5 days", value: "5days" },
    { label: "Expires in 10 days", value: "10days" },
    { label: "Expires in 30 days", value: "30days" },
  ];

  return (
    <div className="flex items-center gap-3 mb-6">
      {/* SEARCH INPUT */}
      <div className="relative w-full h-9">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full h-full bg-white rounded-lg border border-grey pl-2 pr-10 outline-none"
        />

        <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary h-full w-9 rounded flex items-center justify-center">
          <Search className="size-4 text-white" />
        </span>
      </div>

      {/* FILTER DROPDOWN */}
      <div className="relative w-[150px] h-9">
        <button
          onClick={() => setOpen(!open)}
          className="border border-grey h-9 px-4 w-full rounded-lg flex items-center justify-between bg-white"
        >
          {"Filter By"}
          <ArrowUpDown size={16} />
        </button>

        {/* Dropdown Panel */}
        <div
          className={cn(
            "absolute right-0 mt-2 w-56 bg-white border border-grey shadow-lg rounded-lg p-3 z-50 transition-all duration-200 origin-top",
            open
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <h4 className="text-sm font-medium mb-2">Filter Tasks</h4>
          <div className="border-b mb-2" />

          <div className="space-y-2">
            {filters.map((f) => (
              <label
                key={f.value}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input type="radio" className="w-4 h-4" readOnly />
                {f.label}
              </label>
            ))}
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
