"use client";
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Error in /products/create:', error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="text-xl font-semibold text-[#A44A3F]">Something went wrong creating the product.</h2>
      <p className="mt-2 text-sm text-gray-600">Fix any invalid inputs and try again.</p>
      <button className="mt-4 rounded border-[.5px] px-3 py-2" onClick={() => reset()}>Retry</button>
    </div>
  );
}