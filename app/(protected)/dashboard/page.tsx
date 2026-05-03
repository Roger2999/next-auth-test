import { auth } from "@/app/lib/auth";

import { headers } from "next/headers";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="text-2xl">
      <h2>Welcome to dashboard {session.user.name}</h2>
      <h3>Your ip address is {session?.session?.ipaddress??"Unknown"}</h3>
    </div>
  );
}
