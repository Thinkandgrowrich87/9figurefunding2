import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { openCalendly } from "@/hooks/use-calendly";

const PartnersPage = () => {
  return (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-20">
      <section className="section-padding royal-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <div className="accent-line w-12 mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground/95 mb-6">
            For Capital Partners
          </h2>
          <p className="font-body text-primary-foreground/60 leading-relaxed mb-6 max-w-2xl mx-auto">
            If your platform is actively deploying capital and interested in reviewing curated
            lower-middle-market opportunities, we welcome inquiries to exchange investment criteria.
          </p>
          <p className="font-body text-primary-foreground/60 leading-relaxed mb-4 max-w-2xl mx-auto">
            During your scheduled call or Zoom, our team will walk through a brief questionnaire covering your investment
            thesis, deployment capacity, preferred deal structures, and target sectors to ensure alignment.
          </p>
          <p className="font-body text-primary-foreground/50 leading-relaxed mb-10 max-w-2xl mx-auto italic text-sm">
            Please have relevant verification documents handy — including fund documentation, proof of capital,
            and any compliance or accreditation materials — so we can move efficiently through the onboarding process.
          </p>
          <button
            onClick={openCalendly}
            className="px-8 py-3.5 border-2 border-white text-white hover:bg-white hover:text-primary font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300"
          >
            Become a Capital Partner
          </button>
        </div>
      </section>
    </div>
    <Footer />
  </div>
  );
};

export default PartnersPage;
