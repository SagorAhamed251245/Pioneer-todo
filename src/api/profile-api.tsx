"use server";
import { TUser } from "@/types";
import { baseApi } from "./base-api";

export const profileApi = async (
  token: string
): Promise<TUser & { ok: boolean; detail?: string }> => {
  const res = await fetch(baseApi(`/api/users/me/`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 300 },
  });

  return res.json();
};
