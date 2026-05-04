"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SigninButton({ children, className, onClick }: Props) {
  const baseStyles = "border bg-white/20 rounded-md p-1 border-black/20";

  return (
    <Link
      href={"/signin"}
      className={cn(baseStyles, className)}
      onClick={onClick}
    >
      {children ? children : "label"}
    </Link>
  );
}
