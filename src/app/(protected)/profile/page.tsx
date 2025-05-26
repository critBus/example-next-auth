"use client";
import React from "react";
import { auth } from "@/auth";
const Page = async () => {
  const session = await auth();
  if (session?.user) {
    return (
      <div>
        <div>
          <span>User:</span>
          <span>{session?.user.email}</span>
        </div>
      </div>
    );
  }

  return <div>Page</div>;
};

export default Page;
