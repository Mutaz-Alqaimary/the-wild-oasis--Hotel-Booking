import MutationForm from "@/app/_components/MutationForm";
import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const { numGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <main className="min-w-0">
      <header className="mb-6 border-b border-primary-800/70 pb-5 text-center sm:mb-7 sm:text-left">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-400">
          Reservation details
        </p>
        <h2 className="wrap-break-word text-2xl font-semibold text-accent-400 sm:text-3xl">
          Edit reservation #{bookingId}
        </h2>
      </header>

      <MutationForm
        action={updateBooking}
        loadingMessage="Saving reservation changes..."
        errorMessage="Could not update your reservation"
        className="flex flex-col gap-6 rounded-md border border-primary-800/80 bg-primary-900/80 px-4 py-6 text-base shadow-2xl shadow-primary-950/20 motion-safe:animate-[card-enter_520ms_ease-out_both] motion-safe:[animation-name:card-enter,soft-glow] motion-safe:[animation-duration:520ms,2400ms] motion-safe:[animation-delay:0ms,520ms] motion-safe:[animation-timing-function:ease-out,ease-in-out] motion-safe:[animation-fill-mode:both,none] sm:px-8 sm:py-8 sm:text-lg md:px-10 xl:px-12"
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <div className="space-y-2">
          <label
            htmlFor="numGuests"
            className="block font-semibold text-primary-100"
          >
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="min-h-12 w-full rounded-md border border-primary-700/20 bg-primary-100 px-4 py-3 text-primary-900 shadow-sm outline-none transition-all duration-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/40 sm:px-5"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="observations"
            className="block font-semibold text-primary-100"
          >
            Anything we should know about your stay?
          </label>
          <textarea
            id="observations"
            name="observations"
            defaultValue={observations}
            className="min-h-40 w-full resize-y rounded-md border border-primary-700/20 bg-primary-100 px-4 py-3 text-primary-900 shadow-sm outline-none transition-all duration-200 placeholder:text-primary-500 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/40 sm:min-h-48 sm:px-5"
            placeholder="Dietary needs, arrival time, or anything else helpful."
          />
        </div>

        <div className="flex flex-col items-stretch gap-4 border-t border-primary-800/80 pt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-6 sm:pt-4">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </MutationForm>
    </main>
  );
}
