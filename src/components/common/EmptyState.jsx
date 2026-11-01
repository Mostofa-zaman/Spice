import Link from "next/link";

// Friendly empty screen with a useful next step.
export default function EmptyState({ icon: Icon, title, text, actions = [] }) {
  return (
    <div className="mx-auto max-w-md rounded-3xl bg-white px-6 py-14 text-center shadow-card">
      {Icon && (
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ember-light text-ember">
          <Icon className="h-8 w-8" aria-hidden="true" />
        </span>
      )}
      <h2 className="mt-5 text-3xl font-bold">{title}</h2>
      <p className="mt-2 text-charcoal/65">{text}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className={`btn ${a.primary ? "btn-primary" : "btn-outline"}`}>{a.label}</Link>
        ))}
      </div>
    </div>
  );
}
