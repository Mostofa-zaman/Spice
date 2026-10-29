"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, Check, Copy } from "lucide-react";
import { toast } from "sonner";

const fmtDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function OfferCard({ offer }) {
  const [copied, setCopied] = useState(false);
  const [daysLeft, setDaysLeft] = useState(null);

  // Computed after mount so the server and browser render the same HTML
  useEffect(() => {
    if (offer.validUntil) setDaysLeft(Math.ceil((new Date(`${offer.validUntil}T23:59:59`) - new Date()) / 86400000));
  }, [offer.validUntil]);

  const expired = daysLeft !== null && daysLeft < 0;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(offer.code);
      setCopied(true);
      toast.success("Code copied", { description: offer.code });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast(`Your code: ${offer.code}`, { description: "Copy it manually and enter it in your cart." });
    }
  };

  return (
    <article className={`flex flex-col rounded-2xl bg-white p-5 shadow-card sm:p-6 ${expired ? "opacity-60" : ""}`}>
      <span className="self-start rounded-full bg-ember px-3 py-1 text-xs font-bold tracking-wide text-white">{offer.badge}</span>
      <h3 className="mt-4 text-2xl font-bold leading-snug">{offer.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{offer.description}</p>

      {offer.code && (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-dashed border-charcoal/30 bg-cream px-4 py-2.5">
          <code className="font-mono text-sm font-bold tracking-wider">{offer.code}</code>
          <button type="button" onClick={copy} disabled={expired} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember hover:underline disabled:no-underline">
            {copied ? <><Check className="h-4 w-4" aria-hidden="true" /> Copied</> : <><Copy className="h-4 w-4" aria-hidden="true" /> Copy code</>}
          </button>
        </div>
      )}

      <p className="mt-4 flex items-center gap-2 text-xs text-charcoal/70">
        <CalendarClock className="h-4 w-4" aria-hidden="true" />
        {offer.validUntil
          ? expired ? "This offer has ended" : <>Valid until {fmtDate(offer.validUntil)}{daysLeft !== null && daysLeft <= 30 && <strong className="text-ember"> · {daysLeft === 0 ? "ends today" : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`}</strong>}</>
          : "Available every day"}
      </p>

      <Link href={expired ? "/menu" : offer.cta.href} className="btn btn-primary mt-4 w-full">{offer.cta.label}</Link>
    </article>
  );
}
