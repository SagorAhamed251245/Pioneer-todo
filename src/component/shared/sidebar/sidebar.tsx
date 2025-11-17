"use client";
import { TUser } from "@/types";
import { storage } from "@/utils/storage";
import { cn } from "@/utils/utils";
import { House, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo, useEffect } from "react";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();

  const storedUser = storage.get("user");
  const profile: TUser = storedUser ? JSON.parse(storedUser) : ({} as TUser);

  const handelLogout = () => {
    storage.clear();
    router.push("/auth/login");
  };

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
          <p className="font-bold">
            {profile.first_name} {profile.last_name}
          </p>
          <p className="text-sm">{profile.email}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center w-full">
        <div className="space-y-5 flex-1 w-full">
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
        <div
          className={cn(
            "text-grey flex w-full cursor-pointer items-center gap-3 pl-12  py-5  transition-all  duration-1000 ease-in-out",
            "hover:bg-linear-to-r hover:from-[#003087] hover:to-background-dark"
          )}
          onClick={handelLogout}
        >
          <LogOut />
          Logout
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
