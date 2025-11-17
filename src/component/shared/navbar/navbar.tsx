"use client";

import { getTodayDayAndDate } from "@/utils/utils";
import { Bell, CalendarDays, Menu } from "lucide-react";
import Image from "next/image";
import React from "react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { dayName, formattedDate } = getTodayDayAndDate();

  return (
    <div className="h-16 bg-background px-5 md:px-14 flex items-center justify-between">
      <button
        className="lg:hidden text-background-dark"
        onClick={toggleSidebar}
      >
        <Menu className="size-6" />
      </button>

      <Image
        src={"/logo.png"}
        width={105}
        height={32}
        alt="Logo"
        className="hidden lg:block"
      />

      <div className="flex items-center gap-5">
        <span className="bg-primary p-2 rounded-lg text-white">
          <Bell className="size-4" />
        </span>
        <span className="bg-primary p-2 rounded-lg text-white">
          <CalendarDays className="size-4" />
        </span>
        <div className="text-background-dark text-right">
          <p>{dayName}</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
