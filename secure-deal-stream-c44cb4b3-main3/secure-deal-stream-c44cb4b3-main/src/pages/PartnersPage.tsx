import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const PartnersPage = () => {
  const navigate = useNavigate();
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
          <p className="font-body text-primary-foreground/60 leading-relaxed mb-10 max-w-2xl mx-auto">
            If your platform is actively deploying capital and interested in reviewing curated
            lower-middle-market opportunities, we welcome inquiries to exchange investment criteria.
          </p>
          <button
            onClick={() => navigate("/submit")}
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
