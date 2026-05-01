"use client";
import { authClient } from "@/app/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export default function SigninButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { data } = authClient.useSession();
  const baseStyles = "border bg-white/20 rounded-md p-1 border-black/20";
  return (
    <>
      {!data && (
        <Link href={"/signin"} className={cn(baseStyles, className)}>
          {children ? children : "label"}
        </Link>
      )}
    </>
  );
}
