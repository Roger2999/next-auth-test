import { getSession } from "@/lib/getSession";
import NavMenuMobile from "./NavMenuMobile";

export default async function NavMenuMobileWrapper() {
  const session = await getSession();
  return <NavMenuMobile session={session} />;
}
