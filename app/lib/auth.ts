import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from:"Auth app <onboarding@resend.dev>",
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
  plugins: [nextCookies()],
  socialProviders: process.env.GITHUB_CLIENT_ID
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : undefined,
  onAPIError: {
    errorURL: "/signin?error=auth_failed",
  },
});
