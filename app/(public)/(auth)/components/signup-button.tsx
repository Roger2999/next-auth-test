"use client";
import { authClient } from "@/app/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export default function SignupButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { data } = authClient.useSession();

  if (data) return null;
  const baseStyles = "bg-white/20 border rounded-md p-1 border-black/20";
  return (
    <>
      {!data && (
        <Link
          href={"/signup"}
          className={cn(`bg-background ${baseStyles}`, className)}
        >
          {children ? children : "label"}
        </Link>
      )}
    </>
  );
}
