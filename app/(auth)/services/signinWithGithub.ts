"use client";
import { authClient } from "@/lib/auth-client";

export const siginGitHUb = async () => {
  await authClient.signIn.social(
    {
      provider: "github",
      callbackURL: "/dashboard",
    },
    {
      onRequest: () => {
        // Loading state
      },
      onError: (ctx) => {
        alert(ctx.error.statusText);
      },
    },
  );
};
