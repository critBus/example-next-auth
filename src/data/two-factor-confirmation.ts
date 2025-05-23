import { prisma } from "@/lib/db";

export const getTwoFactorConfirmationEmailByUserId = async (userId: string) => {
  try {
    const response = await prisma.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
    return response;
  } catch {
    return null;
  }
};
