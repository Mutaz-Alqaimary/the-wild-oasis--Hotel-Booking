import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { Josefin_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { ReservationProvider } from "@/app/_components/ReservationContext";
import MutationToaster from "@/app/_components/MutationToaster";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
  openGraph: {
    title: "The Wild Oasis",
    description: "Luxurious cabin hotel in the Italian Dolomites",
    type: "website",
    siteName: "The Wild Oasis",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 min-w-0 w-full grid px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:py-12">
          <main className="mx-auto w-full min-w-0 max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>

        <Suspense fallback={null}>
          <MutationToaster />
        </Suspense>
      </body>
    </html>
  );
}
