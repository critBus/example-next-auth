import React from "react";

import { logout } from "@/actions/logout";

const LogoutButton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <span className="cursor-pointer" onClick={logout}>
      {children ? children : "Sign out"}
    </span>
  );
};

export default LogoutButton;
