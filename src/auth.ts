import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import async from "./middleware";
import { getTwoFactorConfirmationEmailByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    isOAuth: boolean;
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
    // async redirect({ url, baseUrl }) {
    //   // Permite redirección solo si la url es del mismo origen
    //   if (url.startsWith(baseUrl)) {
    //     return url;
    //   }
    //   // Permite rutas relativas
    //   if (url.startsWith("/")) {
    //     return `${baseUrl}${url}`;
    //   }
    //   // Fallback
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }
        session.user.isTwoFactorEnabled = !!token.isTwoFactorEnabled;
        session.user.name = token.name;
        if (token.email) {
          session.user.email = token.email;
        }
        session.user.isOAuth = token.isOAuth;
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
          const existingAccount = await getAccountByUserId(existingUser.id);
          token.isOAuth = !!existingAccount;
          token.role = existingUser.role;
          token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
          token.name = existingUser.name;
          token.email = existingUser.email;
        }
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
