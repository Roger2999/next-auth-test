"use client";
import { useState } from "react";
import NavMenuDesktop from "./desktop/NavMenuDesktop";
import NavMenuMobile from "./mobile/NavMenuMobile";
export type Route = {
  name: string;
  href: string;
  current: boolean;
  id: string;
};
export default function NavMenu() {
  const routes = [
    { name: "Home", href: "/", current: false, id: "1" },
    { name: "Contact", href: "/contact", current: false, id: "2" },
    { name: "About us", href: "/about", current: false, id: "3" },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<Route[]>(routes);

  const handleCurrent = (id: string) => {
    setCurrent(
      routes.map((item) =>
        id === item.id
          ? { ...item, current: true }
          : { ...item, current: false },
      ),
    );
  };
  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <NavMenuDesktop
        onCurrentChange={handleCurrent}
        routes={routes}
        onMenuChange={handleMenu}
      />
      <NavMenuMobile
        routes={routes}
        isMenuOpen={isMenuOpen}
        onChangeMenu={setIsMenuOpen}
      />
    </>
  );
}
