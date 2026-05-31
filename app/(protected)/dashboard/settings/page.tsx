import { redirect } from "next/navigation";
import { getSession } from "@/lib/helpers";
import ImageUploadForm from "./components/image-upload-form";
import { Suspense } from "react";
import ChangePasswordForm from "@/app/(protected)/dashboard/settings/components/change-password-form";

export default async function Settings() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  return (
    <div className="mt-5 flex flex-col items-center justify-center gap-10 p-6">
      <h1 className="text-4xl font-bold">Configuración</h1>
      <div className="grid-col-1 grid gap-10 sm:grid-cols-2">
        <Suspense fallback={<div>Loading...</div>}>
          <ImageUploadForm user={session.user} />
          <ChangePasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
