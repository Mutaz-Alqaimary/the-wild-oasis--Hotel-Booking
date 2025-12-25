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
      className="flex flex-col sm:flex-row border-primary-800 border rounded-sm sm:h-auto h-110"
      aria-labelledby={`cabin-${id}-title`}
    >
      <div className="flex-1 relative">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-r border-primary-800"
          sizes="(max-width: 640px) 100vw, 240px"
          {...(isFirst ? { preload: true, loading: "eager" } : {})}
        />
      </div>

      <div className="sm:grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3
            id={`cabin-${id}-title`}
            className="text-accent-500 font-semibold text-2xl mb-3"
          >
            {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" aria-hidden />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  {formatCurrency(priceNow)}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  {formatCurrency(regularPrice)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">
                {formatCurrency(regularPrice)}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
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
