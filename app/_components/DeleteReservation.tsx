"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({
  bookingId,
  onDelete,
}: {
  bookingId: string;
  onDelete: (bookingId: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex min-h-12 grow items-center justify-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-all duration-200 hover:bg-red-500/90 hover:text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:opacity-70 md:min-h-0 md:flex-col md:py-4 lg:flex-row lg:py-3 xl:flex-col xl:py-4"
      aria-label={`Delete reservation ${bookingId}`}
      disabled={isPending}
    >
      {!isPending ? (
        <>
          <TrashIcon className="size-5 shrink-0 text-primary-600 transition-colors group-hover:text-primary-50 md:size-6" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
