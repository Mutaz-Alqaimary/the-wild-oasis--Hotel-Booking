import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid min-h-48 place-items-center bg-primary-800 px-4 py-10 sm:min-h-56 sm:py-12">
      <p className="max-w-md text-center text-lg leading-relaxed text-primary-100 sm:text-xl">
        Please{" "}
        <Link href="/login" className="text-accent-500 underline">
          login
        </Link>{" "}
        to reserve this cabin right now.
      </p>
    </div>
  );
}

export default LoginMessage;
