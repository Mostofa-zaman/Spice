"use client";
import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-charcoal/10 last:border-b-0", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn("flex flex-1 items-center justify-between gap-4 py-4 text-left font-semibold transition-colors hover:text-ember [&[data-state=open]>svg]:rotate-180", className)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden="true" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";



export { Accordion, AccordionItem, AccordionTrigger,  };
