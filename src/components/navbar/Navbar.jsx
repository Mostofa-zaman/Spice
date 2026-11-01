"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/common/Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-mist ${
      isActive(href) ? "text-ember" : "text-charcoal"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

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