"use client";

import { useActionState, useEffect } from "react";
import { signupWithCredentials } from "../actions/auth";
import { FormState } from "@/lib/zod";
import SignupFormError from "../components/field-error";
import { useRouter } from "next/navigation";

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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            defaultValue={formState.data?.username}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="username"
            type="text"
          />
          <SignupFormError error={formState.validationErrors?.username} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            defaultValue={formState.data?.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="email"
            type="email"
          />
          <SignupFormError error={formState.validationErrors?.email} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            defaultValue={formState.data?.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="password"
            type="password"
          />
          <SignupFormError error={formState.validationErrors?.password} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm pasword
          </label>
          <input
            defaultValue={formState.data?.confirmPassword}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="confirmPassword"
            type="password"
          />
          <SignupFormError
            error={formState.validationErrors?.confirmPassword}
          />
        </div>

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
