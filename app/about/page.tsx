import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about The Wild Oasis, a family-run luxury cabin retreat in the Italian Dolomites since 1962",
  openGraph: {
    title: "About The Wild Oasis",
    description: "Family-run luxury cabin retreat in the Italian Dolomites",
    type: "website",
  },
};

export default async function Page(): Promise<ReactElement> {
  const cabins = await getCabins();

  return (
    <main>
      <div className="grid grid-cols-1 items-center gap-x-0 gap-y-10 text-base sm:gap-y-12 sm:text-lg lg:grid-cols-5 lg:gap-x-16 lg:gap-y-24 xl:gap-x-24">
        <div className="min-w-0 lg:col-span-3">
          <h1 className="mb-6 text-2xl font-medium text-accent-400 sm:mb-8 sm:text-3xl lg:mb-10 lg:text-4xl">
            Welcome to The Wild Oasis
          </h1>

          <div className="space-y-6 sm:space-y-8">
            <p>
              Where nature&apos;s beauty and comfortable living blend
              seamlessly. Hidden away in the heart of the Italian Dolomites,
              this is your paradise away from home. But it&apos;s not just about
              the luxury cabins. It&apos;s about the experience of reconnecting
              with nature and enjoying simple pleasures with family.
            </p>
            <p>
              Our {cabins.length} luxury cabins provide a cozy base, but the
              real freedom and peace you&apos;ll find in the surrounding
              mountains. Wander through lush forests, breathe in the fresh air,
              and watch the stars twinkle above from the warmth of a campfire or
              your hot tub.
            </p>
            <p>
              This is where memorable moments are made, surrounded by
              nature&apos;s splendor. It&apos;s a place to slow down, relax, and
              feel the joy of being together in a beautiful setting.
            </p>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg lg:col-span-2">
          <Image
            src={image1}
            alt="Family sitting around a fire pit in front of cabin"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-5/3 w-full object-cover md:aspect-2/1"
          />
        </div>

        <div className="min-w-0 overflow-hidden rounded-lg lg:col-span-2">
          <Image
            src={image2}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-5/3 w-full object-cover md:aspect-2/1"
            alt="Family that manages The Wild Oasis"
          />
        </div>

        <div className="min-w-0 lg:col-span-3">
          <h1 className="mb-6 text-2xl font-medium text-accent-400 sm:mb-8 sm:text-3xl lg:mb-10 lg:text-4xl">
            Managed by our family since 1962
          </h1>

          <div className="space-y-6 sm:space-y-8">
            <p>
              Since 1962, The Wild Oasis has been a cherished family-run
              retreat. Started by our grandparents, this haven has been nurtured
              with love and care, passing down through our family as a testament
              to our dedication to creating a warm, welcoming environment.
            </p>
            <p>
              Over the years, we&apos;ve maintained the essence of The Wild
              Oasis, blending the timeless beauty of the mountains with the
              personal touch only a family business can offer. Here, you&apos;re
              not just a guest; you&apos;re part of our extended family. So join
              us at The Wild Oasis soon, where tradition meets tranquility, and
              every visit is like coming home.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4 sm:pt-6 md:pt-8 lg:pt-10">
        <Link
          href="/cabins"
          className="flex min-h-11 items-center justify-center rounded-md bg-accent-500 px-6 py-3 text-base font-semibold text-primary-800 transition-colors hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 sm:px-10 sm:py-4 sm:text-lg"
        >
          Explore Our Luxury Cabins
        </Link>
      </div>
    </main>
  );
}
