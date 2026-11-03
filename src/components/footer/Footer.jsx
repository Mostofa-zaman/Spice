
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "@/components/common/Logo";
import { restaurant, delivery } from "@/data/restaurant";

export default function Footer() {
  const social = [
    { href: restaurant.socialLinks.facebook, label: "Facebook", Icon: FaFacebookF },
    { href: restaurant.socialLinks.instagram, label: "Instagram", Icon: FaInstagram },
    { href: restaurant.socialLinks.youtube, label: "YouTube", Icon: FaYoutube },
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
      </div>
    </footer>
  );
}
