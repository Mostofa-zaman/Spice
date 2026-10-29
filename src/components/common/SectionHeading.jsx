import Link from "next/link";

export default function SectionHeading({ title, subtitle, href, linkText, id }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-xl text-charcoal/70">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="text-sm font-semibold text-ember hover:text-ember-dark hover:underline">
          {linkText}
        </Link>
      )}
    </div>
  );
}
