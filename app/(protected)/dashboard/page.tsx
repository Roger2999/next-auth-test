import { getUser, verifySession } from "@/app/lib/dal";

export default async function Dashboard() {
  await verifySession();
  const user = await getUser();
  return (
    <div className="text-2xl text-black">
      <h2>Welcome {user?.username}</h2>
    </div>
  );
}
