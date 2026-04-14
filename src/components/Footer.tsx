import { useNavigate } from "react-router-dom";

const disclosures = [
  { label: "No Broker-Dealer", text: "9 Figure Funding is not a broker-dealer, investment adviser, or lender." },
  { label: "No Solicitation", text: "Nothing constitutes an offer to sell or solicitation to buy any security." },
  { label: "Consulting Only", text: "Services limited to advisory support, packaging, and navigation." },
  { label: "No Guarantee", text: "No outcomes are promised or guaranteed regarding funding or approvals." },
  { label: "Legal/Tax", text: "We do not provide legal, tax, or accounting advice." },
  { label: "Gov Work", text: "Outcomes depend on program rules and government approvals." },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="royal-gradient border-t border-silver/10 px-6 py-16 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="p-6 rounded border border-silver/10 bg-royal-light/20 mb-10">
          <h4 className="font-display text-sm font-semibold italic text-primary-foreground/60 mb-4">
            Disclosures & Important Information
          </h4>
          <ul className="space-y-2">
            {disclosures.map(({ label, text }) => (
              <li key={label} className="font-body text-xs text-primary-foreground/35 leading-relaxed italic">
                <span className="font-semibold text-primary-foreground/45">{label}:</span> {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { label: "Privacy Policy", path: "#" },
            { label: "Terms of Service", path: "#" },
            { label: "Contact Support", path: "/contact" },
          ].map(({ label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="font-body text-xs text-silver/60 hover:text-silver transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="text-center">
          <span className="font-display text-lg font-bold tracking-wider silver-gradient">
            BIG INVESTMENT GROUP HOLDINGS
          </span>
          <p className="mt-2 font-body text-xs text-primary-foreground/30">
            © 2026 Big Investment Group Holdings. All Rights Reserved.
          </p>
          <p className="mt-1 font-body text-xs text-primary-foreground/25">
            9FigureFunding.com // Boutique Advisory
          </p>
          <div className="accent-line w-16 mx-auto my-6" />
          <p className="font-display italic text-primary-foreground/50 text-sm">
            Selectively curated. Structurally aligned. Institutionally focused.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
