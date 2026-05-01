"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { z } from "zod";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Mínimo 8 caracteres").max(128, "Máximo 128 caracteres"),
  confirmPassword: z.string().min(8, "Mínimo 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas deben ser iguales",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const errorParam = searchParams.get("error");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    password?: string[];
    confirmPassword?: string[];
  } | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbError(null);

    const validate = ResetPasswordSchema.safeParse({ password, confirmPassword });
    if (!validate.success) {
      setValidationErrors(
        validate.error.flatten().fieldErrors as {
          password?: string[];
          confirmPassword?: string[];
        },
      );
      return;
    }

    if (!token) {
      setDbError("Token inválido");
      return;
    }

    setPending(true);
    try {
      const result = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (result.error) {
        setDbError(result.error.message || "Error al resetear la contraseña");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      }
    } catch (err) {
      setDbError("Error al resetear la contraseña");
    } finally {
      setPending(false);
    }
  };

  if (errorParam) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>
            El enlace de recuperación es inválido o ha expirado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/forgot-password" className="hover:underline">
              Solicitar otro enlace
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!token) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">Token requerido</CardTitle>
          <CardDescription>
            Falta el token de recuperación en la URL.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-green-600">Contraseña actualizada</CardTitle>
          <CardDescription>
            Tu contraseña ha sido cambiada exitosamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Redirigiendo a iniciar sesión...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="size-5" />
          <CardTitle>Nueva contraseña</CardTitle>
        </div>
        <CardDescription>
          Ingresa tu nueva contraseña.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="mt-1"
            />
            {validationErrors?.password && (
              <p className="text-destructive text-xs mt-1">
                {validationErrors.password[0]}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
            {validationErrors?.confirmPassword && (
              <p className="text-destructive text-xs mt-1">
                {validationErrors.confirmPassword[0]}
              </p>
            )}
          </div>

          <Button disabled={pending} className="w-full">
            {pending ? "Guardando..." : "Guardar contraseña"}
          </Button>

          {dbError && (
            <p className="text-destructive text-sm text-center">{dbError}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}