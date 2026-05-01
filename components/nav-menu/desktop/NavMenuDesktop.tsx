import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { ModeToggle } from "@/components/theme-botton";

import { Route } from "../NavMenu";

interface Props {
  routes: Route[];
  onMenuChange: () => void;
}

export default function NavMenuDesktop({ routes, onMenuChange }: Props) {
  return (
    <nav className="flex w-full h-14 border justify-between items-center">
      <ul className="hidden sm:flex gap-6 pl-10">
        {routes.map((route) => (
          <li key={route.id}>
            <LinkButton type="link" href={route.href}>
              {route.name}
            </LinkButton>
          </li>
        ))}
      </ul>
      <div className="hidden sm:flex gap-5 pr-10">
        <ModeToggle />
        <SignupButton className="px-5">Signup</SignupButton>
        <SigninButton className="px-5">Signin</SigninButton>
        <SignoutButton className="px-5">Signout</SignoutButton>
      </div>
      <Button
        variant={"outline"}
        className="relative z-30 sm:hidden ml-5"
        onClick={onMenuChange}
      >
        <Menu />
      </Button>
    </nav>
  );
}
