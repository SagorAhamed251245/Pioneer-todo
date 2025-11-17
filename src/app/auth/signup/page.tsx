import SignupForm from "@/component/pages/auth/signup/signup-form";
import Image from "next/image";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex items-center h-screen">
      {/* Left Image Section */}
      <div className="w-3/7 h-full flex items-center justify-center bg-[#E2ECF8]">
        <Image
          src="/poster-woman-holding-up-blue-box-that-says-log-cabin-it.png"
          width={1920}
          height={1080}
          alt="Signup Illustration"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Right Content Section */}
      <div className="w-4/7 h-full bg-white flex flex-col items-center justify-center mx-auto">
        <p className="text-2xl md:text-3xl font-bold text-background-dark text-center">
          Create your account
        </p>

        <p className="text-base text-grey text-center mb-6">
          Start managing your tasks efficiently
        </p>

        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
