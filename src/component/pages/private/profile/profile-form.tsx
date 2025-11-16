// components/profile-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TUser } from "@/types";
import { storage } from "@/utils/storage";
import UploadImage from "./upload-image";
import { useState } from "react";
import { updateProfile } from "@/api/profile-api";
import { toast } from "sonner";

const profileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  contact_number: z.string().min(1, "Contact number is required"),
  birthday: z.string().min(1, "Date of birth is required"),
});

type TProfile = z.infer<typeof profileSchema>;

const ProfileForm = () => {
  const storedUser = storage.get("user");
  const profile: TUser = storedUser ? JSON.parse(storedUser) : ({} as TUser);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const token = storage.get("access");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: profile?.first_name ?? "",
      last_name: profile?.last_name ?? "",
      email: profile?.email ?? "",
      address: profile?.address ?? "",
      contact_number: profile?.contact_number ?? "",
      birthday: profile?.birthday ?? "",
    },
  });

  const onSubmit = async (data: TProfile) => {
    const payload = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined) {
        payload.append(key, value as string);
      }
    });

    if (selectedFile) {
      payload.append("image", selectedFile);
    }

    const res = await updateProfile({ token: token as string, data: data });

    if (res.email) {
      storage.set("user", JSON.stringify(res));
      toast.success("Profile updated");
      console.log(res);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <UploadImage
        onFileSelect={setSelectedFile}
        preview={profile?.profile_image ?? null}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-9 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-black">
              First Name
            </label>
            <input
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Last Name
            </label>
            <input
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">Email</label>
          <input
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold text-black">
              Address
            </label>
            <input
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
              {...register("address")}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold text-black">
              Contact Number
            </label>
            <input
              className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
              {...register("contact_number")}
            />
            {errors.contact_number && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact_number.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-black">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full rounded-lg border border-[#D1D5DB] px-3 py-2"
            {...register("birthday")}
          />
          {errors.birthday && (
            <p className="mt-1 text-sm text-red-600">
              {errors.birthday.message}
            </p>
          )}
        </div>

        <div className="flex justify-center gap-6">
          <button
            type="submit"
            className="w-[200px] rounded-lg bg-primary py-2.5 font-medium text-white hover:bg-primary/90"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-[200px] rounded-lg bg-gray-500 py-2.5 font-medium text-white hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
