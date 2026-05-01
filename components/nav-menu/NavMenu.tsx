"use client";
import { useState } from "react";
import NavMenuDesktop from "./desktop/NavMenuDesktop";
import NavMenuMobile from "./mobile/NavMenuMobile";
// import { useRouter } from "next/router";
export type Route = {
  name: string;
  href: string;
  current: boolean;
  id: string;
};
export default function NavMenu() {
  // const router = useRouter();
  const routes = [
    { name: "Home", href: "/", current: false, id: "1" },
    { name: "Contact", href: "/contact", current: false, id: "2" },
    { name: "About us", href: "/about", current: false, id: "3" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavMenuDesktop routes={routes} onMenuChange={handleMenu} />
      <NavMenuMobile
        routes={routes}
        isMenuOpen={isMenuOpen}
        onChangeMenu={setIsMenuOpen}
      />
    </>
  );
}
