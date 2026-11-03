
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "@/components/common/Logo";
import { restaurant, delivery } from "@/data/restaurant";
import { getRealCategories } from "@/services/productService";

export default function Footer() {
  const categories = getRealCategories().slice(0, 6);

  const social = [
    { href: restaurant.socialLinks.facebook, label: "Facebook", Icon: FaFacebookF },
    { href: restaurant.socialLinks.instagram, label: "Instagram", Icon: FaInstagram },
    { href: restaurant.socialLinks.youtube, label: "YouTube", Icon: FaYoutube },
  ];

  const exploreLinks = [
    ["/menu", "Menu"],
    ["/offers", "Offers"],
    ["/about", "About us"],
    ["/contact", "Contact"],
    ["/cart", "Cart"],
    ["/account", "My account"],
  ];

  return (
    <footer className="mt-20 bg-charcoal text-cream/80">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />

          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {restaurant.tagline}. Fresh ingredients, a clean kitchen and delivery in {delivery.estimate}.
          </p>

          <div className="mt-5 flex gap-2">
            {social.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-ember"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">
            Explore
          </h2>

          <ul className="mt-4 space-y-2 text-sm">
            {exploreLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-white">
            Categories
          </h2>

          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
