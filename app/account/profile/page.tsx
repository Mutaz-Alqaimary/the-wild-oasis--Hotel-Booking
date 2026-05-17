import type { Metadata } from "next";
import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata: Metadata = {
  title: "Update profile",
  description:
    "Update your guest profile to speed up check-in at The Wild Oasis",
};

export default async function Page() {
  const session = await auth();
  const guest = await getGuest(session?.user.email || "");

  return (
    <main className="min-w-0">
      <header className="mb-7 border-b border-primary-800/70 pb-5 text-center motion-safe:animate-[content-fade-up_500ms_ease-out_both] sm:text-left">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-400">
          Guest details
        </p>
        <h2 className="text-2xl font-semibold text-accent-400 sm:text-3xl">
          Update your guest profile
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-primary-200 sm:mx-0 sm:text-lg">
          Providing the following information will make your check-in process
          faster and smoother. See you soon!
        </p>
      </header>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="min-h-12 w-full rounded-md border border-primary-700/20 bg-primary-100 px-4 py-3 text-primary-900 shadow-sm outline-none transition-all duration-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/40 sm:px-5"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </main>
  );
}
