"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex items-center gap-2 bg-accent-500 px-3 py-2 text-sm text-center font-semibold text-primary-800 shadow-xl shadow-slate-900 rounded-3xl sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2 sm:rounded-full sm:gap-6 sm:px-5 sm:py-3 md:text-base mx-4 sm:mx-0">
      <p className="min-w-0 flex-1 leading-snug">
        <span aria-hidden>👋</span> Don&apos;t forget to reserve your dates from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        type="button"
        className="cursor-pointer rounded-full p-2 hover:bg-accent-600 md:p-1"
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
