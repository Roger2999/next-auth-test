import { redirect } from "next/navigation";
import { getSession } from "@/lib/helpers";

import BackButton from "./dashboard/components/back-button";
import SettingsButton from "./dashboard/components/settings-button";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }
  return (
    <>
      <div className="flex justify-end gap-5 p-3 px-8">
        <BackButton />
        <SettingsButton />
      </div>
      {children}
    </>
  );
}
