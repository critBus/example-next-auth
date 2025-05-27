"use client";
import { settings } from "@/actions/settings";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
const Page = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const handlerClickSettings = () => {
    startTransition(() => {
      settings({
        name: "new name",
      }).then(() => {
        update();
      });
    });
  };
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: "",
    },
  });

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙ Settings</p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={handlerClickSettings}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
};

export default Page;
