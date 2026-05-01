import React from "react";

export default function SignupFormError({
  error,
}: {
  error: string[] | undefined;
}) {
  return (
    <div>
      {error?.map((err, index) => (
        <p key={index} className="mt-1 text-xs text-red-500">
          {err}
        </p>
      ))}
    </div>
  );
}
