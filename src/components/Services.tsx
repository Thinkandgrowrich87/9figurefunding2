import { Briefcase, Search, Shield, Network, Landmark, Building2 } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Capital Advisory",
    subtitle: "(Private Markets)",
    description: "Deal packaging, positioning, and institutional readiness for complex capital structures.",
  },
  {
    icon: Search,
    title: "Debt & Finance",
    subtitle: "Navigation",
    description: "ABL, senior secured, mezzanine, unitranche, bridge, and special situations.",
  },
  {
    icon: Shield,
    title: "Initiative Support",
    subtitle: "Project Funding",
    description: "Public/private pathway mapping for scalable initiatives and infrastructure projects.",
  },
  {
    icon: Landmark,
    title: "Gov Relations",
    subtitle: "Representation",
    description: "Support for initiatives that deliver measurable community benefit and social impact.",
  },
  {
    icon: Network,
    title: "Capital Alignment",
    description: "We connect vetted opportunities with our network of:",
    list: ["Family offices", "Private credit funds", "Direct lenders", "Institutional investors"],
  },
  {
    icon: Building2,
    title: "Pre-Underwriting",
    description: "Every opportunity undergoes disciplined initial screening prior to any capital introduction.",
  },
];

const Services = () => (
  <section id="services" className="section-padding royal-gradient">
    <div className="max-w-6xl mx-auto">
      <div className="accent-line w-12 mb-6" />
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground/95 mb-14">
        What We Do
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(({ icon: Icon, title, subtitle, description, list }) => (
          <div
            key={title}
            className="p-8 rounded border border-silver/10 bg-royal-light/30 hover:border-royal-accent/30 transition-colors duration-300"
          >
            <Icon className="w-8 h-8 text-royal-accent mb-5" strokeWidth={1.5} />
            <h3 className="font-display text-xl font-semibold text-primary-foreground/90 mb-1">
              {title}
            </h3>
            {subtitle && (
              <p className="font-body text-xs text-silver/60 mb-3 tracking-wide uppercase">{subtitle}</p>
            )}
            <p className="font-body text-primary-foreground/50 leading-relaxed">{description}</p>
            {list && (
              <ul className="mt-4 space-y-1.5">
                {list.map((item) => (
                  <li key={item} className="font-body text-sm text-silver/80 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-royal-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <p className="mt-14 text-center font-display italic text-primary-foreground/70 text-lg">
        Selectively curated. Structurally aligned. Institutionally focused.
      </p>
    </div>
  </section>
);

export default Services;
