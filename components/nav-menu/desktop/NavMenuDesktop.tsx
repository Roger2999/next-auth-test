import Link from "next/link";
import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { ModeToggle } from "@/components/theme-botton";

export default function NavMenuDesktop({
  routes,
  onMenuChange,
}: {
  routes: {
    name: string;
    href: string;
  }[];
  onMenuChange: () => void;
}) {
  return (
    <nav className="flex w-full h-14 border justify-between items-center">
      <ul className="hidden sm:flex gap-10 px-10">
        {routes.map((route, index) => (
          <li key={index}>
            <LinkButton type="link" href={route.href}>
              {route.name}
            </LinkButton>
          </li>
        ))}
      </ul>
      <div className="hidden sm:flex gap-5 px-10">
        <ModeToggle />
        <SignupButton className="px-5">Signup</SignupButton>
        <SigninButton className="px-5">Signin</SigninButton>
        <SignoutButton className="px-5">Signout</SignoutButton>
      </div>
      <Button
        variant={"outline"}
        className="relative z-20 sm:hidden ml-5"
        onClick={onMenuChange}
      >
        <Menu />
      </Button>
    </nav>
  );
}
