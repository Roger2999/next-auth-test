"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth";
import { SendEmailState } from "@/lib/zod";
import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z.email("Email format invalid").min(1, "Campo requerido"),
});

export async function requestPasswordReset(
  prevState: SendEmailState,
  formData: FormData,
): Promise<SendEmailState> {
  const fields = { email: formData.get("email") as string };
  const validateFields = ForgotPasswordSchema.safeParse(fields);

  if (!validateFields.success) {
    return {
      success: false,
      message: "validation error",
      dbErrors: null,
      validationErrors: z.flattenError(validateFields.error).fieldErrors,
    };
  }

  const { email } = validateFields.data;

  try {
    await auth.api.requestPasswordReset({
      body: { email, redirectTo: "/reset-password" },
      headers: await headers(),
    });
    return {
      success: true,
      message: "email_sent",
      dbErrors: null,
      validationErrors: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: "error",
        dbErrors: { message: error.message },
        validationErrors: null,
      };
    }
    return {
      success: false,
      message: "error",
      dbErrors: { message: "Unexpected error" },
      validationErrors: null,
    };
  }
}