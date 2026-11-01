
"use client";

import { useEffect, useRef, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search, X } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";

export default function SearchDialog({ open, onClose, returnFocusRef }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

 
return (
  <DialogPrimitive.Root
    open={open}
    onOpenChange={(v) => {
      if (!v) onClose();
    }}
  >
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <>
            <DialogPrimitive.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-[80] bg-charcoal/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content
              asChild
              forceMount
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                inputRef.current?.focus();
              }}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                returnFocusRef?.current?.focus();
              }}
            >
              <m.div
                className="fixed inset-x-4 top-[8vh] z-[80] mx-auto max-w-xl overflow-hidden rounded-2xl bg-white shadow-lift"
                initial={{ opacity: 0, y: -14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <DialogPrimitive.Title className="sr-only">
                  Search the menu
                </DialogPrimitive.Title>

                <DialogPrimitive.Description className="sr-only">
                  Search for food items.
                </DialogPrimitive.Description>

                <form className="flex items-center gap-3 border-b border-charcoal/10 px-4">
                  <Search className="h-5 w-5 text-charcoal/70" />

                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search burgers, biryani, desserts…"
                    className="h-14 flex-1 bg-transparent text-base outline-none"
                  />

                  <DialogPrimitive.Close
                    aria-label="Close search"
                    className="rounded-full p-2 hover:bg-mist"
                  >
                    <X className="h-5 w-5" />
                  </DialogPrimitive.Close>
                </form>

                <div className="p-6 text-center text-sm text-charcoal/70">
                  Start typing to find a dish.
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
