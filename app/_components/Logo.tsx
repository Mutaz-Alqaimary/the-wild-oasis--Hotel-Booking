import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import type { FC } from "react";

const Logo: FC = () => {
  return (
    <Link
      href="/"
      className="z-10 flex min-w-0 shrink items-center gap-2 sm:gap-3 md:gap-4"
    >
      <Image
        src={logo}
        width={60}
        height={60}
        alt="The Wild Oasis logo"
        preload={true}
        className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 md:h-[60px] md:w-[60px]"
      />
      <span className="truncate text-base font-semibold text-primary-100 transition-colors hover:text-accent-400 sm:text-lg md:text-xl">
        The Wild Oasis
      </span>
    </Link>
  );
};

export default Logo;
