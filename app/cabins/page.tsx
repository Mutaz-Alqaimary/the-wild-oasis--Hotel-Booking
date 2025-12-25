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
    <main>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>

      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </main>
  );
}
