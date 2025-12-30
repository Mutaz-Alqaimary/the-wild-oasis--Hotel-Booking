import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import Image from "next/image";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/cabins", label: "Cabins" },
  { href: "/about", label: "About" },
  { href: "/account", label: "Guest area" },
];

async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl" aria-label="Main navigation">
      <ul className="flex gap-16 items-center">
        {navItems.map((item) => (
          <li key={item.label}>
            {session?.user?.image && item.href === "/account" ? (
              <Link
                href={item.href}
                className="hover:text-accent-400 transition-colors flex items-center gap-4"
              >
                <Image
                  className="h-8 rounded-full"
                  src={String(session?.user?.image)}
                  alt={String(session?.user?.name)}
                  referrerPolicy="no-referrer"
                  width={32}
                  height={32}
                />
                <span>{item.label}</span>
              </Link>
            ) : (
              <Link
                href={item.href}
                className="hover:text-accent-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
