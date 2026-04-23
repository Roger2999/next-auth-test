import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import Link from "next/link";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";

export default function NavMenuMobile({
  routes,
  isMenuOpen,
}: {
  routes: {
    name: string;
    href: string;
  }[];
  isMenuOpen: boolean;
}) {
  if (!isMenuOpen) return null;
  return (
    <aside className="flex flex-col gap-5 absolute top-0 z-10 left-0 w-72 max-w-[70%]  h-full  sm:hidden px-5 pt-20">
      <ul className="space-y-3">
        {routes.map((route, index) => (
          <li key={index}>
            <LinkButton type="link" href={route.href}>
              {route.name}
            </LinkButton>
          </li>
        ))}
      </ul>
      <Separator className="bg-gray-700" />
      <div className="flex flex-col gap-5">
        <SignupButton className="text-center">Signup</SignupButton>
        <SigninButton className="text-center">Signin</SigninButton>
        <SignoutButton className="text-center">Signout</SignoutButton>
      </div>
    </aside>
  );
}
