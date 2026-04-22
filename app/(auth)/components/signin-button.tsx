import { auth } from "@/app/lib/auth";

import { headers } from "next/headers";
import Link from "next/link";

export default async function SigninButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) return null;
  return (
    <Link
      className="text-blue-500 hover:text-blue-600 border rounded-md w-20 p-1 text-center"
      href="/signin"
    >
      Sign in
    </Link>
  );
}
