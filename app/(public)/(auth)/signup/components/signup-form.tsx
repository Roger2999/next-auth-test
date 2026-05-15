"use client";
import { useActionState } from "react";

import { SignupFormState } from "@/lib/types";
import CustomInput from "../../components/custom-input";
import { signupWithCredentials } from "../../actions/auth-actions";
import SignupFormError from "../../components/field-error";
import ImageUploadButton from "../../../../../components/ui/upload-button";

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
      className="w-full max-w-md space-y-4 rounded-lg p-8 shadow-md"
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
        className="w-full rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Creating account..." : "Sign Up"}
      </button>
      {formState.dbErrors && (
        <p className="text-sm text-red-500">{formState.dbErrors.message}</p>
      )}
    </form>
  );
}
