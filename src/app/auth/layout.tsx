import React from "react";
import { Suspense } from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <div>{children}</div>
    </Suspense>
  );
};

export default Layout;
