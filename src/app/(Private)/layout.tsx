import Navbar from "@/component/shared/navbar/navbar";
import Sidebar from "@/component/shared/sidebar/sidebar";
import AuthProvider from "@/provider/AuthProvider";
import React, { ReactNode } from "react";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        <div className="w-10/12">
          <Navbar />
          <div className="min-h-[calc(100vh-64px)] px-14 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default PrivateLayout;
