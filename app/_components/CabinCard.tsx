import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { Cabin } from "./CabinList";


interface Props {
  cabin: Cabin;
  isFirst?: boolean;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const CabinCard: FC<Props> = ({ cabin, isFirst }) => {
  const { id, name, maxCapacity, regularPrice, discount = 0, image } = cabin;
  const priceNow = Math.max(0, regularPrice - discount);

  return (
    <article
      className="flex flex-col overflow-hidden rounded-sm border border-primary-800 xl:flex-row xl:min-h-0"
      aria-labelledby={`cabin-${id}-title`}
    >
      <div className="relative min-h-56 flex-1 sm:min-h-52">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover sm:border-r sm:border-primary-800"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 280px"
          {...(isFirst ? { preload: true, loading: "eager" } : {})}
        />
      </div>

      <div className="sm:grow">
        <div className="bg-primary-950 px-5 pb-4 pt-5 sm:px-7">
          <h3
            id={`cabin-${id}-title`}
            className="mb-3 text-xl font-semibold text-accent-500 sm:text-2xl"
          >
            {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" aria-hidden />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex flex-wrap items-baseline justify-end gap-2 gap-y-1 sm:gap-3">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-[350] sm:text-3xl">
                  {formatCurrency(priceNow)}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  {formatCurrency(regularPrice)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-[350] sm:text-3xl">
                {formatCurrency(regularPrice)}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-primary-800 bg-primary-950 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block w-full border-primary-800 py-4 text-center transition-all hover:bg-accent-600 hover:text-primary-900 lg:w-auto lg:border-l lg:px-6 lg:text-left"
            aria-label={`View details and reserve ${name}`}
          >
            Details & reservation →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CabinCard;
