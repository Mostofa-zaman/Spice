"use client";
import { m } from "framer-motion";
import OfferCard from "@/components/common/OfferCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Offers grouped by type. The tabs (shadcn Tabs) let people jump to one group or see everything.
export default function OffersExplorer({ offers, sections }) {
  const present = sections.filter((s) => offers.some((o) => o.type === s.type));

  const renderSections = (list) =>
    list.map((section) => (
      <section key={section.type} className="mb-12 last:mb-0" aria-labelledby={`offers-${section.type}`}>
        <h2 id={`offers-${section.type}`} className="text-3xl font-bold">{section.title}</h2>
        <p className="mb-5 mt-1 text-charcoal/70">{section.text}</p>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offers.filter((o) => o.type === section.type).map((o) => <OfferCard key={o.id} offer={o} />)}
        </div>
      </section>
    ));

  const panel = (children) => (
    <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      {children}
    </m.div>
  );

  return (
    <Tabs defaultValue="all" data-aos="fade-up">
      <TabsList aria-label="Filter offers">
        <TabsTrigger value="all">All offers</TabsTrigger>
        {present.map((s) => <TabsTrigger key={s.type} value={s.type}>{s.title}</TabsTrigger>)}
      </TabsList>
      <TabsContent value="all">{panel(renderSections(present))}</TabsContent>
      {present.map((s) => (
        <TabsContent key={s.type} value={s.type}>{panel(renderSections([s]))}</TabsContent>
      ))}
    </Tabs>
  );
}
