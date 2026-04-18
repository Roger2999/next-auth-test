import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession();
  
  if (!session) {
    redirect("/signin");
  }
  
  return (
    <div className="text-2xl text-black">
      <h2>Welcome {session.user.name}</h2>
    </div>
  );
}