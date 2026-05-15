import { auth } from "@/app/lib/auth";

import { headers } from "next/headers";

import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";

export default async function Settings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="mx-auto mt-10 max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">Configuración</h1>
      <SettingsForm user={session.user} />
    </div>
  );
}
