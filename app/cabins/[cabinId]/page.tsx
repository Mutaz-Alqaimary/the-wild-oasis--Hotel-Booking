import { Suspense, use } from "react";
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

export default function Page({
  params,
}: {
  params: Promise<CabinPageParams>;
}) {
  const { cabinId } = use(params);
  const cabin: CabinType = use(getCabin(cabinId));

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
