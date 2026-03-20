import { openCalendly } from "@/hooks/use-calendly";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: '85%', backgroundPosition: 'center 40%' }}
      />
      <div className="absolute inset-0 bg-[hsl(var(--royal))] opacity-80" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(225 70% 55%) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 pt-28 pb-20 text-center">
        <div className="gold-line w-16 mx-auto mb-8 animate-fade-in" />
        
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-primary-foreground/95 animate-fade-up">
          Schedule Your{" "}
          <span className="silver-gradient">Institutional Capital</span>{" "}
          Strategy Call
        </h1>

        <p className="mt-8 max-w-3xl mx-auto text-base md:text-lg font-body text-primary-foreground/60 leading-relaxed animate-fade-up animation-delay-200">
          For operators and sponsors pursuing structured capital solutions in the{" "}
          <span className="font-semibold text-silver">$2MM–$5B</span> range.
          <br />
          We evaluate fit, capital pathways, and institutional readiness.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-400">
          <button
            onClick={openCalendly}
            className="px-8 py-3.5 bg-royal-accent hover:bg-royal-light text-accent-foreground font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300"
          >
            Schedule Capital Strategy Call
          </button>
        </div>

        <p className="mt-10 font-body text-sm font-semibold italic text-primary-foreground/70 max-w-2xl mx-auto animate-fade-in animation-delay-600">
          Big Investment Group Holdings is <span className="font-bold text-primary-foreground/90">not a lender or broker</span>.
          We provide strategic capital advisory and introductions to capital partners.
        </p>
      </div>
    </section>
  );
};

export default Hero;
