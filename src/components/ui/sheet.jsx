"use client";
import { forwardRef } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-[80] bg-charcoal/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const sides = {
  left: "inset-y-0 left-0 h-full w-[88%] max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
  right: "inset-y-0 right-0 h-full w-[88%] max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
  bottom: "inset-x-0 bottom-0 max-h-[85vh] rounded-t-3xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
};

const SheetContent = forwardRef(({ side = "left", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-[80] flex flex-col overflow-y-auto bg-cream p-5 shadow-lift transition ease-in-out data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
        sides[side],
        className
      )}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full hover:bg-mist">
        <X className="h-5 w-5" />
        <span className="sr-only">Close menu</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }) => <div className={cn("flex flex-col gap-1.5 pr-10", className)} {...props} />;
const SheetTitle = forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("font-display text-xl font-bold", className)} {...props} />
));
SheetTitle.displayName = "SheetTitle";
const SheetDescription = forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-charcoal/70", className)} {...props} />
));
SheetDescription.displayName = "SheetDescription";

export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetDescription };
