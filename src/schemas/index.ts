import * as z from "zod";
export const SettingsSchema = z.object({
  name: z.optional(
    z.string().min(1, {
      message: "Name is required",
    })
  ),
});
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
