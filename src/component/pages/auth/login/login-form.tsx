"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const SignUpSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});
type TSignUp = z.infer<typeof SignUpSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

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

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember_me"
              name="remember_me"
              value="remember_me"
              className="size-5"
            />
            <label htmlFor="remember_me">Remember me</label>
            <br></br>
          </div>
          <Link
            href={"#"}
            className="text-primary cursor-pointer hover:underline"
          >
            Forgot your password?
          </Link>
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
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-primary underline">
            Register now
          </a>
        </p>
      </form>
    </div>
  );
};
export default LoginForm;
