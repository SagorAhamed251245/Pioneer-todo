import LoginProvider from "@/provider/LoginProvider";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <LoginProvider>{children}</LoginProvider>;
};

export default AuthLayout;
