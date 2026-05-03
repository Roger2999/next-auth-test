"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SigninButton({ children, className }: Props) {
  const baseStyles = "border bg-white/20 rounded-md p-1 border-black/20";

  return (
    <Link href={"/signin"} className={cn(baseStyles, className)}>
      {children ? children : "label"}
    </Link>
  );
}
