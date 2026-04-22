"use client";
import { useState } from "react";
import NavMenuDesktop from "./desktop/NavMenuDesktop";
import NavMenuMobile from "./mobile/NavMenuMobile";

export default function NavMenu() {
  const routes = [
    { name: "home", href: "/" },
    { name: "contact", href: "/contact" },
    { name: "about us", href: "/about us" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <NavMenuDesktop routes={routes} onMenuChange={handleMenu} />
      <NavMenuMobile routes={routes} isMenuOpen={isMenuOpen} />
    </>
  );
}
