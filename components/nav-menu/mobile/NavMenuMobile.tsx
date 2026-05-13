"use client";
import SignoutButton from "@/app/(public)/(auth)/components/signout-button";
import LinkButton from "@/components/ui/link-button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/theme-botton";
import { useCallback, useEffect } from "react";
import { useNavMenuStore } from "@/stores/useNavMenuStore";
import { routes } from "@/lib/constants";
import Image from "next/image";
import SignButton from "@/app/(public)/(auth)/components/sign-button";
interface Props {
  session: {
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    };
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
  } | null;
}
export default function NavMenuMobile({ session }: Props) {
  const { isMenuOpen, setIsMenuOpen } = useNavMenuStore();

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  },[setIsMenuOpen]);
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
  }, [closeMenu, isMenuOpen, setIsMenuOpen]);
  if (!isMenuOpen) return null;
  return (
    <div
      className="overlay fixed top-0 z-20 h-full w-full backdrop-blur-xs sm:hidden"
      onClick={closeMenu}
    >
      <aside
        onClick={stopPropagation}
        className={`bg-sidebar absolute top-0 left-0 z-50 flex h-full w-72 max-w-[70%] flex-col gap-5 border px-5 pt-20 transition-all duration-150 sm:hidden`}
      >
        {/* image */}
        {session?.user.image && (
          <div className="flex w-full items-center justify-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={session && session?.user?.image}
                priority
                fill
                alt={`profile-photo-${session?.user.name}`}
                className="object-cover object-center"
              />
            </div>
          </div>
        )}
        {/* links */}
        {!session && (
          <ul className="space-y-3">
            {routes.map((route, index) => (
              <li key={index}>
                <LinkButton type="link" href={route.href} onClick={closeMenu}>
                  {route.name}
                </LinkButton>
              </li>
            ))}
          </ul>
        )}

        <Separator />
        {/* buttons */}
        <div className="flex flex-col gap-5">
          {session ? (
            <SignoutButton className="w-full px-5" onClick={closeMenu} />
          ) : (
            <>
              <SignButton href="/signup" className="w-full px-5" onClick={closeMenu}>
                Signup
              </SignButton>
              <SignButton href="signin" className="w-full px-5" onClick={closeMenu}>
                Signin
              </SignButton>
            </>
          )}
        </div>
        {/* theme switch */}
        <ModeToggle />
      </aside>
    </div>
  );
}
