import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { ModeToggle } from "@/components/theme-botton";

import { Route, Session } from "../NavMenu";

interface Props {
  session: Session | null;
  routes: Route[];
  onMenuChange: () => void;
  isPending: boolean;
}

export default function NavMenuDesktop({
  session,
  routes,
  onMenuChange,
  isPending,
}: Props) {
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
        {isPending ? (
          <span>...</span>
        ) : session ? (
          <SignoutButton className="px-5">Signout</SignoutButton>
        ) : (
          <>
            <SignupButton className="px-5">Signup</SignupButton>
            <SigninButton className="px-5">Signin</SigninButton>
          </>
        )}
      </div>
      <Button
        variant={"outline"}
        className="relative z-30 ml-5 sm:hidden"
        onClick={onMenuChange}
      >
        <Menu />
      </Button>
    </nav>
  );
}
