"use client";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { Leaf, Flame } from "lucide-react";
import AddToCartButton from "@/components/motion/AddToCartButton";
import AnimatedHeart from "@/components/motion/AnimatedHeart";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice, getDiscountPercent } from "@/utils/format";
import { getDefaultCartLine } from "@/utils/pricing";
import Rating from "./Rating";

// `index` (optional) turns on a short entrance animation, used by the menu grid when results change.
// On other pages (home, related dishes) the section itself is revealed by AOS, so the card stays static.
export default function ProductCard({ product, priority = false, index = null }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const liked = has(product.id);
  const discount = getDiscountPercent(product.price, product.oldPrice);
  const enter = index !== null;

  return (
    <m.article
      initial={enter ? { opacity: 0, y: 14 } : false}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", delay: enter ? Math.min(index, 8) * 0.03 : 0 } }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-cream-deep">
        <Link href={`/menu/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 block">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.categoryName}`}
            fill
            priority={priority}
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-ember px-2.5 py-1 text-xs font-bold text-white">
            {discount}% off
          </span>
        )}
        <m.button
          type="button"
          onClick={() => toggle(product)}
          whileTap={{ scale: 0.88 }}
          aria-pressed={liked}
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow transition-colors hover:bg-white"
        >
          <AnimatedHeart liked={liked} />
        </m.button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2 text-xs text-charcoal/70">
          <Link href={`/categories/${product.category}`} className="font-medium hover:text-ember">
            {product.categoryName}
          </Link>
          <span className="flex items-center gap-2">
            {product.vegetarian && (
              <span className="inline-flex items-center gap-0.5 text-green-700" title="Vegetarian">
                <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Vegetarian</span>
              </span>
            )}
            {product.spicy && (
              <span className="inline-flex items-center gap-0.5 text-ember" title="Spicy">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">Spicy</span>
              </span>
            )}
          </span>
        </div>

        <h3 className="mt-1 text-lg font-bold leading-snug">
          <Link href={`/menu/${product.slug}`} className="hover:text-ember">{product.name}</Link>
        </h3>
        <div className="mt-1"><Rating rating={product.rating} reviews={product.reviews} /></div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <span className="text-xl font-bold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-charcoal/70 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          <AddToCartButton
            onAdd={() => addItem(product, getDefaultCartLine(product))}
            aria-label={`Add ${product.name} to cart`}
            className="!px-4 !py-2 min-w-[5.5rem]"
          />
        </div>
      </div>
    </m.article>
  );
}
