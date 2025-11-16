import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function getTodayDayAndDate() {
  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const formattedDate = today.toLocaleDateString("en-GB");

  return { dayName, formattedDate };
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
