"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SignupButton({ children, className, onClick }: Props) {
  const baseStyles = "bg-white/20 border rounded-md p-1 border-black/20";

  return (
    <Link
      href={"/signup"}
      className={cn(`bg-background ${baseStyles}`, className)}
      onClick={onClick}
    >
      {children ? children : "label"}
    </Link>
  );
}
