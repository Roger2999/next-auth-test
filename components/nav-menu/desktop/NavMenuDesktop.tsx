import SignoutButton from "@/app/(public)/(auth)/components/signout-button";

import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { ModeToggle } from "@/components/theme-botton";

import HamburgerButton from "@/components/hamburger-button";

import { getSession } from "@/lib/getSession";
import { routes } from "@/lib/constants";

export default async function NavMenuDesktop() {
  const session = await getSession();
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
        {session ? (
          <SignoutButton className="px-5" />
        ) : (
          <>
            <SignupButton className="px-5">Signup</SignupButton>
            <SigninButton className="px-5">Signin</SigninButton>
          </>
        )}
      </div>
      <HamburgerButton />
    </nav>
  );
}
