"use client";

import { TUser } from "@/types";
import { storage } from "@/utils/storage";
import { cn } from "@/utils/utils";
import { House, LogOut, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { memo } from "react";

const Sidebar = ({
  open,
  closeSidebar,
}: {
  open: boolean;
  closeSidebar: () => void;
}) => {
  const path = usePathname();
  const router = useRouter();

  const storedUser = storage.get("user");
  const profile: TUser = storedUser ? JSON.parse(storedUser) : ({} as TUser);

  const handelLogout = () => {
    storage.clear();
    router.push("/auth/login");
  };

  return (
    <>
      {open && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
        />
      )}

      <div
        className={cn(
          "fixed lg:sticky h-screen top-0 left-0 bg-background-dark transition-all duration-300 z-50",
          "min-w-80 lg:w-2/12",
          "flex flex-col justify-between",
          open ? "translate-x-0" : "-translate-x-80",
          "lg:translate-x-0"
        )}
      >
        <button
          onClick={closeSidebar}
          className="lg:hidden absolute top-4 right-4 text-white"
        >
          <X />
        </button>

        <div>
          <div className="flex justify-center flex-col items-center w-full">
            <div className="size-21.5 rounded-full overflow-hidden mt-20">
              <Image
                src={"/user.jpeg"}
                width={80}
                height={60}
                className="w-full h-auto object-cover"
                alt="/user image"
              />
            </div>

            <div className="text-white text-center mt-3 px-3">
              <p className="font-bold wrap-break-word">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-sm wrap-break-word">{profile.email}</p>
            </div>
          </div>

          <div className="flex flex-col items-center w-full mt-10">
            <div className="space-y-5 w-full">
              <Link
                href="/"
                className={cn(
                  "text-grey flex items-center gap-3 pl-12 py-5 hover:bg-linear-to-r from-[#003087] to-background-dark",
                  path === "/" &&
                    "bg-linear-to-r from-[#003087] to-background-dark text-white"
                )}
              >
                <House /> Dashboard
              </Link>

              <Link
                href="/todo"
                className={cn(
                  "text-grey flex items-center gap-3 pl-12 py-5 hover:bg-linear-to-r from-[#003087] to-background-dark",
                  path === "/todo" &&
                    "bg-linear-to-r from-[#003087] to-background-dark text-white"
                )}
              >
                <House /> Todo
              </Link>

              <Link
                href="/profile"
                className={cn(
                  "text-grey flex items-center gap-3 pl-12 py-5 hover:bg-linear-to-r from-[#003087] to-background-dark",
                  path === "/profile" &&
                    "bg-linear-to-r from-[#003087] to-background-dark text-white"
                )}
              >
                <House /> Account Information
              </Link>
            </div>
          </div>
        </div>

        <div
          className="text-grey flex w-full cursor-pointer items-center gap-3 pl-12 py-5 hover:bg-linear-to-r hover:from-[#003087] hover:to-background-dark"
          onClick={handelLogout}
        >
          <LogOut /> Logout
        </div>
      </div>
    </>
  );
};

export default memo(Sidebar);
