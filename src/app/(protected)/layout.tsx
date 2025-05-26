import ProtectedLayout from "@/components/layout/ProtectedLayout";
import React from "react";
import Navbar from "./_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedLayout>
      <div className="mb-4">
        <Navbar />
      </div>

      {children}
    </ProtectedLayout>
  );
};

export default Layout;
