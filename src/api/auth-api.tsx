import { TLoginRes, TUserLogin, TUserSignup } from "@/types";
import { baseApi } from "./base-api";

export const signupApi = async (
  query: TUserSignup
): Promise<TUserSignup & { ok: boolean; detail?: string }> => {
  const res = await fetch(baseApi(`/api/users/signup/`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  return res.json();
};

export const loginApi = async (
  query: TUserLogin
): Promise<TLoginRes & { ok: boolean; detail?: string }> => {
  const res = await fetch(baseApi(`/api/auth/login/`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  return res.json();
};
