const structures = [
  "Asset-Based Lending (ABL)",
  "Senior Secured Term Debt",
  "Bridge Financing",
  "Mezzanine Capital",
  "Structured Credit",
  "Select Equity Placements",
  "Project & Infrastructure Finance",
];

const industries = [
  "Commercial & Industrial",
  "Energy & Infrastructure",
  "Specialty Manufacturing",
  "Business Services",
  "Select Real Estate",
  "Emerging Growth (case-by-case)",
];

const Transactions = () => (
  <section id="transactions" className="section-padding royal-gradient">
    <div className="max-w-6xl mx-auto">
      <div className="accent-line w-12 mb-6" />
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground/95 mb-8">
        Target Transactions
      </h2>

      <div className="mb-12 p-6 rounded border border-silver/10 bg-royal-light/30 inline-block">
        <p className="font-body text-sm text-primary-foreground/60">
          <span className="font-semibold text-primary-foreground/90">Primary Focus:</span> $2MM – $25MM
        </p>
        <p className="font-body text-sm text-primary-foreground/60 mt-1">
          <span className="font-semibold text-primary-foreground/90">Expanded Network Capacity:</span> Up to $5B+ for qualified institutional opportunities
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-display text-xl font-semibold text-primary-foreground/90 mb-5">
            Typical Structures
          </h3>
          <ul className="space-y-3">
            {structures.map((s) => (
              <li key={s} className="flex items-center gap-3 font-body text-primary-foreground/60">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-accent flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold text-primary-foreground/90 mb-5">
            Industries Served
          </h3>
          <ul className="space-y-3">
            {industries.map((i) => (
              <li key={i} className="flex items-center gap-3 font-body text-primary-foreground/60">
                <span className="w-1.5 h-1.5 rounded-full bg-royal-accent flex-shrink-0" />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Transactions;
