"use server";

import { signIn } from "@/auth";
import { getTwoFactorTokenEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/authRoutes";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { LoginSchema } from "@/schemas";
import { error } from "console";
import { AuthError } from "next-auth";
import * as z from "zod";
import { prisma } from "../lib/db";
import { getTwoFactorConfirmationEmailByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenEmail(email);
      if (!twoFactorToken) {
        return { error: "Invalid token" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code" };
      }
      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired" };
      }
      await prisma.twoFactorTokenEmail.delete({
        where: {
          id: twoFactorToken.id,
        },
      });
      const existingConfirmation = await getTwoFactorConfirmationEmailByUserId(
        existingUser.id
      );
      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }
      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }

  try {
    // await signIn("credentials", values);
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    // console.log(error);

    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
  return { success: "Email sent" };
};
