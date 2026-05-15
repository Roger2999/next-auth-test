"use client";

import { useActionState } from "react";
import Image from "next/image";
import { uploadImage } from "../actions/upload-image-action";
import ImageUploadButton from "@/app/(public)/(auth)/signup/components/upload-button";

interface SettingsFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
  };
}

const initialState = {
  success: false,
  message: "",
};

export default function SettingsForm({ user }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    uploadImage,
    initialState,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-gray-200">
          <Image
            src={user.image || "/assets/user-default-100.png"}
            alt={user.name || "Usuario"}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <ImageUploadButton name="image" error={state.message} />

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Guardando..." : "Confirmar"}
        </button>
      </form>

      {state.message && (
        <p
          className={`text-center text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
