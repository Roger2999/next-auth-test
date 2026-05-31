"use server";

import { auth } from "@/app/lib/auth";
import { ResetPasswordState } from "@/lib/types";
import { ResetPasswordSchema } from "@/lib/zod";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/dist/server/request/headers";
import z from "zod";

export async function resetPasswordAction(
  prevState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const fields = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    token: formData.get("token") as string,
  };
  const { token } = fields;

  const validatedPassword = ResetPasswordSchema.safeParse(fields);
  if (!validatedPassword.success) {
    return {
      success: false,
      message: "Password validation error",
      dbErrors: null,
      validationErrors: z.flattenError(validatedPassword.error).fieldErrors,
    };
  }

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: validatedPassword.data.password,
        token,
      },
      headers: await headers(),
    });
    revalidatePath("/dashboard/settings");
    return {
      success: true,
      message: "Contraseña actualizada correctamente",
      dbErrors: null,
      validationErrors: null,
    };
  } catch (error) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.message,
        dbErrors: {
          message: error.message,
          name: error.name,
          status: error.statusCode,
        },
        validationErrors: null,
      };
    }
    return {
      success: false,
      message: "Unknown error",
      dbErrors: null,
      validationErrors: null,
    };
  }
}
