"use client";
import { useState } from "react";
import NavMenuDesktop from "./desktop/NavMenuDesktop";
import NavMenuMobile from "./mobile/NavMenuMobile";
import { authClient } from "@/app/lib/auth-client";

export type Route = {
  name: string;
  href: string;
  current: boolean;
  id: string;
};
export interface Session {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
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
}
export default function NavMenu() {
  const routes = [
    { name: "Home", href: "/", current: false, id: "1" },
    { name: "Contact", href: "/contact", current: false, id: "2" },
    { name: "About us", href: "/about", current: false, id: "3" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { data: session, isPending } = authClient.useSession();

  return (
    <>
      <NavMenuDesktop isPending={isPending} session={session} routes={routes} onMenuChange={handleMenu} />
      <NavMenuMobile isPending={isPending} session={session} routes={routes} isMenuOpen={isMenuOpen} onChangeMenu={setIsMenuOpen} />
    </>
  );
}
