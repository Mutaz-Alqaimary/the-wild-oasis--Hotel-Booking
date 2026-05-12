import SignInButton from "@/app/_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-lg flex-col items-center gap-6 px-1 sm:mt-10 sm:gap-10">
      <h2 className="text-balance text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
        Sign in to access your guest area
      </h2>

      <SignInButton />
    </div>
  );
}
