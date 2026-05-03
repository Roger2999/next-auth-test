import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});
