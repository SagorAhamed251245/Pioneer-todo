"use client";

import React, { ReactNode, useState } from "react";
import Sidebar from "@/component/shared/sidebar/sidebar";
import Navbar from "@/component/shared/navbar/navbar";
import AuthProvider from "@/provider/AuthProvider";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar
          open={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <div className="flex-1 lg:ml-0 ml-0 w-full">
          <Navbar toggleSidebar={() => setSidebarOpen(true)} />

          <div className="min-h-[calc(100vh-64px)] px-4 md:px-10 lg:px-14 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default PrivateLayout;
