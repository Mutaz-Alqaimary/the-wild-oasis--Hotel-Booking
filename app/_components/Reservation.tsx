import { auth } from "@/app/_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import type { Cabin as CabinType } from "@/app/_components/CabinList";

interface ReservationProps {
  cabin: CabinType;
}

async function Reservation({ cabin }: ReservationProps) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid min-h-0 grid-cols-1 border border-primary-800 sm:min-h-[min(24rem,65vh)] lg:min-h-100 lg:grid-cols-2 *:min-w-0">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={session.user as { name: string; image?: string }}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
