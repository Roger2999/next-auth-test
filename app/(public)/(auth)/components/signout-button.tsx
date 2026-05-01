"use client";
import { cn } from "@/lib/utils";

import { ReactNode, useActionState } from "react";
import { signout } from "../actions/auth-actions";

export default function SignoutButton({
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [state, action, pending] = useActionState(signout, {});
  const baseStyles = "border bg-white/20 rounded-md p-1 border-black/20";

  return (
    <>
      <form action={action}>
        <button className={cn(baseStyles, className)}>
          {pending ? "Loading..." : "Signout"}
        </button>
        {state.errors && <p>{state.errors.message}</p>}
      </form>
    </>
  );
}
