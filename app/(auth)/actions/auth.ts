"use server"

import { signIn, signOut } from "@/auth"
import { FormState,SignupFormSchema } from "@/lib/zod"
import prisma from "@/lib/prisma"
import { AuthError } from "next-auth"
import z from "zod"
import bcrypt from "bcryptjs"

export type SignInState = {
  success?: boolean
  error?: string
}

export async function signInWithGitHub(
  prevState: SignInState | null,
  formData: FormData
): Promise<SignInState> {
  try {
    await signIn("github", { redirectTo: "/dashboard" })
    return { success: true,error:undefined }
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.cause?.err?.message ?? "Failed to sign in" }
      
    }
    return { success: false, error: "Failed to sign in with GitHub" }
  }
}
export async function SignOut (){
    await signOut({redirectTo:"/"})
}
export async function signupWithCredentials (prevState:FormState,formData:FormData):Promise<FormState>{
  const fields = {
    username:formData.get("username") as string,
    email:formData.get("email") as string,
    password: formData.get("password") as string
  }
  const validateFields = SignupFormSchema.safeParse(fields)
  if(!validateFields.success){
    console.log("Validations errors",z.flattenError(validateFields.error).fieldErrors )
    return{
    data:fields,
    success: false,
    message: "Validation error",
    errors:z.flattenError(validateFields.error).fieldErrors
  }
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: fields.email }
    })
    if (existingUser) {
      return {
        data: fields,
        success: false,
        message: "User already exists",
        errors: { email: ["Email already registered"] }
      }
    }

    const hashedPassword = await bcrypt.hash(fields.password, 10)
    
    await prisma.user.create({
      data: {
        email: fields.email,
        username: fields.username,
        password: hashedPassword
      }
    })

    await signIn("credentials", { 
      email: fields.email, 
      password: fields.password,
      redirectTo: "/dashboard"
    })

    return {
      data: fields,
      success: true,
      message: "User created successfully",
      errors: null
    }
  } catch (error) {
    console.error("Signup error:", error)
    return {
      data: fields,
      success: false,
      message: "Failed to create user",
      errors: null
    }
  }
}