import Link from "next/link";
import Image from "next/image";
import bg from "@/public/bg.png";

export default function Page() {
  return (
    <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
      <div className="absolute inset-0">
        <Image
          src={bg}
          fill
          placeholder="blur"
          quality={75}
          preload={true}
          sizes="100vw"
          className="object-cover object-[center_28%] sm:object-top"
          alt="Mountains and forests with two cabins"
        />
      </div>

      <div className="relative z-10 px-1 text-center sm:px-2">
        <h1 className="mx-auto mb-6 max-w-5xl text-balance text-4xl font-semibold leading-tight text-primary-50 drop-shadow-lg sm:mb-8 sm:text-5xl md:text-6xl lg:mb-10 lg:text-7xl xl:text-7xl">
          Welcome to Paradise
        </h1>
        <Link
          href="/cabins"
          className="inline-flex items-center justify-center rounded-md bg-accent-500 px-5 py-3.5 text-base font-semibold text-primary-800 transition-all hover:bg-accent-600 sm:px-8 sm:py-6 sm:text-lg"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}
