"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === "/dashboard") return null;
  return (
    <Button
      className="bg-accent-foreground/20 cursor-pointer rounded-md border"
      onClick={() => router.back()}
    >
      <ArrowBigLeftDash className="text-accent-foreground min-h-8 min-w-8 p-1" />
    </Button>
  );
}
