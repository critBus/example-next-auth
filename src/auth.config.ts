import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

const customAuthProvider = Credentials({
  async authorize(credentials) {
    try {
      const validatedFields = LoginSchema.safeParse(credentials);
      if (validatedFields.success) {
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          return null;
        }
        const passwordMath = await bcrypt.compare(password, user.password);
        if (passwordMath) {
          return user;
        }
      }
    } catch (error) {
      console.log("error en credentials");
      console.log(error);
    }

    return null;
  },
});
// /
export default {
  providers: [GitHub, Google, customAuthProvider],
} satisfies NextAuthConfig;
