"use client";
import { profileApi } from "@/api/profile-api";
import { storage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = storage.get("access");
  const router = useRouter();

  const fetchProfile = async () => {
    const profile = await profileApi(token as string);

    if (profile.id) {
      storage.set("user", JSON.stringify(profile));
    }
  };
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (token) {
    return <>{children}</>;
  } else {
    router.push("/auth/login");
  }
};

export default AuthProvider;
