import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Landmark, Users, Building, CheckCircle } from "lucide-react";

const highlights = [
  {
    icon: Building,
    text: "Securing funding for initiatives — from programming to brick-and-mortar that have a community benefit.",
  },
  {
    icon: Users,
    text: "Representing clients in front of government officials and other third-party government entities.",
  },
];

const GovFundingPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <section className="section-padding royal-gradient">
        <div className="max-w-4xl mx-auto">
          <div className="accent-line w-12 mb-6" />
          <div className="flex items-center gap-3 mb-6">
            <Landmark className="w-10 h-10 text-royal-accent" strokeWidth={1.5} />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground/95">
              Government Funding & Representation Support
            </h1>
          </div>

          <p className="font-body text-primary-foreground/60 leading-relaxed mb-10 max-w-3xl">
            Our government-relations capability supports initiatives that create measurable
            community benefit. Services include:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {highlights.map(({ icon: Icon, text }, i) => (
              <div
                key={i}
                className="p-6 rounded border border-silver/10 bg-royal-light/30 flex gap-4"
              >
                <Icon className="w-6 h-6 text-royal-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
                <p className="font-body text-primary-foreground/60 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="p-6 rounded border border-silver/20 bg-royal-light/20 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-silver/70 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="font-body text-sm font-semibold text-primary-foreground/70 leading-relaxed">
              <span className="font-bold text-primary-foreground/90">Note:</span>{" "}
              Government-related outcomes depend on program requirements, approvals, and budgets.
              No outcome is guaranteed.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </div>
);

export default GovFundingPage;
