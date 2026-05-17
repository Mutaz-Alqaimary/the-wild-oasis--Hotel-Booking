"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  children,
  pendingLabel,
}: {
  children: React.ReactNode;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full cursor-pointer rounded bg-accent-500 px-6 py-3.5 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:w-auto sm:px-8 sm:py-4"
      type="submit"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
