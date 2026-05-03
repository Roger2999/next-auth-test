import { getSession } from "@/lib/helpers";
import NavMenuMobile from "./NavMenuMobile";

export default async function NavMenuMobileWrapper() {
  const session = await getSession();
  return <NavMenuMobile session={session} />;
}
