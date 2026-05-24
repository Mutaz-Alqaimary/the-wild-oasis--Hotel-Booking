"use client";

import Image from "next/image";
import { differenceInDays } from "date-fns";

import { createBooking } from "@/app/_lib/actions";
import type { Cabin as CabinType } from "@/app/_components/CabinList";

import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";
import MutationForm from "./MutationForm";

interface ReservationFormProps {
  cabin: CabinType;
  user: { name: string; image?: string };
}

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount = 0, id } = cabin;

  const startDate = range.from!;
  const endDate = range.to!;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3 bg-primary-800 px-5 py-3 text-primary-300 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 md:px-12 lg:px-16">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={String(user.image)}
            alt={String(user.name)}
            width={32}
            height={32}
          />
          <p className="truncate text-sm font-medium sm:text-base">{user.name}</p>
        </div>
      </div>

      <MutationForm
        action={createBookingWithData}
        loadingMessage="Preparing your reservation..."
        errorMessage="Could not create your reservation"
        successMessage="Your reservation has been created"
        onSuccess={resetRange}
        ariaLabel="Reservation form"
        className="flex flex-col flex-1 gap-5 bg-primary-900 px-5 py-8 text-base sm:px-10 sm:py-10 sm:text-lg md:px-14 lg:px-16"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="min-h-11 w-full rounded-sm bg-primary-200 px-4 py-3 text-primary-800 shadow-sm sm:min-h-0 sm:px-5"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num}>
                {num} {num === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="min-h-40 w-full rounded-sm bg-primary-200 px-4 py-3 text-primary-800 shadow-sm sm:min-h-48 sm:px-5"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-center text-sm text-primary-300 sm:text-right sm:text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </MutationForm>
    </div>
  );
}

export default ReservationForm;
