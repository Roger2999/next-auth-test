"use client";
import { useState } from "react";
import NavMenuDesktop from "./desktop/NavMenuDesktop";
import NavMenuMobile from "./mobile/NavMenuMobile";

export default function NavMenu() {
  const routes = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact" },
    { name: "About us", href: "/about" },
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
