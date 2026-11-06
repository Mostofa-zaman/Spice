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
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-4xl font-bold">
              {formatPrice(price)}
            </span>

            {oldPrice && (
              <span className="text-lg text-cream/60 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}

            {saving > 0 && (
              <span className="rounded-full bg-ember px-3 py-1 text-xs font-bold text-white">
                Save {formatPrice(saving)}
              </span>
            )}
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`/menu/${slug}`} className="btn btn-primary !px-7 !py-3">
              Order the combo
            </Link>

            <Link
              href="/offers"
              className="btn border border-cream/30 text-cream hover:bg-white/10"
            >
              See all offers
            </Link>
          </div>
        </div>

        {/* Food Tiles */}
        <div className="grid grid-cols-2 gap-4" aria-hidden="true">
          {tiles.map((t) => (
            <div key={t.emoji} className="grid aspect-square place-items-center rounded-3xl bg-white/10 text-5xl sm:text-6xl">
              {t.emoji}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}