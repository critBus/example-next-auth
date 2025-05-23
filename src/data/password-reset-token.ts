import { prisma } from "@/lib/db";

export const getPasswordResetTokenEmailByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.resetPasswordTokenEmail.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.resetPasswordTokenEmail.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
