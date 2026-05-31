import { Suspense } from "react";
import ResetPasswordForm from "../components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
