import { redirect } from "next/navigation";
import { getSession } from "@/lib/helpers";
import LinkButton from "@/components/ui/link-button";

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
    <div>
      <LinkButton type="neutral" href="/settings">
        Settings
      </LinkButton>
      {children}
    </div>
  );
}
