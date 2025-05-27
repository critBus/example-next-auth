import { UserRole } from "@prisma/client";
import * as z from "zod";
export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(1, {
        message: "Name is required",
      })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email("Email is required")),
    password: z.optional(z.string().min(3)),
    newPassword: z.optional(z.string().min(3)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "New Password is required!", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: "Password is required!", path: ["password"] }
  );
export const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string(),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string(),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email("Email is required"),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(3, "Minimum 6 characters requirid"),
});
