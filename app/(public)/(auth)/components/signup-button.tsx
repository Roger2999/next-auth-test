"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SignupButton({ children, className }: Props) {
  const baseStyles = "bg-white/20 border rounded-md p-1 border-black/20";

  return (
    <Link
      href={"/signup"}
      className={cn(`bg-background ${baseStyles}`, className)}
    >
      {children ? children : "label"}
    </Link>
  );
}
