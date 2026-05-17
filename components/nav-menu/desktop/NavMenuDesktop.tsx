import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import LinkButton from "@/components/ui/link-button";
import { ModeToggle } from "@/components/ui/theme-botton";

import HamburgerButton from "@/components/ui/hamburger-button";

import { getSession } from "@/lib/helpers";
import { routes } from "@/lib/constants";
import Image from "next/image";
import SignButton from "@/app/(public)/(auth)/components/sign-button";
import Link from "next/link";

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
            <SignButton href="/signup" className="px-5">
              Signup
            </SignButton>
            <SignButton href="/signin" className="px-5">
              Signin
            </SignButton>
          </>
        )}
        {session && (
          <Link
            href={"/dashboard/settings"}
            className="relative h-14 w-14 overflow-hidden rounded-full hover:scale-105"
          >
            <Image
              src={session.user?.image || "/assets/user-default-100.png"}
              priority
              fill
              alt={`profile-photo-${session.user.name}`}
              className="object-cover object-center"
            />
          </Link>
        )}
      </div>
      <HamburgerButton />
    </nav>
  );
}
