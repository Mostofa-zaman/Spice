"use client";

import { m } from "framer-motion";

export default function HoverLift({ children, className, y = -6 }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      {children}
    </m.div>
  );
}