"use client";
import { siginGitHUb } from "../services/signinWithGithub";
import LoginForm from "../components/login-form";
import { Button } from "@/components/ui/button";
import { FolderGit2 } from "lucide-react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10 w-full">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Button
          className="flex gap-2"
          variant={"default"}
          onClick={siginGitHUb}
        >
          Sign in with GitHub
          <FolderGit2 />
        </Button>
      </div>
      <LoginForm />
    </div>
  );
}
