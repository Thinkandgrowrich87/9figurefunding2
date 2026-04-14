const partners = [
  "Family Offices",
  "Private Credit Funds",
  "Direct Lenders",
  "Institutional Capital",
  "Specialty Finance",
];

const PartnerStrip = () => (
  <section className="bg-primary py-6 border-y border-silver/10">
    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6">
      {partners.map((p) => (
        <span
          key={p}
          className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/40"
        >
          {p}
        </span>
      ))}
    </div>
  </section>
);

export default PartnerStrip;
