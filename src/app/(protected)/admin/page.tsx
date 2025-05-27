"use client";
import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import React from "react";
import { toast } from "sonner";

const Page = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    });
  };
  const onApirouteClick = () => {
    fetch("api/admin").then((response) => {
      if (response.ok) {
        console.log("ok");
        toast.success("OK");
      } else {
        console.log("error not permission");
        toast.error("error not permission");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🔑Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole="ADMIN">Hola</RoleGate>
        <div className="flex flex-row items-center justify-between shadow-md border p-3 rounded-lg">
          <p className="text-sm font-medium">Admin only api route</p>
          <Button onClick={onApirouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between shadow-md border p-3 rounded-lg">
          <p className="text-sm font-medium">Admin only server action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
