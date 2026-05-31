"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";

import { useActionState, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { resetPasswordAction } from "../actions/reset-password-action";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const initialState = {
    success: false,
    message: undefined,
    dbErrors: null,
    validationErrors: null,
  };
  const [state, action, pending] = useActionState(
    resetPasswordAction,
    initialState,
  );
  const searchParams = useSearchParams();
  const token: any = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="size-5" />
          <CardTitle>Nueva contraseña</CardTitle>
        </div>
        <CardDescription>Ingresa tu nueva contraseña.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={action}>
          <input type="hidden" value={token} />
          <div>
            <Label htmlFor="password">Nueva contraseña:</Label>
            <div className="relative">
              <Input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                className="mt-1"
              />
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar/ocultar contraseña"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {state.validationErrors && (
              <p className="text-destructive mt-1 text-xs">
                {state.validationErrors.password}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="mt-1"
              />
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Mostrar/ocultar contraseña"
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {state.validationErrors && (
              <p className="text-destructive mt-1 text-xs">
                {state.validationErrors.confirmPassword}
              </p>
            )}
          </div>

          <Button disabled={pending} className="w-full">
            {pending ? "Guardando..." : "Guardar contraseña"}
          </Button>

          {state.dbErrors && (
            <p className="text-destructive text-center text-xl">
              {state.dbErrors.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
