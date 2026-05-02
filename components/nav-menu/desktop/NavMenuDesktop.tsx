import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { ModeToggle } from "@/components/theme-botton";
import type { Route } from "../NavMenu";
import HamburgerButton from "@/components/hamburger-button";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

interface Props {
  routes: Route[];
}

export default async function NavMenuDesktop({ routes }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <nav className="flex h-14 w-full items-center justify-between border">
      <ul className="hidden gap-6 pl-10 sm:flex">
        {routes.map((route) => (
          <li key={route.id}>
            <LinkButton type="link" href={route.href}>
              {route.name}
            </LinkButton>
          </li>
        ))}
      </ul>
      <div className="hidden gap-5 pr-10 sm:flex">
        <ModeToggle />

        <SignoutButton className="px-5" session={session} />

        <SignupButton className="px-5" session={session}>
          Signup
        </SignupButton>
        <SigninButton className="px-5" session={session}>
          Signin
        </SigninButton>
      </div>
      <HamburgerButton />
    </nav>
  );
}
