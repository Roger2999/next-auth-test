"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "@/app/utils/uploadthing";
import { Json, UploadThingError } from "@uploadthing/shared";

interface Props {
  name: string;
  error?: string[];
}

export default function ImageUploadButton({ name, error }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadError, setUploadError] = useState<UploadThingError<Json>>();
  return (
    <div className="space-y-4">
      <label htmlFor="profilePhoto" className="block text-sm font-medium">
        Profile photo
        <span className="ml-1 font-normal">(optional)</span>
      </label>
      <input id="profilePhoto" type="hidden" name={name} value={imageUrl} />

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
            onUploadError={(error) => {
              setUploadError(error);
            }}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg p-4">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-md">
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
            className="text-sm font-medium text-red-500 hover:text-red-700"
          >
            Remove photo
          </button>
        </div>
      )}
      {error && <p className="text-sm text-red-500">{error[0]}</p>}
      {uploadError && (
        <p className="text-center text-red-500">{uploadError.message}</p>
      )}
    </div>
  );
}
