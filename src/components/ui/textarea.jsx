import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-xl border border-charcoal/20 bg-white px-4 py-3 text-base outline-none transition-colors placeholder:text-charcoal/40 focus:border-ember disabled:cursor-not-allowed disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
export { Textarea };
