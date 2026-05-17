"use client";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { signout } from "../actions/auth-actions";

interface Props {
  className?: string;
}

export default function SignoutButton({ className }: Props) {
  const initialState = {
    success: false,
    message: undefined,
    errors: null,
  };
  const [state, action, pending] = useActionState(signout, initialState);
  const baseStyles =
    "cursor-pointer border bg-white/20 rounded-md p-1 border-black/20";

  return (
    <form action={action}>
      <button className={cn(baseStyles, className)}>
        {pending ? "Loading..." : "Signout"}
      </button>
      {state.errors && <p>{state.errors.message}</p>}
    </form>
  );
}
