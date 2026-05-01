"use client";
import { SigninFormState } from "@/lib/zod";
import SignupFormError from "./field-error";
import { useActionState } from "react";

import CustomInput from "./custom-input";
import { signinWithCredentials } from "../actions/auth-actions";
import Link from "next/link";

const INITIAL_STATE: SigninFormState = {
  data: undefined,
  success: false,
  message: undefined,
  dbErrors: null,
  validationErrors: null,
};
export default function SigninForm() {
  const [formState, formAction, pending] = useActionState(
    signinWithCredentials,
    INITIAL_STATE,
  );
  return (
    <form
      className="w-full max-w-md p-8 rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <CustomInput
        label="Email"
        name={"email"}
        type={"text"}
        defaultValue={formState.data?.email}
      >
        <SignupFormError error={formState.validationErrors?.email} />
      </CustomInput>
      <CustomInput label="Password" name={"password"} type={"password"}>
        <SignupFormError error={formState.validationErrors?.password} />
      </CustomInput>
      <div className="text-right text-sm">
        <Link
          href="/forgot-password"
          className="text-muted-foreground hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <button
        disabled={pending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Loading..." : "Sign In"}
      </button>
      {formState.message === "email_not_verified" && (
        <p className="text-center">Email no verificado</p>
      )}
      {formState.dbErrors && (
        <p className="text-red-500 text-sm text-center">
          {formState.dbErrors.message}
        </p>
      )}
    </form>
  );
}
