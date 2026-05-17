"use client";
import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsButton() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/dashboard/settings" && (
        <Link
          className="flex w-full justify-between rounded-md border-0 p-2"
          href="/dashboard/settings"
        >
          Settings
          <Settings />
        </Link>
      )}
    </>
  );
}
