import LoginForm from "@/component/pages/auth/login/login-form";
import SignupForm from "@/component/pages/auth/signup/signup-form";
import Image from "next/image";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center h-screen">
      {/* Left Side Image */}
      <div className="w-3/7 h-full flex items-center justify-center bg-[#E2ECF8]">
        <Image
          src="/poster-woman-holding-up-blue-box-that-says-log-cabin-it.png"
          width={1920}
          height={1080}
          alt="Login Illustration"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Side Content */}
      <div className="w-4/7 h-full flex flex-col items-center justify-center">
        <p className="text-2xl md:text-3xl font-bold text-background-dark text-center">
          Log in to your account
        </p>
        <p className="text-base text-grey text-center mb-6">
          Start managing your tasks efficiently
        </p>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
