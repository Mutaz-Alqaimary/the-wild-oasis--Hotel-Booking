import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "@/app/_lib/actions";

function SignOutButton() {
  // If signing out requires client-side behavior, replace this with a client component
  // and implement the actual sign-out logic (e.g. call an API or auth signOut).
  return (
    <form action={signOutAction}>
      <button
        className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full cursor-pointer"
        aria-label="Sign out"
      >
        <ArrowRightStartOnRectangleIcon
          className="h-5 w-5 text-primary-600"
          aria-hidden
        />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
