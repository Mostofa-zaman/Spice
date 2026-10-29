"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

// "Add" button with instant visual feedback: the label swaps to "Added" with a check mark for ~1.4s.
// The cart logic itself (onAdd) is untouched.
export default function AddToCartButton({ onAdd, idleLabel = "Add", doneLabel = "Added", icon: Icon = ShoppingBag, className, iconClass = "h-4 w-4", ...props }) {
  const [done, setDone] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = (e) => {
    onAdd?.(e);
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1400);
  };

  return (
    <m.button type="button" onClick={handleClick} whileTap={{ scale: 0.95 }} className={cn("btn btn-primary", className)} {...props}>
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={done ? "done" : "idle"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.12 }}
          className="inline-flex items-center gap-2"
        >
          {done ? <Check className={iconClass} aria-hidden="true" /> : <Icon className={iconClass} aria-hidden="true" />}
          {done ? doneLabel : idleLabel}
        </m.span>
      </AnimatePresence>
    </m.button>
  );
}
