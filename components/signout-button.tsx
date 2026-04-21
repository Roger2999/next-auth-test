"use client";
import { useActionState } from "react";
import { signout } from "../app/(auth)/actions/auth-actions";

export default function SignoutButton() {
  const INITIAL_STATE = {
    success: false,
    message: undefined,
    errors: undefined,
  };
  const [state, action, pending] = useActionState(signout, INITIAL_STATE);
  return (
    <form action={action}>
      <button className="border rounded-md" disabled={pending}>
        {pending ? "Loading..." : "Signout"}
      </button>
      {state.errors && <p>{state.errors.message}</p>}
    </form>
  );
}
