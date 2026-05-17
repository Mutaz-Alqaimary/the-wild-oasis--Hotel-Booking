import type { Metadata } from "next";
import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "@/app/_components/ReservationReminder";

// export const revalidate = 3600; // Revalidate this page every hour

export const metadata: Metadata = {
  title: "Cabins",
  description: "Explore our luxury cabins located in the Italian Dolomites",
  openGraph: {
    title: "Luxury Cabins at The Wild Oasis",
    description:
      "Discover our cozy and luxurious cabins in the Italian Dolomites",
    type: "website",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ capacity?: string }>;
}) {
  const allowedFilters = ["all", "small", "medium", "large"] as const;
  const rawFilter = (await searchParams)?.capacity;
  const filter = allowedFilters.includes(
    rawFilter as (typeof allowedFilters)[number]
  )
    ? (rawFilter as (typeof allowedFilters)[number])
    : "all";

  return (
    <main className="min-w-0">
      <h1 className="mb-4 text-3xl font-medium text-accent-400 sm:mb-5 md:text-4xl">
        Our Luxury Cabins
      </h1>

      <p className="mb-8 text-base leading-relaxed text-primary-200 sm:mb-10 sm:text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-6 flex min-w-0 flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-center md:justify-end">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </main>
  );
}
