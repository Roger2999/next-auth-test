"use client";

import { authClient } from "@/app/lib/auth-client";
import { BetterFetchError } from "better-auth/react";
import { Dispatch, SetStateAction } from "react";

export const siginGitHUb = async (
  onErrorChange: Dispatch<
    SetStateAction<(BetterFetchError & Record<string, unknown>) | undefined>
  >,
  onLoadingChange: Dispatch<SetStateAction<boolean>>,
) => {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          onErrorChange(ctx.error);
          setTimeout(() => {
            onErrorChange(undefined);
          }, 6000);
        },
      },
    );
  }
};
