"use client";

import { ForgotPasswordState } from "@/lib/zod";
import FieldError from "../components/field-error";
import { useActionState } from "react";

import CustomInput from "../components/custom-input";
import { requestPasswordReset } from "../actions/request-password-reset";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const INITIAL_STATE: ForgotPasswordState = {
  success: false,
  message: undefined,
  dbErrors: null,
  validationErrors: null,
};

export default function ForgotPasswordPage() {
  const [formState, formAction, pending] = useActionState(
    requestPasswordReset,
    INITIAL_STATE,
  );

  const showSuccess = formState?.success && formState?.message === "email_sent";
  const showError =
    !formState?.success && (formState?.dbErrors || formState?.validationErrors);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="size-5" />
          <CardTitle>Recuperar contraseña</CardTitle>
        </div>
        <CardDescription>
          Ingresa tu email para recibir el enlace de recuperación.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <CustomInput label="Email" name="email" type="email">
            <FieldError error={formState?.validationErrors?.email} />
          </CustomInput>

          <Button disabled={pending} className="w-full">
            {pending ? "Enviando..." : "Enviar enlace"}
          </Button>

          {showSuccess && (
            <p className="text-green-600 text-sm text-center">
              Revisa tu correo para resetear tu contraseña
            </p>
          )}

          {showError && (
            <p className="text-destructive text-sm text-center">
              {formState.dbErrors?.message ||
                formState.validationErrors?.email}
            </p>
          )}
        </form>

        <p className="text-center text-sm mt-4 text-muted-foreground">
          <Link href="/signin" className="hover:underline">
            Volver a iniciar sesión
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}