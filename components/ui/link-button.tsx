"use client";
import { authClient } from "@/app/lib/auth-client";
import { cn } from "@/lib/utils";

import Link from "next/link";
interface Props extends React.ComponentProps<"a"> {
  type?: "neutral" | "destructive" | "success" | "link";
}
export default function LinkButton({
  className,
  children,
  type = "neutral",
  ...props
}: Props) {
  const { data } = authClient.useSession();

  if (data) return null;
  const baseStyles = "text-md p-1";
  return (
    <Link
      href={"/"}
      {...props}
      type={type}
      className={cn(
        baseStyles,
        className,

        type === "neutral" &&
          "border rounded-md p-1 bg-gray-400 border-black/20 hover:text-gray-800",
        type === "destructive" &&
          "border rounded-md p-1 bg-gray-400 border-black/20 hover:text-gray-800",
        type === "success" &&
          "border rounded-md p-1 bg-gray-400 border-black/20 hover:text-gray-800",
        type === "link" &&
          "hover:border-b-4 hover:border-b-gray-700 hover:text-blue-600 transition-all duration-100",
      )}
    >
      {children ? children : "label"}
    </Link>
  );
}
