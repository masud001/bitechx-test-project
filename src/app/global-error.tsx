"use client";
import "./globals.css";
import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console (or send to monitoring)
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="mx-auto max-w-2xl px-4 py-8">
        <h2 className="text-2xl font-semibold mb-3 text-[#0D1821]">Something went wrong</h2>
        <p className="mb-4 text-sm text-gray-700">An unexpected error occurred while rendering this page.</p>
        <pre className="mb-4 rounded border-[.5px] bg-gray-50 p-3 overflow-auto text-xs text-gray-800">
          {error?.message}
        </pre>
        {error?.digest && (
          <p className="mb-4 text-xs text-gray-500">Digest: {error.digest}</p>
        )}
        <button
          className="rounded border-[.5px] px-3 py-1"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}