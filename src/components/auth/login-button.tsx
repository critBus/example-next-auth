"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const handlerClick = () => {
    router.push("/auth/login");
    console.log("click me !!!");
  };
  if (mode == "modal") {
    return <span>"sin implementar"</span>;
  }
  return (
    <span className="cursor-pointer" onClick={handlerClick}>
      {children}
    </span>
  );
};

export default LoginButton;
