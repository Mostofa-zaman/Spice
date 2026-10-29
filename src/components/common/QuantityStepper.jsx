"use client";
import { Minus, Plus } from "lucide-react";
import AnimatedNumber from "@/components/motion/AnimatedNumber";

export default function QuantityStepper({ value, onChange, label = "Quantity", min = 1, max = 20 }) {
  return (
    <div className="inline-flex items-center rounded-full border border-charcoal/20 bg-white" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity" className="grid h-9 w-9 place-items-center rounded-full transition-transform hover:bg-mist active:scale-90 disabled:opacity-40">
        <Minus className="h-4 w-4" />
      </button>
      <span className="text-sm font-semibold" aria-live="polite" aria-atomic="true"><AnimatedNumber value={value} /></span>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity" className="grid h-9 w-9 place-items-center rounded-full transition-transform hover:bg-mist active:scale-90 disabled:opacity-40">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
