import { Suspense } from "react";
import ResetPasswordForm from "../../../../(protected)/dashboard/settings/components/change-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
