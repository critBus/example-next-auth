"use client";
import SignoutButton from "@/components/auth/signout-button";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const session = useSession();
  return (
    <div className="flex  flex-col">
      <SignoutButton />
      {session.data?.user && <div>User: {session.data?.user.email}</div>}
    </div>
  );
};

export default Page;
