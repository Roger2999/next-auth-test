"use client";

import { useNavMenuStore } from "@/stores/useNavMenuStore";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export default function HamburgerButton() {
  const { setIsMenuOpen } = useNavMenuStore();

  return (
    <Button
      variant={"outline"}
      className="relative z-30 ml-5 sm:hidden"
      onClick={() => setIsMenuOpen(false)}
    >
      <Menu />
    </Button>
  );
}
