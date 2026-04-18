"use server";

// import { signIn, signOut } from "@/auth";

import { FormState, SignupFormSchema } from "@/lib/zod";
import prisma from "@/lib/prisma";
import { AuthError } from "next-auth";
import z from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { createSession, deleteSession } from "@/app/lib/session";

export type SignInState = {
  success?: boolean;
  error?: string;
};

// export async function signInWithGitHub(
//   prevState: SignInState | null,
//   formData: FormData,
// ): Promise<SignInState> {
//   try {
//     await signIn("github", { redirectTo: "/dashboard" });
//     return { success: true, error: undefined };
//   } catch (error) {
//     if (error instanceof AuthError) {
//       return {
//         success: false,
//         error: error.cause?.err?.message ?? "Failed to sign in",
//       };
//     }
//     return { success: false, error: "Failed to sign in with GitHub" };
//   }
// }
// export async function SignOut() {
//   await signOut({ redirectTo: "/" });
// }
export async function signupWithCredentials(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const fields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  //validacion de campos
  const validateFields = SignupFormSchema.safeParse(fields);
  if (!validateFields.success) {
    return {
      data: fields,
      success: false,
      message: "Validation error",
      dbErrors: null,
      validationErrors: z.flattenError(validateFields.error).fieldErrors,
    };
  }

  try {
    //si los campos son validos, ver si existe usuario
    const existingUser = await prisma.user.findUnique({
      where: { email: fields.email },
    });
    if (existingUser) {
      return {
        data: fields,
        success: false,
        message: "User already exists",
        dbErrors: null,
        validationErrors: { email: ["Email already registered"] },
      };
    }
    //Prepare data for insertion into database
    const { email, password, username } = validateFields.data;
    //si no existe el usuario en la db entonces:
    //hasheo de password para encriptacion
    const hashedPassword = await bcrypt.hash(password, 10);
    //creacion de usuario en db

    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    await createSession(user.id);
  } catch (error) {
    console.error("Signup error:", error);
    const dbError = error as Error;
    return {
      data: fields,
      success: false,
      message: "Failed to create user",
      dbErrors: {
        status: 500,
        name: dbError.name || "DatabaseError",
        message: dbError.message || "Error creating user",
      },
      validationErrors: null,
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/signin");
}
export async function deleteAllDbUser() {
  await prisma.user.deleteMany({});
}
