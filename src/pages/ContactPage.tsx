import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { openCalendly } from "@/hooks/use-calendly";
import { Mail, Phone } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    openCalendly();
  };

  const inputCls =
    "bg-royal-light/50 border-silver/15 text-primary-foreground/90 placeholder:text-primary-foreground/30 focus-visible:ring-royal-accent/40 font-body";
  const labelCls = "font-body text-sm text-primary-foreground/70";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <section className="section-padding royal-gradient">
          <div className="max-w-4xl mx-auto">
            <div className="accent-line w-12 mb-6" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground/95 mb-3">
              Contact Us
            </h1>
            <p className="font-body text-primary-foreground/50 leading-relaxed mb-10 max-w-2xl">
              Schedule a confidential call or send us a message. We respond to qualified inquiries promptly.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-6">
                <div className="p-6 rounded border border-silver/10 bg-royal-light/30">
                  <Mail className="w-6 h-6 text-royal-accent mb-3" strokeWidth={1.5} />
                  <p className="font-body text-sm text-primary-foreground/70">Email</p>
                  <p className="font-body text-sm text-silver/80 mt-1">info@9figurefunding.com</p>
                </div>
                <div className="p-6 rounded border border-silver/10 bg-royal-light/30">
                  <Phone className="w-6 h-6 text-royal-accent mb-3" strokeWidth={1.5} />
                  <p className="font-body text-sm text-primary-foreground/70">Phone</p>
                  <p className="font-body text-sm text-silver/80 mt-1">By appointment only</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label className={labelCls}>Name</Label><Input className={inputCls} placeholder="Full name" required /></div>
                  <div><Label className={labelCls}>Email</Label><Input type="email" className={inputCls} placeholder="email@company.com" required /></div>
                </div>
                <div><Label className={labelCls}>Subject</Label><Input className={inputCls} placeholder="How can we help?" /></div>
                <div><Label className={labelCls}>Message</Label><Textarea className={inputCls} rows={5} placeholder="Describe your inquiry..." required /></div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-royal-accent hover:bg-royal-light text-accent-foreground font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
