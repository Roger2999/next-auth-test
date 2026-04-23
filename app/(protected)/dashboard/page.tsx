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
    <div className="text-2xl">
      <h2>Welcome {session.user.name}</h2>
      {session && session.user.image && (
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={session?.user?.image}
            alt="alt"
            fill
            priority
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
