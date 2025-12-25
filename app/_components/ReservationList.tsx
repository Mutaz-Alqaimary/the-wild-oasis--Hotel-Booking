"use client";

import { useOptimistic } from "react";
import { deleteBooking } from "../_lib/actions";

import ReservationCard from "./ReservationCard";
import type { Booking } from "@/types/booking";

function ReservationList({ bookings } : { bookings: Booking[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic<Booking[], Booking['id']>(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: Booking['id']): Promise<void> {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
