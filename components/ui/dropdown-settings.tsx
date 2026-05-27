"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useState } from "react";
import SettingsButton from "@/app/(protected)/dashboard/components/settings-button";
import { usePathname } from "next/navigation";
interface Props {
  session: {
    session: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      userId: string;
      expiresAt: Date;
      token: string;
      ipAddress?: string | null | undefined;
      userAgent?: string | null | undefined;
    };
    user: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null | undefined;
    };
  };
}
export default function DropdownSettings({ session }: Props) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const pathname = usePathname();
  return (
    <DropdownMenu onOpenChange={handleMenu}>
      <DropdownMenuTrigger className="cursor-pointer">
        <div className="hover:ring-success/70 relative h-12 w-12 overflow-hidden rounded-full transition-transform duration-75 ease-in hover:scale-110 hover:ring-4">
          <Image
            src={session.user?.image || "/assets/user-default-100.png"}
            priority
            fill
            alt={`profile-photo-${session.user.name}`}
            className="object-cover object-center"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="mt-1 flex flex-col">
        {pathname === "/dashboard/settings" ? (
          <DropdownMenuItem>Not items found</DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <SettingsButton />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
