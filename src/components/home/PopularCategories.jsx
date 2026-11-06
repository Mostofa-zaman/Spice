import Link from "next/link";
import { popularCategorySlugs } from "@/data/categories";
import HoverLift from "@/components/motion/HoverLift";
import { getCategoryBySlug, getCategoryProductCount } from "@/services/productService";

export default function PopularCategories() {
  const popular = popularCategorySlugs.map(getCategoryBySlug).filter(Boolean);
  return (
    <section className="container-page py-6" aria-label="Popular categories">
      <div className="rounded-3xl bg-charcoal px-5 py-8 text-cream sm:px-10" data-aos="zoom-in">
        <h2 className="text-2xl font-bold sm:text-3xl">Popular categories</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {popular.map((c) => (
            <li key={c.id}>
              <HoverLift className="h-full">
              <Link href={`/categories/${c.slug}`} className="flex h-full flex-col items-center gap-1 rounded-2xl bg-white/10 px-3 py-5 text-center transition-colors hover:bg-ember">
                <span className="text-3xl" aria-hidden="true">{c.emoji}</span>
                <span className="font-semibold">{c.name}</span>
                <span className="text-xs text-cream/70">{getCategoryProductCount(c.slug)} items</span>
              </Link>
              </HoverLift>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
