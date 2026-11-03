import { delivery } from "@/data/restaurant";
import { PressLink } from "@/components/motion/Press";
import { Clock, Truck } from "lucide-react";

export default function HeroContent() {
  return (
    <div>
      <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
        Delicious food, delivered to your door
      </h1>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-charcoal/75">
        Burgers, pizza, biryani and more — cooked fresh when you order and on your table in {delivery.estimate}.
      </p>
      <div className="js-reveal mt-8 flex flex-wrap gap-3">
  <PressLink href="/menu" className="btn btn-primary !px-7 !py-3.5 text-base">
    Order now
  </PressLink>

  <PressLink href="/menu" className="btn btn-outline !px-7 !py-3.5 text-base">
    View menu
  </PressLink>
</div>
<ul className="js-reveal mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm">
  <li className="flex items-center gap-3">
    <Clock className="h-5 w-5 text-ember" aria-hidden="true" />
    <span className="font-semibold">{delivery.estimate} delivery</span>
  </li>

  <li className="flex items-center gap-3">
    <Truck className="h-5 w-5 text-ember" aria-hidden="true" />
    <span className="font-semibold">
      Free delivery over {formatPrice(delivery.freeDeliveryOver)}
    </span>
  </li>
</ul>
    </div>
  );
}