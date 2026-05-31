"use server";

import { auth } from "@/app/lib/auth";
import { ChangePasswordState } from "@/lib/types";
import { ChangePasswordSchema } from "@/lib/zod";
import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import z from "zod";

export async function changePasswordAction(
  prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const fields = {
    currentPassword: formData.get("currentPassword") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validatedPassword = ChangePasswordSchema.safeParse(fields);
  if (!validatedPassword.success) {
    return {
      success: false,
      message: "Password validation error",
      dbErrors: null,
      validationErrors: z.flattenError(validatedPassword.error).fieldErrors,
    };
  }

  try {
    await auth.api.changePassword({
      body: {
        currentPassword: validatedPassword.data.currentPassword,
        newPassword: validatedPassword.data.password,
        revokeOtherSessions: false,
      },
      headers: await headers(),
    });
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
  revalidatePath("/dashboard/settings");
}
