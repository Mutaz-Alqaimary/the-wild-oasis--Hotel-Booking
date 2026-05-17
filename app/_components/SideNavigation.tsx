"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import { type ComponentType, type FC, type SVGProps } from "react";
import { usePathname } from "next/navigation";

type NavLink = {
  name: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/account",
    icon: HomeIcon,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: CalendarDaysIcon,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: UserIcon,
  },
];

const SideNavigation: FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-primary-900 lg:h-full lg:border-b-0 lg:border-r"
      aria-label="Account navigation"
    >
      <ul className="flex snap-x snap-mandatory justify-center gap-1 overflow-x-auto rounded-full bg-primary-900/25 p-1 text-sm [-ms-overflow-style:none] [scrollbar-width:none] sm:justify-start sm:gap-2 sm:rounded-none sm:bg-transparent sm:p-0 sm:text-base lg:flex-col lg:gap-2 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/account" && pathname.startsWith(`${link.href}/`));
          const Icon = link.icon;

          return (
            <li
              key={link.name}
              className="snap-start shrink-0 lg:snap-none lg:w-full lg:shrink"
            >
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`group flex min-h-11 items-center justify-center overflow-hidden rounded-full py-2.5 font-semibold transition-all duration-300 ease-out hover:bg-primary-900 hover:text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 sm:justify-start sm:gap-3 sm:rounded-md sm:px-4 sm:py-3 lg:min-h-0 lg:w-full lg:rounded-none ${
                  isActive
                    ? "w-auto gap-2.5 bg-primary-900 px-3.5 text-primary-100 shadow-sm shadow-primary-950/30 sm:w-full"
                    : "w-11 px-0 text-primary-200 sm:w-full sm:px-4"
                }`}
                href={link.href}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "text-accent-400"
                      : "text-primary-600 group-hover:text-primary-100"
                  }`}
                  aria-hidden
                />
                <span
                  className={`whitespace-nowrap transition-all duration-300 ease-out sm:max-w-none sm:opacity-100 ${
                    isActive
                      ? "max-w-32 opacity-100"
                      : "max-w-0 opacity-0 sm:max-w-none"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}

        <li className="snap-start shrink-0 lg:snap-none lg:w-full lg:shrink">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
