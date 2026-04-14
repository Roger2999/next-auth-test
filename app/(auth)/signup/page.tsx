"use client"

import { useActionState } from "react"
import { signupWithCredentials } from "../actions/auth"
import { FormState } from "@/lib/zod"
import SignupFormError from "../components/field-error"

const INITIAL_STATE:FormState ={
    success:false,
    message: undefined,
    errors:null
}
export default function Signin(){
    const [formState,formAction,pending]=useActionState(signupWithCredentials,INITIAL_STATE)
    return(
        <form className="flex flex-col gap-2 p-10" action={formAction}>
            <label className="flex gap-2">
                Username
                <input defaultValue={formState.data?.username} className="border border-black" name="username" type="text" />
                <SignupFormError error={formState.errors?.username} />
            </label>
            <label className="flex gap-2">
              Email
              <input defaultValue={formState.data?.email} className="border border-black" name="email" type="email" />
              <SignupFormError error={formState.errors?.email} />
            </label>
            <label className="flex gap-2">
              Password
              <input defaultValue={formState.data?.password} className="border border-black" name="password" type="password" />
              <SignupFormError error={formState.errors?.password} />
            </label>
            <button>Sign In</button>
          </form>
    )
}