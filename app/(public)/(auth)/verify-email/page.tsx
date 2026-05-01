"use server";

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { APIError } from "better-auth";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; callbackURL?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;
  const callbackURL = params.callbackURL || "/dashboard";

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-destructive">
          Enlace de verificación inválido
        </h1>
        <p className="text-muted-foreground mt-2">
          El token de verificación no es válido o ha expirado.
        </p>
      </div>
    );
  }

  try {
    await auth.api.verifyEmail({
      query: { token },
      headers: await headers(),
    });
    redirect(callbackURL);
  } catch (error) {
    if (error instanceof APIError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-destructive">
            Error de verificación
          </h1>
          <p className="text-muted-foreground mt-2">{error.message}</p>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-destructive">
          Error de verificación
        </h1>
        <p className="text-muted-foreground mt-2">
          Ocurrió un error inesperado. Por favor intenta de nuevo.
        </p>
      </div>
    );
  }
}
