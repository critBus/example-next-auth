import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
const SENT_EMAIL = false;
const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  console.log({
    to,
    subject,
    html,
  });
  if (SENT_EMAIL) {
    return await resend.emails.send({
      from: "onboarding@resend.dev",
      to: to,
      subject: subject,
      html: html,
    });
  }
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  return await sendEmail({
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA Code ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;
  return await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset password</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  return await sendEmail({
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
  });
};
