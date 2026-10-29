"use client";
import { m } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AnimatedHeart({ liked, className = "h-[18px] w-[18px]" }) {
  return (
    <m.span
      key={liked ? "on" : "off"}
      initial={liked ? { scale: 0.55 } : false}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 520, damping: 14 }}
      className="inline-grid place-items-center"
    >
      <Heart className={cn(className, liked ? "fill-ember text-ember" : "text-charcoal")} />
    </m.span>
  );
}
