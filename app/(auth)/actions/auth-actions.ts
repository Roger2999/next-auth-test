"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  SigninFormSchema,
  SigninFormState,
  SignoutState,
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
      data: { email: fields.email, username: fields.username },
      message: "Validation error",
      success: false,
      dbErrors: null,
      validationErrors: z.flattenError(validateFields.error).fieldErrors,
    };
  }
  const { username, email, password } = validateFields.data;
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { name: username }],
    },
  });
  if (existingUser) {
    return {
      data: { email, username },
      success: false,
      dbErrors: {
        name: "dbError",
        message:
          existingUser.email === email
            ? "An account with this email already exists"
            : "An account with this username already exists",
      },
      validationErrors: null,
    };
  }
  try {
    const response = await auth.api.signUpEmail({
      body: { name: username, email, password },
      headers: await headers(),
      asResponse: true,
    });
    if (!("token" in response) || !response.token) {
      return {
        data: { email, username },
        success: false,
        dbErrors: {
          name: "dbError",
          message: "An account with this email or username already exists",
        },
        validationErrors: null,
      };
    }
  } catch (error) {
    if (error instanceof APIError) {
      return {
        data: { email, username },
        success: false,
        dbErrors: {
          name: "dbError",
          message: error.message,
        },
        validationErrors: null,
      };
    }
    return {
      data: { email, username },
      success: false,
      dbErrors: {
        name: "db_Error",
        message: "Unexpected error, try again",
      },
      validationErrors: null,
    };
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
      data: { email: fields.email },
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
        data: { email },
        success: false,
        dbErrors: {
          message: error.message,
        },
        validationErrors: null,
      };
    }
    return {
      data: { email },
      success: false,
      dbErrors: {
        message: "Unexpected error",
      },
      validationErrors: null,
    };
  }
  redirect("/dashboard");
}
export async function signout(
  prevState: SignoutState,
  formData: FormData,
): Promise<SignoutState> {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: "error",
        errors: {
          name: error.name,
          message: error.body?.message,
        },
      };
    }
    return {
      success: false,
      message: "error",
      errors: {
        name: "error",
        message: "Unexpected error",
      },
    };
  }
  redirect("/signin");
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
