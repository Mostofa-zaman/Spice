import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category, count }) {
  return (
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
    </Link>
  );
}
