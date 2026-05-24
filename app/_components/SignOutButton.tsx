"use client";

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { toast } from "sonner";
import { signOutAction } from "@/app/_lib/actions";

function SignOutButton() {
  return (
    <form
      action={signOutAction}
      className="w-full"
      onSubmit={() =>
        toast.loading("Signing you out...", {
          id: "auth-sign-out",
        })
      }
    >
      <button
        className="group flex min-h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full px-0 py-2.5 text-sm font-semibold text-primary-200 transition-all duration-300 ease-out hover:bg-red-700 hover:text-white focus-visible:bg-red-700 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 sm:w-full sm:justify-start sm:gap-3 sm:rounded-md sm:px-4 sm:py-3 sm:text-base lg:rounded-none"
        aria-label="Sign out"
      >
        <ArrowRightStartOnRectangleIcon
          className="h-5 w-5 shrink-0 text-primary-600 transition-colors group-hover:text-white group-focus-visible:text-white"
          aria-hidden
        />
        <span className="max-w-0 whitespace-nowrap opacity-0 transition-all duration-300 ease-out sm:max-w-none sm:opacity-100">
          Sign out
        </span>
      </button>
    </form>
  );
}

export default SignOutButton;
