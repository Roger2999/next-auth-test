"use client";

import { Button } from "@/components/ui/button";
import { FolderGit2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { BetterFetchError } from "better-auth/react";
import { siginGitHUb } from "../services/signinGitHub.service";
import SigninForm from "../components/signin-form";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<
    BetterFetchError & Record<string, unknown>
  >();
  return (
    <>
      <h1 className="text-center text-2xl font-bold">Sign In</h1>
      <Button
        className="flex w-72 max-w-[80%] gap-2"
        variant={"default"}
        onClick={() => siginGitHUb(setError, setIsLoading)}
      >
        {isLoading ? "Loading..." : "Sign in with GitHub"}
        <FolderGit2 />
      </Button>
      <div className="w-md max-w-[80%]">
        <Separator className="text-center">or</Separator>
      </div>
      <SigninForm />
      {error && <p className="text-center text-red-500">{error.statusText}</p>}
    </>
  );
}
