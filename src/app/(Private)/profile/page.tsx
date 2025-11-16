import ProfileForm from "@/component/pages/private/profile/profile-form";
import UploadImage from "@/component/pages/private/profile/upload-image";
import React from "react";

const ProfilePage = () => {
  return (
    <div className="p-3 rounded-lg bg-white mt-12 flex-1 mb-12">
      <p className="text-2xl font-semibold">Account Information </p>

      <hr className="w-[161px]  border-2  border-primary mb-6" />

      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
