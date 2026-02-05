"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservation } from "./ReservationContext";
import type { Cabin as CabinType } from "@/app/_components/CabinList";

interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
}

interface DateSelectorProps {
  settings: Settings;
  cabin: CabinType;
  bookedDates: Date[];
}

function isAlreadyBooked(
  range: { from?: Date; to?: Date },
  datesArr: Date[],
): boolean {
  if (!range.from || !range.to) return false;
  return datesArr.some((date: Date) =>
    isWithinInterval(date, { start: range.from!, end: range.to! }),
  );
}

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const { regularPrice, discount = 0 } = cabin;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  // Handle DayPicker's DateRange type and convert to ReservationContext's Range type
  const handleSelectRange = (value: DateRange | undefined) => {
    setRange({ from: value?.from, to: value?.to });
  };

  return (
    <div className="flex flex-col justify-between gap-10">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        pagedNavigation
        onSelect={handleSelectRange}
        selected={displayRange}
        min={minBookingLength}
        max={maxBookingLength}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 5, 11)} //
        captionLayout="dropdown"
        numberOfMonths={2}
        animate
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
        footer={
          displayRange?.from && displayRange?.to
            ? `You picked ${displayRange.from?.toLocaleDateString()}, ${displayRange.to?.toLocaleDateString()}.`
            : "Please pick a date."
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-18">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold cursor-pointer"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
