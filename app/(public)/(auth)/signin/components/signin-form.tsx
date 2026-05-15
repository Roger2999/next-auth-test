"use client";

import SignupFormError from "../../components/field-error";
import { useActionState } from "react";

import CustomInput from "../../components/custom-input";
import { signinWithCredentials } from "../../actions/auth-actions";
import Link from "next/link";
import { SigninFormState } from "@/lib/types";

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
      className="w-full max-w-md space-y-4 rounded-lg p-8 shadow-md"
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
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Loading..." : "Sign In"}
      </button>
      {formState.message === "email_not_verified" && (
        <p className="text-center">Email no verificado</p>
      )}
      {formState.dbErrors && (
        <p className="text-center text-sm text-red-500">
          {formState.dbErrors.message}
        </p>
      )}
    </form>
  );
}
