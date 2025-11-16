"use client";
import { profileApi } from "@/api/profile-api";
import { storage } from "@/utils/storage";
import { useEffect } from "react";

const Dashboard = () => {
  const token = storage.get("access");
  const fetchProfile = async () => {
    const profile = await profileApi(token as string);

    if (profile.id) {
      storage.set("user", JSON.stringify(profile));
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return <div>Dashboard</div>;
};

export default Dashboard;
