"use client";

import { Moon, Sun, ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownMenu onOpenChange={handleMenu}>
      <DropdownMenuTrigger>
        <Button className="w-fit space-x-3" variant="outline">
          {theme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}

          {isOpen ? <ArrowBigUpDash /> : <ArrowBigDownDash />}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" sideOffset={8} align="center">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
