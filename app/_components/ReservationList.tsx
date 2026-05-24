"use client";

import { useOptimistic } from "react";
import { toast } from "sonner";
import { deleteBooking } from "../_lib/actions";

import ReservationCard from "./ReservationCard";
import type { Booking } from "@/types/booking";

function ReservationList({ bookings }: { bookings: Booking[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic<
    Booking[],
    Booking["id"]
  >(bookings, (curBookings, bookingId) => {
    return curBookings.filter((booking) => booking.id !== bookingId);
  });

  async function handleDelete(bookingId: Booking["id"]): Promise<void> {
    optimisticDelete(bookingId);
    toast.promise(deleteBooking(bookingId), {
      loading: "Deleting reservation...",
      success: "Reservation deleted",
      error: (error) =>
        error instanceof Error ? error.message : "Could not delete reservation",
    });
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
