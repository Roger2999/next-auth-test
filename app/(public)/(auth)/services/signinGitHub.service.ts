"use client";

import { authClient } from "@/app/lib/auth-client";
import { Dispatch, SetStateAction } from "react";

export const signInGitHub = (
  onErrorChange: Dispatch<SetStateAction<string | null>>,
  onLoadingChange: Dispatch<SetStateAction<boolean>>,
) => {
  onLoadingChange(true);

  return authClient.signIn.social(
    {
      provider: "github",
      callbackURL: "/dashboard",
    },
    {
      onRequest: () => {
        onLoadingChange(true);
      },
      onError: (ctx) => {
        console.error("Better Auth error:", ctx.error);
        onErrorChange(ctx.error.message ?? "Unknown error");
        onLoadingChange(false);

        setTimeout(() => {
          onErrorChange(null);
        }, 6000);
      },
    },
  );
};
