import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";
import type { Booking } from "@/types/booking";

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

function ReservationCard({
  booking,
  onDelete,
}: {
  booking: Booking;
  onDelete: (bookingId: Booking["id"]) => void;
}) {
  const {
    id,
    // guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    // status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <article
      className="group/card flex flex-col overflow-hidden rounded-md border border-primary-800/80 bg-primary-900/45 shadow-lg shadow-primary-950/10 transition-all duration-300 motion-safe:animate-[card-enter_520ms_ease-out_both] hover:-translate-y-0.5 hover:border-accent-500/50 hover:bg-primary-900/70 hover:shadow-2xl hover:shadow-primary-950/25 md:min-h-44 md:flex-row lg:min-h-0 lg:flex-col xl:min-h-48 xl:flex-row"
      aria-labelledby={`reservation-${id}-title`}
    >
      <div className="relative aspect-21/9 w-full md:h-auto md:w-44 md:shrink-0 md:aspect-auto lg:h-auto lg:w-full lg:aspect-21/9 xl:w-52 xl:aspect-auto">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 176px, (max-width: 1280px) 100vw, 208px"
          className="border-b border-primary-800 object-cover transition-transform duration-500 group-hover/card:scale-105 md:border-b-0 md:border-r lg:border-b lg:border-r-0 xl:border-b-0 xl:border-r"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-950/35 to-transparent md:hidden lg:block xl:hidden" />
      </div>

      <div className="flex min-w-0 grow flex-col px-4 py-4 sm:px-6 md:px-6 md:py-5 lg:px-8 lg:py-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4 lg:flex-col xl:flex-row">
          <h3
            id={`reservation-${id}-title`}
            className="text-lg font-semibold leading-tight text-primary-50 sm:text-xl lg:text-2xl"
          >
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex h-7 w-fit shrink-0 items-center rounded-full border border-yellow-500/30 bg-yellow-500/15 px-3 text-xs font-bold uppercase text-yellow-200">
              past
            </span>
          ) : (
            <span className="flex h-7 w-fit shrink-0 items-center rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 text-xs font-bold uppercase text-emerald-200">
              upcoming
            </span>
          )}
        </div>

        <p className="mt-2 text-base leading-7 text-primary-300 md:text-base lg:mt-3 lg:text-lg">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-4 md:flex-row md:flex-wrap md:items-baseline md:gap-x-4 md:gap-y-2 md:pt-4 lg:flex-col lg:items-start lg:gap-3 lg:pt-5 xl:flex-row xl:items-baseline xl:gap-x-5">
          <p className="text-xl font-semibold text-accent-400 lg:text-2xl">
            {formatCurrency(totalPrice)}
          </p>
          <p className="hidden text-primary-300 md:inline lg:hidden xl:inline">
            &bull;
          </p>
          <p className="text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 ? "s" : ""}
          </p>
          <p className="text-sm text-primary-400 md:ml-auto lg:ml-0 xl:ml-auto">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {!isPast(startDate) ? (
        <div className="flex border-t border-primary-800/80 bg-primary-950/20 md:w-24 md:shrink-0 md:flex-col md:border-l md:border-t-0 lg:w-full lg:flex-row lg:border-l-0 lg:border-t xl:w-28 xl:flex-col xl:border-l xl:border-t-0">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="group flex min-h-12 flex-1 items-center justify-center gap-2 border-r border-primary-800/80 px-3 text-xs font-bold uppercase text-primary-300 transition-all duration-200 hover:bg-accent-500 hover:text-primary-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 md:grow md:flex-col md:justify-center md:border-r-0 md:border-b md:py-4 lg:flex-row lg:border-r lg:border-b-0 lg:py-3 xl:flex-col xl:border-r-0 xl:border-b xl:py-4"
            aria-label={`Edit reservation ${id}`}
          >
            <PencilSquareIcon
              className="size-5 shrink-0 text-primary-600 transition-colors group-hover:text-primary-950 md:size-6"
              aria-hidden
            />
            <span className="mt-1">Edit</span>
          </Link>
          <DeleteReservation bookingId={id} onDelete={onDelete} />
        </div>
      ) : null}
    </article>
  );
}

export default ReservationCard;
