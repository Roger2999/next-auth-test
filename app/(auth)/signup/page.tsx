"use client";

import { useActionState } from "react";
import { signupWithCredentials } from "../actions/auth";
import { FormState } from "@/lib/zod";
import SignupFormError from "../components/field-error";
import CustomInput from "../components/custom-input";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  dbErrors: null,
  validationErrors: null,
};
export default function Signin() {
  const [formState, formAction, pending] = useActionState(
    signupWithCredentials,
    INITIAL_STATE,
  );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md space-y-4"
        action={formAction}
      >
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
        <CustomInput
          label="Username"
          name={"username"}
          type={"text"}
          defaultValue={formState.data?.username}
        >
          <SignupFormError error={formState.validationErrors?.username} />
        </CustomInput>

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
        <CustomInput
          label="Confirm password"
          name={"confirmPassword"}
          type={"password"}
          defaultValue={formState.data?.confirmPassword}
        >
          <SignupFormError
            error={formState.validationErrors?.confirmPassword}
          />
        </CustomInput>

        <button
          disabled={pending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? "Creating account..." : "Sign Up"}
        </button>
        {formState.dbErrors && (
          <p className="text-red-500 text-sm">{formState.dbErrors.message}</p>
        )}
        {!formState.dbErrors && formState.success && (
          <p className="text-green-500 text-sm">{formState.message}</p>
        )}
      </form>
    </div>
  );
}
