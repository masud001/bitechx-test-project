"use client";
import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-semibold mb-3 text-[#0D1821]">Products Error</h2>
      <p className="mb-4 text-sm text-gray-700">Something went wrong loading products.</p>
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
    </main>
  );
}