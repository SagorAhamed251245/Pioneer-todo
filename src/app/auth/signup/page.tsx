import SignupForm from "@/component/pages/auth/signup/signup-form";
import Image from "next/image";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex items-center h-screen">
      <div className="w-3/7 h-full flex items-center justify-center bg-[#E2ECF8]">
        <Image
          src={"/poster-woman-holding-up-blue-box-that-says-log-cabin-it.png"}
          width={1920}
          height={1080}
          alt="poster-woman-holding-up-blue-box-that-says-log-cabin-it.png"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className=" flex items-center justify-center   h-full  w-4/7">
        <div>
          <div className="text-center">
            <p className=" text-2xl md:text-3xl font-bold text-background-dark">
              Create your account
            </p>
            <p className="text-base text-grey ">
              Start managing your tasks efficiently
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
