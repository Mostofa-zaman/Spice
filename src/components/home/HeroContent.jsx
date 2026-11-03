import { delivery } from "@/data/restaurant";

export default function HeroContent() {
  return (
    <div>
      <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        Delicious food, delivered to your door
      </h1>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/75">
        Burgers, pizza, biryani and more — cooked fresh when you order and on your table in {delivery.estimate}.
      </p>
    </div>
  );
}