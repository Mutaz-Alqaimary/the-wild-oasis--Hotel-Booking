import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "@/app/_components/TextExpander";
import type { Cabin as CabinType } from "@/app/_components/CabinList";

export default function Cabin({ cabin }: { cabin: CabinType }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="mb-16 grid grid-cols-1 gap-8 border border-primary-800 px-4 py-6 sm:mb-20 sm:gap-12 sm:px-6 sm:py-8 md:mb-20 md:grid-cols-[3fr_4fr] md:gap-14 md:px-8 md:py-10 lg:mb-24 lg:gap-16 xl:gap-20 xl:px-10 xl:py-3">
      <div className="relative aspect-4/3 min-h-[220px] w-full overflow-hidden sm:aspect-16/10 md:aspect-10/16 md:min-h-[min(100%,28rem)] lg:aspect-auto lg:min-h-112 lg:scale-[1.08] lg:-translate-x-2 xl:scale-[1.15] xl:-translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 42vw, 38vw"
        />
      </div>

      <div className="min-w-0 md:flex md:flex-col md:justify-center md:py-2">
        <h3 className="mb-4 bg-primary-950 pb-1 text-3xl font-black text-accent-100 sm:mb-5 sm:p-4 sm:text-4xl md:mb-6 md:p-5 md:text-5xl lg:-ml-6 lg:w-[calc(100%+1.5rem)] lg:p-6 lg:text-6xl xl:text-7xl">
          Cabin {name}
        </h3>

        <p className="mb-8 text-base text-primary-300 sm:text-lg md:mb-9 md:text-xl md:leading-relaxed lg:mb-10">
          <TextExpander>{String(description)}</TextExpander>
        </p>

        <ul className="mb-7 flex flex-col gap-4 md:mb-8 md:gap-5">
          <li className="flex items-start gap-3 sm:items-center md:gap-4">
            <UsersIcon className="h-5 w-5 shrink-0 text-primary-600 md:h-6 md:w-6" />
            <span className="text-base sm:text-lg md:text-xl">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>

          <li className="flex items-start gap-3 sm:items-center md:gap-4">
            <MapPinIcon className="h-5 w-5 shrink-0 text-primary-600 md:h-6 md:w-6" />
            <span className="text-base sm:text-lg md:text-xl">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>

          <li className="flex items-start gap-3 sm:items-center md:gap-4">
            <EyeSlashIcon className="h-5 w-5 shrink-0 text-primary-600 md:h-6 md:w-6" />
            <span className="text-base sm:text-lg md:text-xl">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
