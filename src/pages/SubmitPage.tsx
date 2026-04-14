import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { openCalendly } from "@/hooks/use-calendly";

const SubmitPage = () => {
  const [capitalPref, setCapitalPref] = useState("");
  const [timeline, setTimeline] = useState("");

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
          <div className="max-w-3xl mx-auto">
            <div className="accent-line w-12 mb-6" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground/95 mb-3">
              Submit a Deal for Review
            </h1>
            <p className="font-body text-primary-foreground/50 leading-relaxed mb-10 max-w-2xl">
              Share the essentials. If there's a fit, we'll respond with next steps and a materials checklist.
            </p>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <h3 className="font-display text-lg text-royal-accent font-semibold">A) Company Overview</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><Label className={labelCls}>Company Name</Label><Input className={inputCls} placeholder="Company name" required /></div>
                  <div><Label className={labelCls}>Contact Name</Label><Input className={inputCls} placeholder="Full name" required /></div>
                  <div><Label className={labelCls}>Email</Label><Input type="email" className={inputCls} placeholder="email@company.com" required /></div>
                  <div><Label className={labelCls}>Phone</Label><Input type="tel" className={inputCls} placeholder="(555) 000-0000" /></div>
                  <div className="md:col-span-2"><Label className={labelCls}>Industry</Label><Input className={inputCls} placeholder="e.g. Manufacturing, Energy, Services" /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-lg text-royal-accent font-semibold">B) Financial Snapshot</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><Label className={labelCls}>Annual Revenue</Label><Input className={inputCls} placeholder="$0" /></div>
                  <div><Label className={labelCls}>EBITDA</Label><Input className={inputCls} placeholder="$0" /></div>
                  <div><Label className={labelCls}>Capital Request ($)</Label><Input className={inputCls} placeholder="Amount sought" required /></div>
                  <div><Label className={labelCls}>Use of Funds</Label><Input className={inputCls} placeholder="e.g. Acquisition, working capital" /></div>
                </div>
              </div>

              <div className="space-y-5">
                <h3 className="font-display text-lg text-royal-accent font-semibold">C) Request</h3>
                <div>
                  <Label className={labelCls}>Capital Preference</Label>
                  <RadioGroup value={capitalPref} onValueChange={setCapitalPref} className="flex flex-wrap gap-4 mt-2">
                    {["Debt", "Hybrid", "Project Funding", "Unsure"].map((v) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem value={v} className="border-silver/40 text-royal-accent" />
                        <span className="font-body text-sm text-primary-foreground/60">{v}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <Label className={labelCls}>Timeline</Label>
                  <RadioGroup value={timeline} onValueChange={setTimeline} className="flex flex-wrap gap-4 mt-2">
                    {["Immediate", "30–60 days", "60–120 days", "Flexible"].map((v) => (
                      <label key={v} className="flex items-center gap-2 cursor-pointer">
                        <RadioGroupItem value={v} className="border-silver/40 text-royal-accent" />
                        <span className="font-body text-sm text-primary-foreground/60">{v}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-lg text-royal-accent font-semibold">D) Assets / Credit Support</h3>
                <Textarea className={inputCls} rows={3} placeholder="Describe collateral, AR, inventory, real estate, or other assets..." />
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-lg text-royal-accent font-semibold">E) Uploads (Financials / P&L / AR Aging)</h3>
                <div className="p-4 border border-dashed border-silver/20 rounded bg-royal-light/20 text-center">
                  <input type="file" multiple className="font-body text-sm text-primary-foreground/50 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-royal-accent/10 file:text-royal-accent file:font-semibold file:cursor-pointer" />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-3.5 bg-royal-accent hover:bg-royal-light text-accent-foreground font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300"
                >
                  Submit Confidentially
                </button>
                <p className="mt-4 font-body text-xs text-primary-foreground/30 leading-relaxed max-w-xl">
                  Submitting information does not create any obligation by either party.
                  9 Figure Funding is not a broker-dealer, investment adviser, or lender.
                  We provide consulting and advisory services only.
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitPage;
