import Link from "next/link";

export default function NavMenuMobile({
  routes,
  isMenuOpen,
}: {
  routes: {
    name: string;
    href: string;
  }[];
  isMenuOpen: boolean;
}) {
  if (!isMenuOpen) return null;
  return (
    <aside className="absolute top-0 z-10 left-0 w-52 h-full  bg-gray-200 sm:hidden px-5 py-14">
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <Link href={route.href} className="hover:text-blue-500">
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
