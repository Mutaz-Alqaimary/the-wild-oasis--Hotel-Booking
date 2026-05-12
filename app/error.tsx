"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-[min(60vh,32rem)] w-full max-w-2xl flex-col items-center justify-center gap-4 px-2 py-8 text-center sm:gap-6 sm:py-12">
      <h1 className="text-balance text-2xl font-semibold sm:text-3xl md:text-4xl">
        Something went wrong!
      </h1>

      <p className="w-full max-w-prose wrap-break-word text-base text-primary-200 sm:text-lg">
        {error.message}
      </p>

      <button
        type="button"
        className="inline-flex min-h-11 min-w-40 touch-manipulation items-center justify-center rounded-md bg-accent-500 px-5 py-3 text-base font-medium text-primary-800 transition-colors hover:bg-accent-600 sm:px-8 sm:py-3.5 sm:text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
