"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "framer-motion";
import { Search, X } from "lucide-react";
import { searchProducts } from "@/services/productService";
import { formatPrice } from "@/utils/format";

// Global search. The dialog itself is a Radix Dialog (focus trap, Escape to close, screen-reader labels);
// Framer Motion animates the overlay, the panel and the results. Search logic is unchanged.
export default function SearchDialog({ open, onClose, returnFocusRef }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  const results = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 6) : []), [query]);

  // Start fresh every time the dialog opens
  useEffect(() => { if (open) setQuery(""); }, [open]);

  const submit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    router.push(`/menu?search=${encodeURIComponent(query.trim())}`);
    onClose();
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <>
              <DialogPrimitive.Overlay asChild forceMount>
                <m.div className="fixed inset-0 z-[80] bg-charcoal/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild forceMount onOpenAutoFocus={(e) => { e.preventDefault(); inputRef.current?.focus(); }} onCloseAutoFocus={(e) => { e.preventDefault(); returnFocusRef?.current?.focus(); }}>
                <m.div
                  className="fixed inset-x-4 top-[8vh] z-[80] mx-auto w-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-lift"
                  initial={{ opacity: 0, y: -14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <DialogPrimitive.Title className="sr-only">Search the menu</DialogPrimitive.Title>
                  <DialogPrimitive.Description className="sr-only">Type a dish, category or ingredient to see matching food.</DialogPrimitive.Description>
                  <form onSubmit={submit} className="flex items-center gap-3 border-b border-charcoal/10 px-4">
                    <Search className="h-5 w-5 text-charcoal/70" aria-hidden="true" />
                    <label htmlFor="global-search" className="sr-only">Search food</label>
                    <input
                      id="global-search" ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search burgers, biryani, desserts…"
                      className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-charcoal/50"
                      autoComplete="off"
                    />
                    <DialogPrimitive.Close aria-label="Close search" className="rounded-full p-2 hover:bg-mist">
                      <X className="h-5 w-5" />
                    </DialogPrimitive.Close>
                  </form>

                  <div className="max-h-[60vh] overflow-y-auto p-2">
                    {!query.trim() && <p className="px-3 py-6 text-center text-sm text-charcoal/70">Start typing to find a dish.</p>}
                    {query.trim() && results.length === 0 && (
                      <p className="px-3 py-6 text-center text-sm text-charcoal/70">No dishes match “{query}”. Try a different word.</p>
                    )}
                    <ul>
                      {results.map((p, i) => (
                        <m.li key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.16, delay: i * 0.03 }}>
                          <Link href={`/menu/${p.slug}`} onClick={onClose} className="flex items-center gap-3 rounded-xl p-2 hover:bg-cream">
                            <Image src={p.image} alt="" width={56} height={56} className="h-14 w-14 rounded-lg object-cover" />
                            <span className="flex-1">
                              <span className="block font-semibold">{p.name}</span>
                              <span className="block text-xs text-charcoal/70">{p.categoryName}</span>
                            </span>
                            <span className="text-sm font-semibold">{formatPrice(p.price)}</span>
                          </Link>
                        </m.li>
                      ))}
                    </ul>
                    {query.trim() && results.length > 0 && (
                      <button type="button" onClick={submit} className="mt-1 w-full rounded-xl px-3 py-3 text-center text-sm font-semibold text-ember hover:bg-cream">
                        See all results for “{query}”
                      </button>
                    )}
                  </div>
                </m.div>
              </DialogPrimitive.Content>
            </>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
