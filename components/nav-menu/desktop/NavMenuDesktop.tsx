import SignupButton from "@/app/(auth)/components/signup-button";

import SigninButton from "@/app/(auth)/components/signin-button";
import Link from "next/link";
import SignoutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

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
    <nav className="sm:flex w-full h-14 border justify-between items-center">
      <ul className="hidden sm:flex gap-10 px-10">
        {routes.map((route, index) => (
          <li key={index}>
            <Link href={route.href} className="hover:text-blue-500">
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden sm:flex gap-5 px-10">
        <SigninButton />
        <SignupButton />
        <SignoutButton />
      </div>
      <Button className="relative z-20 sm:hidden" onClick={onMenuChange}>
        <Menu></Menu>
      </Button>
    </nav>
  );
}
