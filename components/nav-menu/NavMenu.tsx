import SignupButton from "@/app/(auth)/components/signup-button";
import SignoutButton from "../signout-button";
import SigninButton from "@/app/(auth)/components/signin-button";
import Link from "next/link";

export default function NavMenu() {
  const routes = [
    { name: "home", href: "/" },
    { name: "contact", href: "/contact" },
    { name: "about us", href: "/about us" },
  ];
  return (
    <nav className="flex w-full h-14 border justify-between items-center">
      <ul className="flex gap-10 px-10">
        {routes.map((route, index) => (
          <Link href={route.href} className="hover:text-blue-500" key={index}>
            {route.name}
          </Link>
        ))}
      </ul>
      <div className="flex gap-5 px-10">
        <SigninButton />
        <SignupButton />
        <SignoutButton />
      </div>
    </nav>
  );
}
