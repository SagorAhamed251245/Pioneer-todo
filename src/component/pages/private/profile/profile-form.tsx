"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),
  number: z.string().min(1, "Contact number is required"),
  dob: z.string().min(1, "Date of birth is required"),
});

type TProfile = z.infer<typeof profileSchema>;

const ProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfile>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: TProfile) => {
    console.log("Form data:", data);
  };

  return (
    <div className="w-full mt-9">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* FIRST + LAST NAME */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-black font-semibold">
              First Name
            </label>
            <input
              className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-black font-semibold">
              Last Name
            </label>
            <input
              className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <label className="block mb-1 text-black font-semibold">Email</label>
          <input
            className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* ADDRESS + CONTACT NUMBER */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-black font-semibold">
              Address
            </label>
            <input
              className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-black font-semibold">
              Contact Number
            </label>
            <input
              className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
              {...register("number")}
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className="block mb-1 text-black font-semibold">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
            {...register("dob")}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob.message}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}

        <div className="flex items-center justify-center gap-6">
          <button
            type="submit"
            className="w-[200px] px-3 bg-primary text-white h-10 rounded-lg hover:bg-primary/90"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-[200px] bg-grey text-white h-10 rounded-lg hover:bg-grey/90"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
