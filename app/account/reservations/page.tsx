import Link from "next/link";
import type { Metadata } from "next";

import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

import ReservationList from "@/app/_components/ReservationList";
import type { Booking } from "@/types/booking";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reservations",
  description: "View and manage your reservations at The Wild Oasis",
};

export default async function Page() {
  const session = await auth();
  const guestId = session?.user.guestId;

  if (!guestId) {
    redirect("/login");
  }

  const rawBookings = await getBookings(guestId);
  const bookings: Booking[] = rawBookings.map((b) => ({
    ...b,
    cabins: Array.isArray(b.cabins) ? b.cabins[0] : b.cabins,
  }));

  return (
    <main className="min-w-0">
      <header className="mb-6 flex flex-col items-center gap-3 border-b border-primary-800/70 pb-5 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-400">
            Account stays
          </p>
          <h2 className="text-2xl font-semibold text-accent-400 sm:text-3xl">
            Your reservations
          </h2>
        </div>
        {bookings.length > 0 ? (
          <span className="w-fit rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-sm font-semibold text-accent-300">
            {bookings.length} booking{bookings.length === 1 ? "" : "s"}
          </span>
        ) : null}
      </header>

      {bookings.length === 0 ? (
        <section
          aria-live="polite"
          className="rounded-md border border-dashed border-primary-700 bg-primary-900/45 p-5 motion-safe:animate-[card-enter_500ms_ease-out_both] sm:p-7"
        >
          <p className="max-w-2xl text-base leading-7 text-primary-200 sm:text-lg">
            You have no reservations yet. Check out our{" "}
            <Link
              className="font-semibold text-accent-400 underline decoration-accent-500/40 underline-offset-4 transition-colors hover:text-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
              href="/cabins"
            >
              luxury cabins &rarr;
            </Link>
          </p>
        </section>
      ) : (
        <section
          aria-label="Your reservations"
          className="motion-safe:animate-[content-fade-up_600ms_ease-out_120ms_both]"
        >
          <ReservationList bookings={bookings} />
        </section>
      )}
    </main>
  );
}
