"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/app/utils/uploadthing";

interface Props {
  name: string;
  error?: string[];
}

export default function ImageUploadButton({ name, error }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        Profile photo
        <span className="font-normal ml-1">(optional)</span>
      </label>
      <input type="hidden" name={name} value={imageUrl} />

      {!imageUrl ? (
        <div className="flex justify-center">
          <UploadButton
            endpoint="profileImage"
            appearance={{
              button: {
                display: "flex",
                textAlign: "center",
                flexDirection: "column",
                width: "20rem",
                maxWidth: "80%",
                height: "5rem",
                border: "2px dashed #d1d5db",
                borderRadius: "8px",
                fontWeight: "500",
              },
              allowedContent: {
                width: "100%",
                textAlign: "center",
                fontSize: "1rem",
                cursor: "pointer",
              },
            }}
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                setImageUrl(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              console.error("Upload error:", error.message);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 p-4 rounded-lg">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
            <Image
              src={imageUrl}
              alt="Profile preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => setImageUrl("")}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Remove photo
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error[0]}</p>}
    </div>
  );
}
