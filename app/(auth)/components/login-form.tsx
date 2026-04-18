"use client";
import { SigninFormState } from "@/lib/zod";
import SignupFormError from "./field-error";
import { useActionState } from "react";
import { signin } from "../actions/auth";
import CustomInput from "./custom-input";

const INITIAL_STATE: SigninFormState = {
  success: false,
  message: undefined,
  dbErrors: null,
  validationErrors: null,
};
export default function LoginForm() {
  const [formState, formAction, pending] = useActionState(
    signin,
    INITIAL_STATE,
  );
  return (
    <form
      className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-4"
      action={formAction}
    >
      <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
      <CustomInput
        label="Email"
        name={"email"}
        type={"text"}
        defaultValue={formState.data?.email}
      >
        <SignupFormError error={formState.validationErrors?.email} />
      </CustomInput>
      <CustomInput
        label="Password"
        name={"password"}
        type={"password"}
        defaultValue={formState.data?.password}
      >
        <SignupFormError error={formState.validationErrors?.password} />
      </CustomInput>

      <button
        disabled={pending}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Loading..." : "Sign In"}
      </button>
      {formState.dbErrors && (
        <p className="text-red-500 text-sm">{formState.dbErrors.message}</p>
      )}
    </form>
  );
}
