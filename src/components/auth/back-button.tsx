import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
interface BackButton {
  label: string;
  href: string;
}
const BackButton = ({ label, href }: BackButton) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
