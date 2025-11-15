import Navbar from "@/component/shared/navbar/navbar";
import React, { ReactNode } from "react";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-14">
      <Navbar />
      <div className="bg-grey min-h-[calc(100vh-64px)]">{children}</div>
    </div>
  );
};

export default PrivateLayout;
