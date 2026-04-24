"use client";
import SigninButton from "@/app/(public)/(auth)/components/signin-button";
import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import Link from "next/link";
import SignupButton from "@/app/(public)/(auth)/components/signup-button";
import LinkButton from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-botton";
import { Dispatch, SetStateAction, useEffect } from "react";

export default function NavMenuMobile({
  routes,
  isMenuOpen,
  onChangeMenu,
}: {
  routes: {
    name: string;
    href: string;
  }[];
  isMenuOpen: boolean;
  onChangeMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const closeMenu = () => {
    onChangeMenu(false);
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
  }, [isMenuOpen, onChangeMenu]);
  if (!isMenuOpen) return null;
  return (
    <div className="fixed top-0 z-30 w-full h-full overlay" onClick={closeMenu}>
      <aside
        onClick={stopPropagation}
        className="flex flex-col gap-5 absolute top-0 left-0 w-72 max-w-[70%] backdrop-blur-xl bg-white/10 border h-full  sm:hidden px-5 pt-20 bg-"
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
          <SignupButton className="text-center">Signup</SignupButton>
          <SigninButton className="text-center">Signin</SigninButton>
          <SignoutButton className="text-center">Signout</SignoutButton>
        </div>
        <ModeToggle />
      </aside>
    </div>
  );
}
