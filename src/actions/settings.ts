"use server";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return { error: "Unautorized" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unautorized" };
  }
  await prisma.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });
};
