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
  });

  return res.json();
};

export const updateProfile = async ({
  token,
  data,
}: {
  token: string;
  data: Partial<TUser>;
}): Promise<TUser & { ok: boolean; detail?: string }> => {
  const res = await fetch(baseApi(`/api/users/me/`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
