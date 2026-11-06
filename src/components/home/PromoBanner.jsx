"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { PressLink } from "@/components/motion/Press";
import { formatPrice } from "@/utils/format";

// Promotional band (GSAP + ScrollTrigger): when it scrolls into view the text lines rise in,
// the food tiles pop in, and the price counts up. While it is on screen the tiles move at slightly
// different speeds. All triggers are reverted on unmount; "reduce motion" skips everything.
const tiles = [
  { emoji: "🍕", depth: -14 },
  { emoji: "🍗", depth: 10 },
  { emoji: "🍟", depth: 18 },
  { emoji: "🥤", depth: -8 },
];

export default function PromoBanner({ name, slug, description, price, oldPrice }) {
  const rootRef = useRef(null);
  const saving = oldPrice ? oldPrice - price : 0;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    let mm = null;
    const reveal = () => root.querySelectorAll(".gsap-hide").forEach((el) => el.classList.remove("gsap-hide"));
    const failsafe = setTimeout(reveal, 4000);

    (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled) return;
        clearTimeout(failsafe);
        gsap.registerPlugin(ScrollTrigger);

        mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const q = (sel) => Array.from(root.querySelectorAll(sel));
          const priceEl = root.querySelector(".promo-price");
          const counter = { v: 0 };

          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: root, start: "top 78%", once: true },
          });
          tl.fromTo(q(".promo-line"), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0)
            .fromTo(q(".promo-tile"), { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.1, ease: "back.out(1.5)" }, 0.15);
          if (priceEl) {
            tl.to(counter, {
              v: price, duration: 1.1, ease: "power2.out",
              onUpdate: () => { priceEl.textContent = formatPrice(counter.v); },
              onComplete: () => { priceEl.textContent = formatPrice(price); },
            }, 0.3);
          }

          // light parallax on the tiles while the band is on screen
          q(".promo-tile-wrap").forEach((el) => {
            gsap.to(el, {
              yPercent: Number(el.dataset.depth), ease: "none",
              scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 },
            });
          });
        });
      } catch {
        reveal();
      }
    })();

    return () => {
      cancelled = true;
      clearTimeout(failsafe);
      mm?.revert();
    };
  }, [price]);

  return (
    <section ref={rootRef} className="container-page py-8" aria-labelledby="promo-heading">
      <div className="relative grid grid-cols-[minmax(0,1fr)] items-center gap-8 overflow-hidden rounded-3xl bg-charcoal px-6 py-10 text-cream sm:px-12 sm:py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <p className="promo-line gsap-hide text-sm font-semibold uppercase tracking-widest text-ember-soft">Family favourite</p>
          <h2 id="promo-heading" className="promo-line gsap-hide mt-3 text-4xl font-bold leading-tight sm:text-5xl">{name}</h2>
          <p className="promo-line gsap-hide mt-3 max-w-md text-cream/80">{description}</p>
          <p className="promo-line gsap-hide mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="promo-price text-4xl font-bold">{formatPrice(price)}</span>
            {oldPrice && <span className="text-lg text-cream/60 line-through">{formatPrice(oldPrice)}</span>}
            {saving > 0 && <span className="rounded-full bg-ember px-3 py-1 text-xs font-bold text-white">Save {formatPrice(saving)}</span>}
          </p>
          <div className="promo-line gsap-hide mt-7 flex flex-wrap gap-3">
            <PressLink href={`/menu/${slug}`} className="btn btn-primary !px-7 !py-3">Order the combo</PressLink>
            <Link href="/offers" className="btn border border-cream/30 text-cream hover:bg-white/10">See all offers</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4" aria-hidden="true">
          {tiles.map((t) => (
            <div key={t.emoji} data-depth={t.depth} className="promo-tile-wrap">
              <div className="promo-tile gsap-hide grid aspect-square place-items-center rounded-3xl bg-white/10 text-5xl sm:text-6xl">{t.emoji}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
