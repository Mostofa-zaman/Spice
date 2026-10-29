"use client";
import { AnimatePresence, m } from "framer-motion";

export default function AnimatedNumber({ value, className = "" }) {
  return (
    <span className={`relative inline-block h-6 w-8 overflow-hidden text-center leading-6 ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.14 }}
          className="absolute inset-0"
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
