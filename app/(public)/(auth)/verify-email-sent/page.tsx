"use client";

import { SendEmailState } from "@/lib/zod";
import FieldError from "../components/field-error";
import { useActionState } from "react";

import CustomInput from "../components/custom-input";
import { sendVerificationEmail } from "../actions/auth-actions";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const INITIAL_STATE: SendEmailState = {
  success: false,
  message: undefined,
  dbErrors: null,
  validationErrors: null,
};

export default function VerifyEmailSentPage() {
  const [formState, formAction, pending] = useActionState(
    sendVerificationEmail,
    INITIAL_STATE,
  );

  const showDbError =
    formState?.dbErrors?.message || formState?.message === "email_not_found";
  const showSuccess =
    formState?.success && !formState?.validationErrors && !formState?.dbErrors;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="size-5" />
          <CardTitle>Verifica tu correo</CardTitle>
        </div>
        <CardDescription>
          Te enviamos un enlace de verificación. Tienes 24 horas para usarlo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={formAction}>
          <CustomInput label="Email" name="email" type="email">
            <FieldError error={formState?.validationErrors?.email} />
          </CustomInput>

          <Button disabled={pending} className="w-full">
            {pending ? "Enviando..." : "Reenviar enlace"}
          </Button>

          {showSuccess && (
            <p className="text-center text-sm text-green-600">
              Correo enviado exitosamente
            </p>
          )}

          {showDbError && (
            <p className="text-destructive text-center text-sm">
              {formState.dbErrors?.message || "Email no encontrado"}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
