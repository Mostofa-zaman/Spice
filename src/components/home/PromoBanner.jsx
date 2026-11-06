import Link from "next/link";
import { formatPrice } from "@/utils/format";

const tiles = [
  { emoji: "🍕", depth: -14 },
  { emoji: "🍗", depth: 10 },
  { emoji: "🍟", depth: 18 },
  { emoji: "🥤", depth: -8 },
];

export default function PromoBanner({
  name,
  slug,
  description,
  price,
  oldPrice,
}) {
  const saving = oldPrice ? oldPrice - price : 0;

  return (
    <section className="container-page py-8" aria-labelledby="promo-heading">
      <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 overflow-hidden rounded-3xl bg-charcoal px-6 py-10 text-cream sm:px-12 sm:py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">

        {/* Promo Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-ember-soft">
            Family favourite
          </p>

          <h2
            id="promo-heading"
            className="mt-3 text-4xl font-bold leading-tight sm:text-5xl"
          >
            {name}
          </h2>

          <p className="mt-3 max-w-md text-cream/80">
            {description}
          </p>

          {/* Price */}
      

         
        </div>

        {/* Food Tiles */}
    

      </div>
    </section>
  );
}