import React from "react";
import { Toaster } from "sonner";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      <div
        className="flex h-screen flex-col items-center justify-center 
    bg-radial-[at_50%_0%] to-90%
    from-sky-400 to-blue-800"
      >
        {children}
      </div>
    </>
  );
};

export default GlobalLayout;
