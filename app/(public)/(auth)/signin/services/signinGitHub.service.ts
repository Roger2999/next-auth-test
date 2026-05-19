"use client";

import { authClient } from "@/app/lib/auth-client";
import { BetterFetchError } from "better-auth/react";
import { Dispatch, SetStateAction } from "react";

export const signInGitHub = async (
  onErrorChange?: Dispatch<
    SetStateAction<(BetterFetchError & Record<string, unknown>) | undefined>
  >,
  onLoadingChange?: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    onLoadingChange?.(true);
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/dashboard",
      },
      {
        onError: (ctx) => {
          onErrorChange?.(ctx.error);
          setTimeout(() => {
            onErrorChange?.(undefined);
          }, 6000);
        },
        onRequest: () => {
          onLoadingChange?.(true);
        },
      },
    );
  } catch (error) {
    console.error("GitHub sign in error:", error);
    onErrorChange?.({
      status: 500,
      statusText: "Failed to sign in with GitHub",
    } as BetterFetchError & Record<string, unknown>);
  } finally {
    onLoadingChange?.(false);
  }
};
