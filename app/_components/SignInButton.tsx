import Image from "next/image";
import { signInAction } from "@/app/_lib/actions";

function SignInButton() {
  return (
    <form action={signInAction} className="w-full max-w-md">
      <button
        type="submit"
        className="flex w-full min-h-11 cursor-pointer touch-manipulation items-center justify-center gap-3 rounded-md border border-primary-300 px-4 py-3 text-base font-medium hover:bg-primary-50 hover:text-primary-900 sm:gap-6 sm:px-8 sm:py-4 sm:text-lg md:px-10"
      >
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height={24}
          width={24}
          className="shrink-0"
        />
        <span className="text-balance">Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
