"use server";
import { auth } from "@/app/lib/auth";
import {
  SigninFormSchema,
  SigninFormState,
  SignupFormSchema,
  SignupFormState,
} from "@/lib/zod";
import { APIError } from "better-auth";
import { headers } from "next/headers";

import { redirect } from "next/navigation";
import z from "zod";

export async function signupWithCredentials(
  prevState: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const fields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const validateFields = SignupFormSchema.safeParse(fields);
  if (!validateFields.success) {
    return {
      data: fields,
      message: "Validation error",
      success: false,
      dbErrors: null,
      validationErrors: z.flattenError(validateFields.error).fieldErrors,
    };
  }
  const { username, email, password } = validateFields.data;
  try {
    await auth.api.signUpEmail({
      body: { name: username, email, password },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError)
      return {
        data: fields,
        success: false,
        dbErrors: {
          status: 404,
          name: "dbError",
          message: error.message,
        },
        validationErrors: null,
      };
    // return {
    //   success: false,
    //   message: undefined,
    //   dbErrors: {
    //     status: 404,
    //     name: "dbError",
    //     message: "Unexpected error",
    //   },
    //   validationErrors: null,
    // };
  }
  redirect("/verify-email-sent");
}
export async function signinWithCredentials(
  prevState: SigninFormState,
  formData: FormData,
): Promise<SigninFormState> {
  const fields = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const validateFields = SigninFormSchema.safeParse(fields);
  if (!validateFields.success) {
    return {
      data: fields,
      message: "Validation error",
      success: false,
      dbErrors: null,
      validationErrors: z.flattenError(validateFields.error).fieldErrors,
    };
  }
  const { email, password } = validateFields.data;
  try {
    await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === "FORBIDDEN") {
        return {
          message: "email_not_verified",
        };
      }
      return {
        data: fields,
        success: false,
        dbErrors: {
          message: error.message,
        },
        validationErrors: null,
      };
    }
    return {
      data: fields,
      success: false,
      dbErrors: {
        message: "Unexpected error",
      },
      validationErrors: null,
    };
  }
  redirect("/dashboard");
}
// export async function sendVerifictationEmail(email: string) {
//   try {
//     await auth.api.sendVerificationEmail({
//       body: {
//         email,
//         callbackURL: "/dashboard",
//       },
//     });
//     return {
//       success: true,
//     };
//   } catch (error) {
//     if (error instanceof APIError) {
//       return { message: error.message };
//     }
//   }
// }
