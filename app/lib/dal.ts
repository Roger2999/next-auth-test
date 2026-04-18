import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    redirect("/signin");
  }
  return { isAuth: true, userId: session.userId as string };
});
export const getUser = cache(async () => {
  const { userId } = await verifySession();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, email: true },
    });

    return user;
  } catch (error) {
    return null;
  }
});
