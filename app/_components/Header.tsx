import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import type { FC } from "react";

const Header: FC = () => {
  return (
    <header
      className="border-b border-primary-900 px-4 py-4 sm:px-6 sm:py-5 md:px-8"
      role="banner"
    >
      <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-4">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
