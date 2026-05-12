import Link from "next/link";

function NotFound() {
  return (
    <main className="mx-auto mt-2 flex min-h-[min(50vh,28rem)] w-full max-w-2xl flex-col items-center justify-center gap-5 px-2 py-8 text-center sm:mt-4 sm:gap-6 sm:py-12">
      <h1 className="text-balance text-2xl font-semibold sm:text-3xl md:text-4xl">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-flex min-h-11 w-full max-w-xs touch-manipulation items-center justify-center rounded-md bg-accent-500 px-5 py-3 text-base font-medium text-primary-800 transition-colors hover:bg-accent-600 sm:w-auto sm:max-w-none sm:px-8 sm:py-3.5 sm:text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}

export default NotFound;
