import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import type { FC } from "react";

const Header: FC = () => {
  return (
    <header className="border-b border-primary-900 px-8 py-5" role="banner">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
