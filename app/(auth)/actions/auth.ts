"use server"

import { signIn, signOut } from "@/auth"
import { FormState,SignupFormSchema } from "@/lib/zod"
import { AuthError } from "next-auth"
import z from "zod"

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
  //validar campos con zod
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
return{
  data:fields,
  success:true,
  message:"Success",
  errors:null,
}

}