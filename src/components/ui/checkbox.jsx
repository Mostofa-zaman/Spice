"use client";
import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer grid h-5 w-5 shrink-0 place-items-center rounded-md border border-charcoal/50 bg-white text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-ember data-[state=checked]:bg-ember",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="grid place-items-center text-current">
      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";
export { Checkbox };
