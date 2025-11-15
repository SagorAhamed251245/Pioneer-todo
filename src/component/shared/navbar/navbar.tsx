import { getTodayDayAndDate } from "@/utils/utils";
import { Bell, CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const { dayName, formattedDate } = getTodayDayAndDate();

  return (
    <div className="h-16 bg-background flex items-center justify-between">
      <Image src={"/logo.png"} width={105} height={32} alt="Logo" />
      <div className="flex items-center gap-5">
        <span className="bg-primary p-2 rounded-lg text-white">
          <Bell className="size-4" />
        </span>
        <span className="bg-primary p-2 rounded-lg text-white">
          <CalendarDays className="size-4" />
        </span>
        <div className="text-background-dark">
          <p>{dayName}</p>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
