import { getSession } from "@/lib/helpers";

export default async function Dashboard() {
  const session = await getSession();

  return (
    <div className="text-2xl">
      <h2>Welcome to dashboard {session?.user.name}</h2>
    </div>
  );
}
