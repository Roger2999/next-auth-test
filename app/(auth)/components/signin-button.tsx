"use client";
import { authClient } from "@/app/lib/auth-client";

import Link from "next/link";

export default function SigninButton() {
  const { data } = authClient.useSession();
  if (data) return null;
  return (
    <Link
      className="text-blue-500 hover:text-blue-600 border rounded-md w-20 p-1 text-center"
      href="/signin"
    >
      Sign in
    </Link>
  );
}
