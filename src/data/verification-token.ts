import { prisma } from "@/lib/db";

export const getVerificationTokenEmailByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationTokenEmail.findUnique({
      where: {
        token,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationTokenEmail.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch {
    return null;
  }
};
