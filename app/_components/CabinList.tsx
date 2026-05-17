// import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { StaticImageData } from "next/image";
import Link from "next/link";

export interface Cabin {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  image: string | StaticImageData;
  description?: string;
}

async function CabinList({
  filter,
}: {
  filter: "all" | "small" | "medium" | "large";
}) {
  // noStore();

  const cabins: Cabin[] = await getCabins();

  let displayedCabins: Cabin[] = [];
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return displayedCabins.length > 0 ? (
    <section
      aria-label="Available cabins"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-[repeat(auto-fill,minmax(min(100%,450px),1fr))] lg:gap-12 xl:gap-14"
    >
      {displayedCabins.map((cabin, index) => (
        <CabinCard cabin={cabin} key={cabin.id} isFirst={index === 0} />
      ))}
    </section>
  ) : (
    <div className="py-20 text-center">
      <p className="text-primary-200 mb-4">
        We currently have no cabins listed.
      </p>
      <Link
        href="/"
        className="inline-block bg-accent-500 px-6 py-3 text-primary-900 font-semibold hover:bg-accent-600 transition"
      >
        Browse other pages
      </Link>
    </div>
  );
}

export default CabinList;
