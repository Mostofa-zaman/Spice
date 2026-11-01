"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { m } from "framer-motion";
import Logo from "@/components/common/Logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-mist ${
      isActive(href) ? "text-ember" : "text-charcoal"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-mist lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
              </SheetHeader>

              <nav aria-label="Mobile" className="mt-5">
                <m.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-1"
                >
                  {links.map((link) => (
                    <m.li key={link.href} variants={itemVariants}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          aria-current={
                            isActive(link.href) ? "page" : undefined
                          }
                          className={`block rounded-xl px-3 py-3 text-base font-medium ${
                            isActive(link.href)
                              ? "bg-white text-ember"
                              : "hover:bg-mist"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </m.li>
                  ))}
                </m.ul>
              </nav>
            </SheetContent>
          </Sheet>

          <Logo />
        </div>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}