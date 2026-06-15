import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import MutationForm from "./MutationForm";

function UpdateProfileForm({
  guest,
  children,
}: {
  guest: {
    fullName: string;
    email: string;
    nationalID: string;
  };
  children: React.ReactNode;
}) {
  const { fullName, email, nationalID } = guest;

  return (
    <MutationForm
      action={updateGuest}
      ariaLabel="Update profile form"
      loadingMessage="Saving your profile..."
      successMessage="Profile updated"
      errorMessage="Could not update your profile"
      className="flex flex-col gap-6 rounded-md border border-primary-800/80 bg-primary-900/80 px-4 py-6 text-base shadow-2xl shadow-primary-950/20 motion-safe:animate-[card-enter_520ms_ease-out_120ms_both] sm:px-8 sm:py-8 sm:text-lg md:px-10 xl:px-12"
    >
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="block font-semibold text-primary-100"
        >
          Full name
        </label>
        <input
          id="fullName"
          name="fullName"
          defaultValue={fullName}
          disabled
          className="min-h-12 w-full rounded-md border border-primary-700/20 bg-primary-100 px-4 py-3 text-primary-900 shadow-sm outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:border-primary-800 disabled:bg-primary-800/80 disabled:text-primary-400 sm:px-5"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block font-semibold text-primary-100">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={email}
          disabled
          className="min-h-12 w-full rounded-md border border-primary-700/20 bg-primary-100 px-4 py-3 text-primary-900 shadow-sm outline-none transition-all duration-200 disabled:cursor-not-allowed disabled:border-primary-800 disabled:bg-primary-800/80 disabled:text-primary-400 sm:px-5"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="nationality"
            className="block font-semibold text-primary-100"
          >
            Where are you from?
          </label>
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="nationalID"
          className="block font-semibold text-primary-100"
        >
          National ID number
        </label>
        <input
          id="nationalID"
          name="nationalID"
          defaultValue={nationalID}
          pattern="^[a-zA-Z0-9]{6,12}$"
          title="National ID number must be 6-12 characters long and contain only letters and numbers"
          aria-describedby="nationalID-description"
          placeholder="6-12 characters, letters and numbers only"
          required
          className="min-h-12 w-full rounded-md border border-primary-700/20 bg-primary-100 px-4 py-3 text-primary-900 shadow-sm outline-none transition-all duration-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/40 sm:px-5"
        />
      </div>

      <div className="flex flex-col items-stretch gap-4 border-t border-primary-800/80 pt-2 sm:flex-row sm:items-center sm:justify-end sm:gap-6 sm:pt-4">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </MutationForm>
  );
}

export default UpdateProfileForm;
