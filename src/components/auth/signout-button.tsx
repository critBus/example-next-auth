import { signOut } from "@/auth";
import React from "react";
import { Button } from "../ui/button";

const SignoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Sign out</Button>
    </form>
  );
};

export default SignoutButton;
