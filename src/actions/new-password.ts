"use server";
import { getPasswordResetTokenEmailByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { prisma } from "@/lib/db";
export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }
  const { password } = validateFields.data;
  const existingToken = await getPasswordResetTokenEmailByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "User does not exist" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });
  await prisma.resetPasswordTokenEmail.delete({
    where: { id: existingToken.id },
  });
  return { success: "Password Updated" };
};
