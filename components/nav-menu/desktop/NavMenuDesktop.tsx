import SignoutButton from "@/app/(public)/(auth)/components/signout-button";

import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { ModeToggle } from "@/components/ui/theme-botton";

import HamburgerButton from "@/components/ui/hamburger-button";

import { getSession } from "@/lib/helpers";
import { routes } from "@/lib/constants";
import Image from "next/image";

export default async function NavMenuDesktop() {
  const session = await getSession();
  return (
    <nav className="border-b-border/90 bg-menu flex h-16 w-full items-center justify-between border-b">
      <ul className="hidden gap-6 pl-10 sm:flex">
        {!session ? (
          routes.map(
            (route: {
              name: string;
              href: string;
              current: boolean;
              id: string;
            }) => (
              <li key={route.id}>
                <LinkButton type="link" href={route.href}>
                  {route.name}
                </LinkButton>
              </li>
            ),
          )
        ) : (
          <h1 className="text-xl">
            <strong className="text-accent-foreground font-semibold">
              {session.user.name}
            </strong>{" "}
            Dashboard
          </h1>
        )}
      </ul>

      <div className="hidden h-full items-center justify-center gap-5 pr-10 sm:flex">
        <ModeToggle />
        {session ? (
          <SignoutButton className="px-5" />
        ) : (
          <>
            <SignupButton className="px-5">Signup</SignupButton>
            <SigninButton className="px-5">Signin</SigninButton>
          </>
        )}
        {session?.user.image && (
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <Image
              src={session && session?.user?.image}
              priority
              fill
              alt={`profile-photo-${session?.user.name}`}
              className="object-cover object-center"
            />
          </div>
        )}
      </div>
      <HamburgerButton />
    </nav>
  );
}
