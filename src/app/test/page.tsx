import { prisma } from "@/lib/db";
import React from "react";

const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1>The users</h1>
      <span>Cantidad: {users.length}</span>
      {users.map((user) => (
        <span key={user.id}>{user.email}</span>
      ))}
    </div>
  );
};

export default Page;
