import Spinner from "@/app/_components/Spinner";

export default function Loading() {
  return (
    <div className="flex min-h-[min(70vh,36rem)] min-w-0 flex-col items-center justify-center gap-3 px-2 py-12 text-center sm:gap-4 sm:py-16 md:py-20">
      <Spinner />
      <p className="text-base text-primary-200 sm:text-lg md:text-xl">
        Loading cabin data...
      </p>
    </div>
  );
}
