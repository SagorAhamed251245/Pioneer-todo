"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignUpSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type TSignUp = z.infer<typeof SignUpSchema>;

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignUp>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = (data: TSignUp) => {
    console.log("Form data:", data);
  };

  return (
    <div className="w-full max-w-lg mt-9">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* FIRST + LAST NAME */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1  text-black font-[500px]">
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
            <label className="block mb-1 text-black font-[500px]">
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
          <label className="block mb-1 text-black font-[500px]">Email</label>
          <input
            className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <label className="block mb-1 text-black font-medium">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
            {...register("password")}
          />

          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            {showPassword ? (
              <Eye className="text-primary size-4" />
            ) : (
              <EyeOff className="text-primary size-4" />
            )}
          </span>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <label className="block mb-1 text-black font-medium">
            Confirm Password
          </label>

          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full border border-[#D1D5DB] px-3 py-2 rounded-lg"
            {...register("confirmPassword")}
          />

          {/* Eye Icon */}
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? (
              <Eye className="text-primary size-4" />
            ) : (
              <EyeOff className="text-primary size-4" />
            )}
          </span>

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-primary text-white h-10 rounded-lg hover:bg-primary/90"
        >
          Sign Up
        </button>

        {/* LOGIN TEXT */}
        <p className="text-center mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-primary underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};
export default SignupForm;
