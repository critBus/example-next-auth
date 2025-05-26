import UserInfo from "@/components/auth/user-inf";
import { currentUser } from "@/lib/auth";
import React from "react";

const Page = async () => {
  const user = await currentUser();
  return <UserInfo label="💻Server Component" user={user} />;
};

export default Page;
