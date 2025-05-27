"use client";
import UserInfo from "@/components/auth/user-inf";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import React from "react";

const Page = () => {
  const user = useCurrentUser();
  return <UserInfo label="💻Server Component" user={user} />;
};

export default Page;
