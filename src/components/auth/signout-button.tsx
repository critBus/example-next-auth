import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/actions/logout";

const SignoutButton = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Button type="submit" onClick={logout}>
      {children ? children : "Sign out"}
    </Button>
  );
};

export default SignoutButton;
