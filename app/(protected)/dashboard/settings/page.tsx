import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";
import { getSession } from "@/lib/helpers";

export default async function Settings() {
  const session = await getSession();

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
