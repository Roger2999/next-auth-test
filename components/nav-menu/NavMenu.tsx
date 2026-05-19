import NavMenuDesktop from "./desktop/NavMenuDesktop";
import NavMenuMobileWrapper from "./mobile/NavMenuMobileWrapper";

export default function NavMenu() {
  return (
    <>
      <div className="font-audio">
        <NavMenuDesktop />
        <NavMenuMobileWrapper />
      </div>
    </>
  );
}
