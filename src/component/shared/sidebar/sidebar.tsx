"use client";
import { cn } from "@/utils/utils";
import { House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="w-2/12 h-screen flex flex-col gap-12 bg-background-dark">
      <div className="flex justify-center flex-col items-center w-full">
        <div className="size-21.5 rounded-full overflow-hidden mt-20 ">
          <Image
            src={"/user.jpeg"}
            width={80}
            height={60}
            className="w-full h-auto object-cover"
            alt="/user image"
          />
        </div>
        <div className="text-white text-center mt-3">
          <p className="font-bold">amanuel</p>
          <p className="text-sm">amanuel@gmail.com</p>
        </div>
      </div>

      <div>
        <div className="space-y-5">
          <Link
            href={"/"}
            className={cn(
              "text-grey flex items-center gap-3 pl-12  py-5  transition-all  duration-1000 ease-in-out",
              "hover:bg-linear-to-r hover:from-[#003087] hover:to-background-dark",
              path === "/" &&
                "bg-linear-to-r from-[#003087] to-background-dark text-white"
            )}
          >
            <House />
            Dashboard
          </Link>
          <Link
            href={"/todo"}
            className={cn(
              "text-grey flex items-center gap-3 pl-12  py-5 hover:bg-linear-to-r from-[#003087] to-background-dark",
              path === "/todo" &&
                "bg-linear-to-r from-[#003087] to-background-dark text-white"
            )}
          >
            <House />
            Todo
          </Link>
          <Link
            href={"/profile"}
            className={cn(
              "text-grey flex items-center gap-3 pl-12  py-5 hover:bg-linear-to-r from-[#003087] to-background-dark",
              path === "/profile" &&
                "bg-linear-to-r from-[#003087] to-background-dark text-white"
            )}
          >
            <House className="" />
            Account Information
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
