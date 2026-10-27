import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "h-12 w-full rounded-xl border border-charcoal/20 bg-white px-4 text-base outline-none transition-colors placeholder:text-charcoal/40 focus:border-ember disabled:cursor-not-allowed disabled:bg-mist disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
export { Input };
