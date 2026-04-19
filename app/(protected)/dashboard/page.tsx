import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="text-2xl text-black">
      <h2>Welcome {session.user.name}</h2>
      {session && session.user.image && (
        <div className="relative">
          <Image src={session?.user?.image} alt="alt" fill priority />
        </div>
      )}
    </div>
  );
}
