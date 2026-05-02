"use client";
import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-botton";
import { useEffect } from "react";
import { useNavMenuStore } from "@/stores/useNavMenuStore";

interface Props {
  routes: {
    name: string;
    href: string;
    current: boolean;
  }[];
  session: unknown;
}

export default function NavMenuMobile({ routes, session }: Props) {
  const { isMenuOpen, setIsMenuOpen } = useNavMenuStore();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isMenuOpen, setIsMenuOpen]);
  if (!isMenuOpen) return null;
  return (
    <div
      className="overlay fixed top-0 z-20 h-full w-full backdrop-blur-md sm:hidden"
      onClick={closeMenu}
    >
      <aside
        onClick={stopPropagation}
        className={`duration-150} absolute top-0 left-0 z-50 flex h-full w-72 max-w-[70%] flex-col gap-5 border px-5 pt-20 backdrop-blur-3xl transition-all sm:hidden`}
      >
        <ul className="space-y-3">
          {routes.map((route, index) => (
            <li key={index}>
              <LinkButton type="link" href={route.href} onClick={closeMenu}>
                {route.name}
              </LinkButton>
            </li>
          ))}
        </ul>
        <Separator />
        <div className="flex flex-col gap-5" onClick={closeMenu}>
          <SignoutButton className="px-5" session={session} />
          <SignupButton className="px-5" session={session}>
            Signup
          </SignupButton>
          <SigninButton className="px-5" session={session}>
            Signin
          </SigninButton>
        </div>
        <ModeToggle />
      </aside>
    </div>
  );
}
