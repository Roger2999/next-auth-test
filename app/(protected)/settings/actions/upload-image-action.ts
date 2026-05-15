"use server";

import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function uploadImage(prevState: any, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return {
      success: false,
      message: "No autorizado",
    };
  }

  const userId = session.user.id;
  const imageUrl = formData.get("image") as string;

  if (!imageUrl) {
    return {
      success: false,
      message: "Selecciona una imagen",
    };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });
    revalidatePath("/settings");
    return {
      success: true,
      message: "Foto actualizada correctamente",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar la foto",
    };
  }
}
