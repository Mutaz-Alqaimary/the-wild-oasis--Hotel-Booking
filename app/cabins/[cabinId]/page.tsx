import { Suspense } from "react";
import type { Metadata } from "next";

import type { Cabin as CabinType } from "@/app/_components/CabinList";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Cabin from "@/app/_components/Cabin";
import Spinner from "@/app/_components/Spinner";
import Reservation from "@/app/_components/Reservation";

interface CabinPageParams {
  cabinId: string;
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<CabinPageParams>;
}): Promise<Metadata> {
  const { cabinId } = await params;
  const cabin: CabinType = await getCabin(cabinId);

  return {
    title: `Cabin ${cabin.name}`,
    description: cabin.description || `Discover our ${cabin.name} cabin`,
  };
}

// Static params
export async function generateStaticParams(): Promise<CabinPageParams[]> {
  const cabins: CabinType[] = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }: { params: Promise<CabinPageParams> }) {
  const { cabinId } = await params;
  const cabin: CabinType = await getCabin(cabinId);

  return (
    <div className="mx-auto mt-6 max-w-6xl min-w-0 sm:mt-8">
      <Cabin cabin={cabin} />

      <div className="min-w-0">
        <h2 className="mb-8 px-1 text-center text-2xl font-semibold leading-snug text-pretty sm:mb-10 sm:px-0 sm:text-3xl md:mb-12 md:px-2 md:text-4xl lg:text-5xl">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
