import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import NavMenuDesktop from "./desktop/NavMenuDesktop";
import NavMenuMobile from "./mobile/NavMenuMobile";

export type Route = {
  name: string;
  href: string;
  current: boolean;
  id: string;
};

export default async function NavMenu() {
  const routes = [
    { name: "Home", href: "/", current: false, id: "1" },
    { name: "Contact", href: "/contact", current: false, id: "2" },
    { name: "About us", href: "/about", current: false, id: "3" },
  ];

  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <>
      <NavMenuDesktop routes={routes} />
      <NavMenuMobile routes={routes} session={session} />
    </>
  );
}
