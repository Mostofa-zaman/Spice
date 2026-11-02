"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname,  } from "next/navigation";
import { m } from "framer-motion";

import { ChevronDown, Heart, Menu, Search, ShoppingBag} from "lucide-react";
import Logo from "@/components/common/Logo";
import SearchDialog from "./SearchDialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getRealCategories } from "@/services/productService";

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
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};



export default function Navbar() {
  const pathname = usePathname();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBtnRef = useRef(null);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const categories = getRealCategories();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const linkClass = (href) => `rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-mist ${isActive(href) ? "text-ember" : "text-charcoal"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-mist lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-5">
                <m.ul
                  variants={listVariants}
                  initial="hidden"
                  animate={mobileOpen ? "show" : "hidden"}
                  className="space-y-1"
                >
                  {links.map((l) => (
                    <m.li key={l.href} variants={itemVariants}>
                    <m.li key={l.href} variants={itemVariants}>
                      <SheetClose asChild>
                        <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={`block rounded-xl px-3 py-3 text-base font-medium ${isActive(l.href) ? "bg-white text-ember" : "hover:bg-mist"}`}>
                          {l.label}
                        </Link>
                      </SheetClose>
                    </m.li>
                    </m.li>
                  ))}
                </m.ul>
                <p className="px-3 pb-2 pt-6 text-sm font-semibold text-charcoal/70">Categories</p>
                <m.ul variants={listVariants} initial="hidden" animate={mobileOpen ? "show" : "hidden"} className="grid grid-cols-2 gap-1">
                  {categories.map((c) => (
                    <m.li key={c.id} variants={itemVariants}>
                      <SheetClose asChild>
                        <Link href={`/categories/${c.slug}`} className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-mist">
                          <span aria-hidden="true">{c.emoji}</span> {c.name}
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

        {/* Desktop Navigation */}
        <m.nav aria-label="Main" variants={listVariants} initial="hidden" animate="show" className="hidden items-center gap-1 lg:flex">
          {links.slice(0, 2).map((l) => (
            <m.div key={l.href} variants={itemVariants}>
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={linkClass(l.href)}>{l.label}</Link>
            </m.div>
          ))}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button type="button" className={`group inline-flex items-center gap-1 ${linkClass("/categories")}`}>
                Categories
                <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" aria-hidden="true" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="grid w-80 grid-cols-2 gap-1">
              {categories.map((c) => (
                <DropdownMenuItem key={c.id} asChild>
                  <Link href={`/categories/${c.slug}`}>
                    <span aria-hidden="true">{c.emoji}</span> {c.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {links.slice(2).map((l) => (
            <m.div key={l.href} variants={itemVariants}>
              <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={linkClass(l.href)}>{l.label}</Link>
            </m.div>
          ))}
        </m.nav>

        {/* Actions */}
        <div className="flex items-center gap-0.5 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" ref={searchBtnRef} onClick={() => setSearchOpen(true)} aria-label="Search" className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-mist sm:h-10 sm:w-10">
                <Search className="h-5 w-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Search</TooltipContent>
          </Tooltip>
          <IconLink href="/wishlist" label="Wishlist" count={wishCount}>
            <Heart className="h-5 w-5" />
          </IconLink>
          <IconLink href="/cart" label="Cart" count={cartCount}>
            <ShoppingBag className="h-5 w-5" />
          </IconLink>
        </div>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} returnFocusRef={searchBtnRef} />
    </header>
  );
}
