import { Star } from "lucide-react";

export default function Rating({ rating, reviews }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-charcoal/70">
      <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
      <span className="font-semibold text-charcoal">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>
  );
}
