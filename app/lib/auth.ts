import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: process.env.GITHUB_CLIENT_ID
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : undefined,
  trustedOrigins: [
    "https://next-auth-roger.vercel.app",
    "http://localhost:3000",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Reset your password",
        html: `
          <h2>Recupera tu contraseña</h2>
          <p>Haz clic en el enlace para resetear tu contraseña:</p>
          <a href="${url}">Resetear contraseña</a>
          <p>El enlace expira en 1 hora.</p>
        `,
        text: `Click the link to reset your password: ${url}`,
      });
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Password for ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email address",
        html: `
          <h2>Verifica tu cuenta</h2>
          <p>Haz clic en el enlace para verificar tu correo:</p>
          <a href="${url}">Verificar correo</a>
          <p>El enlace expira en 24 horas.</p>
        `,
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-client-ip"],
      disableIpTracking: false,
    },
  },
  plugins: [nextCookies()],

  onAPIError: {
    errorURL: "/signin?error=auth_failed",
  },
});
