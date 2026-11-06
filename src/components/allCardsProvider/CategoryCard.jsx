"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HoverLift from "@/components/motion/HoverLift";

export default function CategoryCard({ category, count }) {
  return (
    <HoverLift className="h-full">
    <Link
      href={`/menu?category=${category.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-deep">
        <Image
          src={category.image}
          alt={`${category.name} category`}
          fill
          sizes="(min-width:1024px) 20vw, (min-width:640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold">
            <span aria-hidden="true" className="mr-1.5">{category.emoji}</span>{category.name}
          </h3>
          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-ember transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
        <p className="mt-1 text-sm text-charcoal/65">{category.description}</p>
        <p className="mt-3 text-sm font-semibold text-ember">{count} {count === 1 ? "item" : "items"}</p>
      </div>
    </Link>
    </HoverLift>
  );
}
