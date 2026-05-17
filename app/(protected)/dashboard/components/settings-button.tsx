"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsButton() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/dashboard/settings" && (
        <Link
          className="bg-accent-foreground/20 rounded-md border-0 p-1"
          href="/dashboard/settings"
        >
          Settings
        </Link>
      )}
    </>
  );
}
