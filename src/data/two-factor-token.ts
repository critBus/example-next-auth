import { prisma } from "@/lib/db";

export const getTwoFactorTokenEmailByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.twoFactorTokenEmail.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.twoFactorTokenEmail.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
