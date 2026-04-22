"use client";
import { useActionState } from "react";
import { signout } from "../app/(auth)/actions/auth-actions";
import { authClient } from "@/app/lib/auth-client";

export default function SignoutButton() {
  const INITIAL_STATE = {
    success: false,
    message: undefined,
    errors: undefined,
  };
  const [state, action, pending] = useActionState(signout, INITIAL_STATE);
  const { data } = authClient.useSession();
  if (!data) return null;

  return (
    <form action={action}>
      <button className="border rounded-md" disabled={pending}>
        {pending ? "Loading..." : "Signout"}
      </button>
      {state.errors && <p>{state.errors.message}</p>}
    </form>
  );
}
