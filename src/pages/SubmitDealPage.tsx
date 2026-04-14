import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { openCalendly } from "@/hooks/use-calendly";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Upload, X, FileText, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const INDUSTRIES = [
  "Manufacturing", "Construction", "Transportation / Logistics", "Healthcare",
  "Energy", "Real Estate", "Technology", "Consumer / Retail", "Food & Beverage",
  "Government Contracting", "Business Services", "Other",
];

const CAPITAL_RANGES = [
  "$2MM – $5MM", "$5MM – $10MM", "$10MM – $25MM", "$25MM – $50MM", "$50MM+",
];

const CAPITAL_TYPES = [
  "Working Capital", "Asset-Based Lending", "Private Credit", "Growth Capital",
  "Acquisition Financing", "Bridge Financing", "Equipment Financing",
  "Real Estate Financing", "Restructuring / Special Situations", "Other",
];

const USE_OF_FUNDS_OPTIONS = [
  "Working Capital", "Expansion", "Acquisition", "Refinance", "Equipment Purchase",
  "Inventory", "Real Estate", "Contract / PO Fulfillment", "Recapitalization", "Other",
];

const TIMING_OPTIONS = [
  "Immediately", "Within 30 Days", "30–60 Days", "60–90 Days", "Just Exploring",
];

const REVENUE_RANGES = [
  "Under $1MM", "$1MM – $5MM", "$5MM – $10MM", "$10MM – $25MM", "$25MM – $50MM", "$50MM+",
];

const EBITDA_OPTIONS = ["Profitable", "Break-even", "Pre-profit", "Prefer not to state"];

const DEBT_OPTIONS = [
  "None", "Under $1MM", "$1MM – $5MM", "$5MM – $10MM", "$10MM+", "Prefer not to state",
];

const COLLATERAL_OPTIONS = [
  "Accounts Receivable", "Inventory", "Equipment", "Real Estate",
  "Contracts / Purchase Orders", "Cash Flow", "Other", "None",
];

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface FormData {
  contact_name: string;
  company_name: string;
  title_role: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  industry: string;
  hq_state: string;
  years_in_business: string;
  employees: string;
  business_description: string;
  capital_requested: string;
  capital_type_sought: string[];
  use_of_funds: string[];
  timing_urgency: string;
  annual_revenue: string;
  profitability: string;
  existing_debt: string;
  collateral_available: string[];
  financial_summary: string;
  opportunity_summary: string;
  why_this_request_matters: string;
  additional_notes: string;
  qualification_call_requested: boolean;
  confirm_accurate: boolean;
  confirm_no_guarantee: boolean;
}

const initialForm: FormData = {
  contact_name: "",
  company_name: "",
  title_role: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  industry: "",
  hq_state: "",
  years_in_business: "",
  employees: "",
  business_description: "",
  capital_requested: "",
  capital_type_sought: [],
  use_of_funds: [],
  timing_urgency: "",
  annual_revenue: "",
  profitability: "",
  existing_debt: "",
  collateral_available: [],
  financial_summary: "",
  opportunity_summary: "",
  why_this_request_matters: "",
  additional_notes: "",
  qualification_call_requested: false,
  confirm_accurate: false,
  confirm_no_guarantee: false,
};

const SubmitDealPage = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const inputCls =
    "bg-royal-light/50 border-silver/15 text-primary-foreground/90 placeholder:text-primary-foreground/30 focus-visible:ring-royal-accent/40 font-body";
  const labelCls = "font-body text-sm text-primary-foreground/70";
  const sectionTitle = "font-display text-lg text-royal-accent font-semibold";

  const set = (key: keyof FormData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleMulti = (key: "capital_type_sought" | "use_of_funds" | "collateral_available", value: string) => {
    setForm((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const valid = newFiles.filter((f) => {
      if (!ACCEPTED_TYPES.includes(f.type)) {
        toast({ title: "Invalid file type", description: `${f.name} is not an accepted file type.`, variant: "destructive" });
        return false;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast({ title: "File too large", description: `${f.name} exceeds 50MB limit.`, variant: "destructive" });
        return false;
      }
      return true;
    });
    setFiles((prev) => [...prev, ...valid]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx: number) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trap

    if (!form.confirm_accurate || !form.confirm_no_guarantee) {
      toast({ title: "Please confirm both required checkboxes.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // Upload files
      const uploadedPaths: string[] = [];
      for (const file of files) {
        const path = `${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("deal-documents").upload(path, file);
        if (error) throw new Error(`File upload failed: ${file.name}`);
        uploadedPaths.push(path);
      }

      // Insert submission
      const { error } = await supabase.from("deal_submissions").insert({
        contact_name: form.contact_name.trim(),
        company_name: form.company_name.trim(),
        title_role: form.title_role.trim() || null,
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        website: form.website.trim() || null,
        linkedin: form.linkedin.trim() || null,
        industry: form.industry,
        hq_state: form.hq_state.trim(),
        years_in_business: parseInt(form.years_in_business, 10),
        employees: form.employees ? parseInt(form.employees, 10) : null,
        business_description: form.business_description.trim(),
        capital_requested: form.capital_requested,
        capital_type_sought: form.capital_type_sought,
        use_of_funds: form.use_of_funds,
        timing_urgency: form.timing_urgency,
        annual_revenue: form.annual_revenue,
        profitability: form.profitability,
        existing_debt: form.existing_debt,
        collateral_available: form.collateral_available,
        financial_summary: form.financial_summary.trim() || null,
        opportunity_summary: form.opportunity_summary.trim(),
        why_this_request_matters: form.why_this_request_matters.trim(),
        additional_notes: form.additional_notes.trim() || null,
        documents: uploadedPaths,
        qualification_call_requested: form.qualification_call_requested,
        honeypot: honeypot || null,
      });

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke("notify-deal-submission", {
          body: {
            contact_name: form.contact_name.trim(),
            company_name: form.company_name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            industry: form.industry,
            capital_requested: form.capital_requested,
            capital_type_sought: form.capital_type_sought,
            use_of_funds: form.use_of_funds,
            annual_revenue: form.annual_revenue,
            profitability: form.profitability,
            opportunity_summary: form.opportunity_summary.trim(),
            documents: uploadedPaths,
          },
        });
      } catch {
        // Email notification failure shouldn't block submission
      }

      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-20">
          <section className="section-padding royal-gradient min-h-[70vh] flex items-center">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle2 className="w-16 h-16 text-royal-accent mx-auto mb-6" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground/95 mb-4">
                Your Deal Submission Has Been Received
              </h1>
              <p className="font-body text-primary-foreground/60 leading-relaxed mb-8 max-w-lg mx-auto">
                A member of our team will review your information and follow up if additional details are needed. For time-sensitive opportunities, you may also book a qualification call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCalendly}
                  className="px-8 py-3 bg-royal-accent hover:bg-royal-light text-accent-foreground font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300"
                >
                  Book a Qualification Call
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 border border-silver/30 text-primary-foreground/70 hover:text-silver font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Hero */}
        <section className="section-padding royal-gradient pb-12">
          <div className="max-w-4xl mx-auto">
            <div className="accent-line w-12 mb-6" />
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground/95 mb-4">
              Submit Your Deal for Institutional Capital Review
            </h1>
            <p className="font-body text-primary-foreground/60 leading-relaxed mb-3 max-w-3xl">
              Our team reviews qualified opportunities across private credit, structured finance, growth capital, acquisitions, and special situations.
            </p>
            <p className="font-body text-sm text-primary-foreground/40 leading-relaxed mb-8 max-w-2xl">
              Typical review focus: lower middle market opportunities, special situations, and capital requests generally starting at $2MM and above.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#submission-form"
                className="px-8 py-3 bg-white text-primary font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300 hover:bg-white/90 text-center"
              >
                Submit Deal for Review
              </a>
              <button
                onClick={openCalendly}
                className="px-8 py-3 border border-silver/30 text-primary-foreground/70 hover:text-silver font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300"
              >
                Book a Qualification Call
              </button>
            </div>
          </div>
        </section>

        {/* Who this is for + What happens next */}
        <section className="px-6 py-12 md:px-12 lg:px-24 royal-gradient border-t border-silver/10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-lg text-silver font-semibold mb-3">Who This Is For</h3>
              <p className="font-body text-sm text-primary-foreground/50 leading-relaxed">
                This submission form is intended for qualified businesses, sponsors, operators, and project principals seeking institutional or strategic capital solutions.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg text-silver font-semibold mb-3">What Happens Next</h3>
              <p className="font-body text-sm text-primary-foreground/50 leading-relaxed">
                After submission, our team reviews the opportunity for fit, structure, and readiness. If aligned, we will follow up to request additional documentation, discuss next steps, or schedule a qualification call.
              </p>
            </div>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section id="submission-form" className="section-padding royal-gradient border-t border-silver/10">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
            {/* Form */}
            <div className="flex-1 max-w-3xl">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Honeypot */}
                <div className="absolute opacity-0 h-0 overflow-hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="company_url_confirm"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Section 1 */}
                <div className="space-y-4">
                  <h3 className={sectionTitle}>1. Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><Label className={labelCls}>Contact Name *</Label><Input className={inputCls} value={form.contact_name} onChange={(e) => set("contact_name", e.target.value)} required /></div>
                    <div><Label className={labelCls}>Company Name *</Label><Input className={inputCls} value={form.company_name} onChange={(e) => set("company_name", e.target.value)} required /></div>
                    <div><Label className={labelCls}>Title / Role</Label><Input className={inputCls} value={form.title_role} onChange={(e) => set("title_role", e.target.value)} /></div>
                    <div><Label className={labelCls}>Email Address *</Label><Input type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} required /></div>
                    <div><Label className={labelCls}>Phone Number</Label><Input type="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></div>
                    <div><Label className={labelCls}>Website</Label><Input type="url" className={inputCls} value={form.website} onChange={(e) => set("website", e.target.value)} placeholder="https://" /></div>
                    <div className="md:col-span-2"><Label className={labelCls}>LinkedIn Profile</Label><Input type="url" className={inputCls} value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." /></div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-4">
                  <h3 className={sectionTitle}>2. Company Overview</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className={labelCls}>Industry *</Label>
                      <Select value={form.industry} onValueChange={(v) => set("industry", v)}>
                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select industry" /></SelectTrigger>
                        <SelectContent>{INDUSTRIES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div><Label className={labelCls}>State / Headquarters *</Label><Input className={inputCls} value={form.hq_state} onChange={(e) => set("hq_state", e.target.value)} required /></div>
                    <div><Label className={labelCls}>Years in Business *</Label><Input type="number" min={0} className={inputCls} value={form.years_in_business} onChange={(e) => set("years_in_business", e.target.value)} required /></div>
                    <div><Label className={labelCls}>Number of Employees</Label><Input type="number" min={0} className={inputCls} value={form.employees} onChange={(e) => set("employees", e.target.value)} /></div>
                    <div className="md:col-span-2">
                      <Label className={labelCls}>Business Description *</Label>
                      <Textarea className={inputCls} rows={3} value={form.business_description} onChange={(e) => set("business_description", e.target.value)} required />
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-5">
                  <h3 className={sectionTitle}>3. Capital Request</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className={labelCls}>Capital Requested *</Label>
                      <Select value={form.capital_requested} onValueChange={(v) => set("capital_requested", v)}>
                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select range" /></SelectTrigger>
                        <SelectContent>{CAPITAL_RANGES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className={labelCls}>Timing / Urgency *</Label>
                      <Select value={form.timing_urgency} onValueChange={(v) => set("timing_urgency", v)}>
                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select timing" /></SelectTrigger>
                        <SelectContent>{TIMING_OPTIONS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className={labelCls}>Capital Type Sought *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {CAPITAL_TYPES.map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={form.capital_type_sought.includes(v)}
                            onCheckedChange={() => toggleMulti("capital_type_sought", v)}
                            className="border-silver/40 data-[state=checked]:bg-royal-accent data-[state=checked]:border-royal-accent"
                          />
                          <span className="font-body text-sm text-primary-foreground/60">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className={labelCls}>Use of Funds *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {USE_OF_FUNDS_OPTIONS.map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={form.use_of_funds.includes(v)}
                            onCheckedChange={() => toggleMulti("use_of_funds", v)}
                            className="border-silver/40 data-[state=checked]:bg-royal-accent data-[state=checked]:border-royal-accent"
                          />
                          <span className="font-body text-sm text-primary-foreground/60">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="space-y-4">
                  <h3 className={sectionTitle}>4. Financial Snapshot</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className={labelCls}>Annual Revenue *</Label>
                      <Select value={form.annual_revenue} onValueChange={(v) => set("annual_revenue", v)}>
                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select range" /></SelectTrigger>
                        <SelectContent>{REVENUE_RANGES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className={labelCls}>EBITDA / Profitability *</Label>
                      <Select value={form.profitability} onValueChange={(v) => set("profitability", v)}>
                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{EBITDA_OPTIONS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className={labelCls}>Existing Debt *</Label>
                      <Select value={form.existing_debt} onValueChange={(v) => set("existing_debt", v)}>
                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select range" /></SelectTrigger>
                        <SelectContent>{DEBT_OPTIONS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className={labelCls}>Collateral Available</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {COLLATERAL_OPTIONS.map((v) => (
                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={form.collateral_available.includes(v)}
                            onCheckedChange={() => toggleMulti("collateral_available", v)}
                            className="border-silver/40 data-[state=checked]:bg-royal-accent data-[state=checked]:border-royal-accent"
                          />
                          <span className="font-body text-sm text-primary-foreground/60">{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className={labelCls}>Brief Financial Summary</Label>
                    <Textarea className={inputCls} rows={3} value={form.financial_summary} onChange={(e) => set("financial_summary", e.target.value)} />
                  </div>
                </div>

                {/* Section 5 */}
                <div className="space-y-4">
                  <h3 className={sectionTitle}>5. Deal Narrative</h3>
                  <p className="font-body text-xs text-primary-foreground/40">
                    Provide a concise overview of the business, transaction, use of funds, and why this opportunity is compelling.
                  </p>
                  <div>
                    <Label className={labelCls}>Opportunity Summary *</Label>
                    <Textarea className={inputCls} rows={5} value={form.opportunity_summary} onChange={(e) => set("opportunity_summary", e.target.value)} required />
                  </div>
                  <div>
                    <Label className={labelCls}>Why This Capital Request Matters *</Label>
                    <Textarea className={inputCls} rows={4} value={form.why_this_request_matters} onChange={(e) => set("why_this_request_matters", e.target.value)} required />
                  </div>
                  <div>
                    <Label className={labelCls}>Additional Notes</Label>
                    <Textarea className={inputCls} rows={3} value={form.additional_notes} onChange={(e) => set("additional_notes", e.target.value)} />
                  </div>
                </div>

                {/* Section 6 */}
                <div className="space-y-4">
                  <h3 className={sectionTitle}>6. Document Upload</h3>
                  <p className="font-body text-xs text-primary-foreground/40">
                    Accepted: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX — Max 50MB per file
                  </p>
                  <p className="font-body text-xs text-primary-foreground/30">
                    Upload labels: Executive Summary / Deal Overview, Financial Statements, Bank Statements, Debt Schedule, Pitch Deck, Contracts / POs, Supporting Documents
                  </p>
                  <div
                    className="p-6 border border-dashed border-silver/20 rounded bg-royal-light/20 text-center cursor-pointer hover:border-silver/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-8 h-8 text-primary-foreground/30 mx-auto mb-2" />
                    <p className="font-body text-sm text-primary-foreground/50">Click to select files or drag and drop</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={handleFiles}
                      className="hidden"
                    />
                  </div>
                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-royal-light/30 rounded">
                          <FileText className="w-4 h-4 text-royal-accent shrink-0" />
                          <span className="font-body text-sm text-primary-foreground/70 truncate flex-1">{f.name}</span>
                          <span className="font-body text-xs text-primary-foreground/40">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                          <button type="button" onClick={() => removeFile(i)} className="text-primary-foreground/40 hover:text-destructive">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Section 7 */}
                <div className="space-y-4">
                  <h3 className={sectionTitle}>7. Compliance & Consent</h3>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={form.confirm_accurate}
                        onCheckedChange={(c) => set("confirm_accurate", !!c)}
                        className="border-silver/40 data-[state=checked]:bg-royal-accent data-[state=checked]:border-royal-accent mt-0.5"
                      />
                      <span className="font-body text-sm text-primary-foreground/60">
                        I confirm the information provided is accurate to the best of my knowledge. *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={form.confirm_no_guarantee}
                        onCheckedChange={(c) => set("confirm_no_guarantee", !!c)}
                        className="border-silver/40 data-[state=checked]:bg-royal-accent data-[state=checked]:border-royal-accent mt-0.5"
                      />
                      <span className="font-body text-sm text-primary-foreground/60">
                        I understand submission does not guarantee funding or engagement. *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={form.qualification_call_requested}
                        onCheckedChange={(c) => set("qualification_call_requested", !!c)}
                        className="border-silver/40 data-[state=checked]:bg-royal-accent data-[state=checked]:border-royal-accent mt-0.5"
                      />
                      <span className="font-body text-sm text-primary-foreground/60">
                        I would also like to schedule a qualification call.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-10 py-3.5 bg-white text-primary font-body font-semibold text-sm tracking-wide rounded transition-colors duration-300 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Deal for Review"}
                  </button>
                  <p className="mt-6 font-body text-xs text-primary-foreground/30 leading-relaxed max-w-xl italic">
                    9 Figure Funding acts as a strategic capital advisory and deal matchmaking platform. Submission of information does not create an advisory relationship, commitment to fund, or guarantee of capital placement.
                  </p>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-72 shrink-0">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div className="p-6 border border-silver/10 rounded bg-royal-light/20">
                  <h4 className="font-display text-base text-silver font-semibold mb-4">What to Prepare</h4>
                  <ul className="space-y-2">
                    {["Executive summary", "Recent financial statements", "Use of funds", "Debt schedule", "Supporting contracts or POs"].map((item) => (
                      <li key={item} className="font-body text-sm text-primary-foreground/50 flex items-start gap-2">
                        <span className="text-royal-accent mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-body text-xs text-primary-foreground/35 italic">
                    Complete submissions receive faster review.
                  </p>
                </div>

                <div className="p-6 border border-silver/10 rounded bg-royal-light/20">
                  <h4 className="font-display text-base text-silver font-semibold mb-3">Need to Discuss First?</h4>
                  <p className="font-body text-sm text-primary-foreground/50 mb-4">
                    Book a brief qualification call with our team before submitting.
                  </p>
                  <button
                    onClick={openCalendly}
                    className="w-full px-6 py-2.5 border border-silver/30 text-primary-foreground/70 hover:text-silver font-body font-semibold text-xs tracking-wide rounded transition-colors duration-300"
                  >
                    Book a Qualification Call
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitDealPage;
