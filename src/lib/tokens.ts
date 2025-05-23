import crypto from "crypto";
import { getVerificationTokenEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/db";
import { getPasswordResetTokenEmail } from "../data/password-reset-token";
import { getTwoFactorTokenEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getTwoFactorTokenEmail(email);
  if (existingToken) {
    await prisma.twoFactorTokenEmail.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.twoFactorTokenEmail.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenEmail(email);
  if (existingToken) {
    await prisma.resetPasswordTokenEmail.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.resetPasswordTokenEmail.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getVerificationTokenEmail(email);
  if (existingToken) {
    await prisma.verificationTokenEmail.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const verificationToken = await prisma.verificationTokenEmail.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
