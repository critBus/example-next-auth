import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import async from "./middleware";
import { getTwoFactorConfirmationEmailByUserId } from "./data/two-factor-confirmation";

type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      if (user.id) {
        const existingUser = await getUserById(user.id);
        if (existingUser?.emailVerified) {
          if (existingUser.isTwoFactorEnabled) {
            const twoFactorConfirmation =
              await getTwoFactorConfirmationEmailByUserId(existingUser.id);
            if (!twoFactorConfirmation) {
              return false;
            }
            await prisma.twoFactorConfirmation.delete({
              where: { id: twoFactorConfirmation.id },
            });
            //return true;
          }
          return true;
        }
      }

      return false;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
      }

      return session;
    },
    async jwt({ token, user, account, profile, trigger }) {
      switch (trigger) {
        case "signIn":
          break;
        case "signUp":
          break;
        case "update":
          break;
      }
      if (token.sub) {
        const existingUser = await getUserById(token.sub);
        if (existingUser) {
          token.role = existingUser.role;
        }
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
