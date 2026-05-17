import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-auto mt-4 max-w-xl space-y-5 px-1 text-center sm:mt-6 sm:space-y-6 sm:px-2 md:max-w-2xl">
      <h1 className="text-balance text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="inline-block min-h-11 py-2 text-lg text-accent-500 underline underline-offset-4 transition-colors hover:text-accent-400 sm:text-xl"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
