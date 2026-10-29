import Link from "next/link";
import { restaurant } from "@/data/restaurant";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="inline-flex items-center gap-1.5 sm:gap-2" aria-label={`${restaurant.name} home`}>
      <span className="grid h-8 w-8 place-items-center rounded-xl sm:h-9 sm:w-9 bg-ember font-display text-lg font-bold text-white">U</span>
      <span className={`max-[359px]:hidden whitespace-nowrap font-display text-lg font-bold tracking-tight sm:text-xl ${light ? "text-cream" : "text-charcoal"}`}>
        {restaurant.name}
      </span>
    </Link>
  );
}
