"use client";

import { GalleryVerticalEndIcon } from "lucide-react";
import { siginGitHUb } from "../services/signinWithGithub";
import LoginForm from "../components/login-form";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 md:p-10 w-full">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          Acme Inc.
        </a>
        <button onClick={siginGitHUb}>Sign in with GitHub</button>
      </div>
      <LoginForm />
    </div>
  );
}
