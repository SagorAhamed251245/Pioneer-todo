"use client";
import { storage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = storage.get("access");
  const router = useRouter();
  if (token) {
    return <>{children}</>;
  } else {
    router.push("/auth/login");
  }
};

export default AuthProvider;
