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
    <main>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <section aria-live="polite">
          <p className="text-lg">
            You have no reservations yet. Check out our{" "}
            <Link className="underline text-accent-500" href="/cabins">
              luxury cabins &rarr;
            </Link>
          </p>
        </section>
      ) : (
        <section aria-label="Your reservations">
          {/* <ul className="space-y-6">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <ReservationCard booking={booking} />
              </li>
            ))}
          </ul> */}
          <ReservationList bookings={bookings} />
        </section>
      )}
    </main>
  );
}
