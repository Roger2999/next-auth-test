"use client";
import { useActionState } from "react";
import CustomInput from "./custom-input";
import SignupFormError from "./field-error";
import { SignupFormState } from "@/lib/zod";
import { signupWithCredentials } from "../actions/auth-actions";
import ImageUploadButton from "./upload-button";

export default function SignupForm() {
  const INITIAL_STATE: SignupFormState = {
    data: undefined,
    success: false,
    message: undefined,
    dbErrors: null,
    validationErrors: null,
  };
  const [formState, formAction, pending] = useActionState(
    signupWithCredentials,
    INITIAL_STATE,
  );
  return (
    <form
      className="w-full max-w-md p-8 rounded-lg shadow-md space-y-4"
      action={formAction}
    >
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
      <CustomInput label="Password" name={"password"} type={"password"}>
        <SignupFormError error={formState.validationErrors?.password} />
      </CustomInput>
      <CustomInput
        label="Confirm password"
        name={"confirmPassword"}
        type={"password"}
      >
        <SignupFormError error={formState.validationErrors?.confirmPassword} />
      </CustomInput>
      <ImageUploadButton
        name="image"
        error={formState.validationErrors?.image}
      />

      <button
        disabled={pending}
        className="w-full bg-blue-600  py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Creating account..." : "Sign Up"}
      </button>
      {formState.dbErrors && (
        <p className="text-red-500 text-sm">{formState.dbErrors.message}</p>
      )}
    </form>
  );
}
