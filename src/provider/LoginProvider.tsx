"use client";

import { storage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React from "react";

const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const token = storage.get("access");
  const router = useRouter();
  if (token) {
    router.push("/");
  } else {
    return <>{children}</>;
  }
};

export default LoginProvider;
