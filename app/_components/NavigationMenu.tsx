"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/cabins", label: "Cabins" },
  { href: "/about", label: "About" },
  { href: "/account", label: "Guest area" },
] as const;

function isActivePath(activePath: string, href: string) {
  if (href === "/") return activePath === "/";
  if (activePath === href) return true;
  return activePath.startsWith(`${href}/`);
}

export type NavigationMenuProps = {
  userImage: string | null;
  userName: string | null;
};

export default function NavigationMenu({
  userImage,
  userName,
}: NavigationMenuProps) {
  const [open, setOpen] = useState(false);
  const mobileShellRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const activePath = pathname ?? "/";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileShellRef.current &&
        !mobileShellRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <nav
        className="z-10 hidden text-base md:block lg:text-xl"
        aria-label="Main navigation"
      >
        <ul className="flex items-center gap-8 lg:gap-12 xl:gap-16">
          {navItems.map((item) => (
            <li key={item.href}>
              {userImage && item.href === "/account" ? (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 transition-colors hover:text-accent-400 ${
                    isActivePath(activePath, item.href)
                      ? "font-semibold text-accent-400"
                      : "font-medium text-primary-100"
                  }`}
                >
                  <Image
                    className="h-8 w-8 shrink-0 rounded-full ring-2 ring-primary-800"
                    src={userImage}
                    alt=""
                    aria-hidden
                    width={32}
                    height={32}
                    referrerPolicy="no-referrer"
                  />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className={`whitespace-nowrap transition-colors hover:text-accent-400 ${
                    isActivePath(activePath, item.href)
                      ? "font-semibold text-accent-400"
                      : "font-medium text-primary-100"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div ref={mobileShellRef} className="md:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-main-nav"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-md border border-primary-800 bg-primary-900 text-primary-100 transition hover:border-accent-500/40 hover:bg-primary-800 hover:text-accent-400 cursor-pointer"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <Bars3Icon className="h-6 w-6" aria-hidden />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {open && (
            <motion.aside
              key="mobile-drawer"
              id="mobile-main-nav"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-x-0 top-20 z-40 w-full border-b border-primary-800 bg-primary-950/95 shadow-xl backdrop-blur-sm sm:top-24"
            >
              <nav
                className="flex flex-col gap-1 p-6"
                aria-label="Mobile main navigation"
              >
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    {userImage && item.href === "/account" ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-4 rounded-md px-2 py-3 text-lg transition hover:bg-primary-800 hover:text-accent-400 ${
                          isActivePath(activePath, item.href)
                            ? "bg-primary-800 font-semibold text-accent-400"
                            : "font-medium text-primary-100"
                        }`}
                      >
                        <Image
                          className="h-10 w-10 shrink-0 rounded-full ring-2 ring-primary-700"
                          src={userImage}
                          alt=""
                          aria-hidden
                          width={40}
                          height={40}
                          referrerPolicy="no-referrer"
                        />
                        <span className="flex flex-col gap-0.5">
                          <span>{item.label}</span>
                          {userName ? (
                            <span className="text-sm font-normal text-primary-300">
                              {userName}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-md px-2 py-3 text-lg transition hover:bg-primary-800 hover:text-accent-400 ${
                          isActivePath(activePath, item.href)
                            ? "bg-primary-800 font-semibold text-accent-400"
                            : "font-medium text-primary-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
