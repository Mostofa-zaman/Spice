"use client";
import { m } from "framer-motion";

// Wraps a card so it lifts slightly on hover (pointer devices only; touch ignores hover).
export default function HoverLift({ children, className, y = -4 }) {
  return (
    <m.div whileHover={{ y, transition: { duration: 0.2, ease: "easeOut" } }} className={className}>
      {children}
    </m.div>
  );
}
