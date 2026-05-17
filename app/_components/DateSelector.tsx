"use client";

import { useEffect, useState } from "react";
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

function getMonthCount(width: number): number {
  if (width < 768) return 1;
  if (width < 1024) return 2;
  if (width < 1536) return 1;
  return 1;
}

function DateSelector({ settings, cabin, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  const [monthCount, setMonthCount] = useState(1);

  useEffect(() => {
    function apply() {
      setMonthCount(getMonthCount(window.innerWidth));
    }
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const { regularPrice, discount = 0 } = cabin;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  const handleSelectRange = (value: DateRange | undefined) => {
    setRange({ from: value?.from, to: value?.to });
  };

  return (
    <div className="flex min-w-0 flex-col justify-between gap-4 sm:gap-6 lg:gap-8">
      <div className="w-full min-w-0 overflow-x-auto px-1 sm:px-2">
        <DayPicker
          className={`mx-auto w-full max-w-full place-items-center pt-4 sm:pt-8 lg:pt-10 ${monthCount > 1 ? "rdp-months--multi" : ""}`}
          mode="range"
          pagedNavigation
          onSelect={handleSelectRange}
          selected={displayRange}
          min={minBookingLength}
          max={maxBookingLength}
          startMonth={new Date()}
          endMonth={new Date(new Date().getFullYear() + 5, 11)}
          captionLayout="dropdown"
          numberOfMonths={monthCount}
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
      </div>

      <div className="flex min-h-0 flex-col items-center gap-3 bg-accent-500 px-3 py-3 text-primary-800 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex w-full flex-wrap items-baseline justify-center gap-3 sm:justify-start sm:gap-4 md:gap-6 lg:gap-4 lg:justify-start xl:gap-6">
          <p className="flex items-baseline gap-1.5 sm:gap-2">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="text-base font-semibold text-primary-700 line-through sm:text-lg">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="text-sm sm:text-base">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2.5 py-1.5 text-lg sm:px-3 sm:py-2 sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-sm font-bold uppercase sm:text-base md:text-lg lg:text-base xl:text-lg">
                  Total
                </span>{" "}
                <span className="text-lg font-semibold sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            type="button"
            className="min-h-10 w-full shrink-0 cursor-pointer touch-manipulation rounded border border-primary-800 px-4 py-2 text-sm font-semibold sm:min-h-0 sm:w-auto sm:self-auto lg:min-h-10  xl:min-h-0 lg:w-auto"
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
