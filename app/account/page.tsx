import { Metadata } from "next";
import { auth } from "@/app/_lib/auth";

export const metadata: Metadata = {
  title: "Guest area",
  description: "Manage your account and reservations at The Wild Oasis",
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")?.at(0) || "Guest";

  return (
    <h2 className="mb-6 text-xl text-center sm:text-left font-semibold text-accent-400 sm:mb-7 sm:text-2xl">
      Welcome, {firstName}
    </h2>
  );
}
