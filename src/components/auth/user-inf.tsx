import { ExtendedUser } from "@/auth";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}
const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between shadow-md border p-3 rounded-lg">
          <p className="text-sm font-medium">ID</p>
          <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-300 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between shadow-md border p-3 rounded-lg">
          <p className="text-sm font-medium">Name</p>
          <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-300 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between shadow-md border p-3 rounded-lg">
          <p className="text-sm font-medium">Email</p>
          <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-300 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between shadow-md border p-3 rounded-lg">
          <p className="text-sm font-medium">Email</p>
          <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-300 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between shadow-md border p-3 rounded-lg">
          <p className="text-sm font-medium">2FA</p>
          <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
          {/* <p className=" truncate text-xs max-w-[180px] font-mono p-1 bg-slate-300 rounded-md">
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </p> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
