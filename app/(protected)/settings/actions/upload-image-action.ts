"use server";

import { auth } from "@/app/lib/auth";
import prisma from "@/lib/prisma";
import { UploadImageState } from "@/lib/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function uploadImage(
  prevState: UploadImageState,
  formData: FormData,
): Promise<UploadImageState> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return {
      success: false,
      message: "No autorizado",
      dbErrors: null,
      validationErrors: null,
    };
  }

  const userId = session.user.id;
  const imageUrl = formData.get("image") as string;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });
    revalidatePath("/settings");
    return {
      success: true,
      message: "Foto actualizada correctamente",
      dbErrors: null,
      validationErrors: null,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return {
        success: false,
        message: "db error",
        dbErrors: {
          message: error.message,
          name: error.name,
        },
      };
    }
    return {
      success: false,
      message: "Error desconocido al actualizar la foto, intente de nuevo",
      dbErrors: null,
      validationErrors: null,
    };
  }
}
