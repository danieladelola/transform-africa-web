import { useState } from "react";
import { Phone, Mail, MapPin, Linkedin, Twitter, Instagram, Send, AlertCircle, Clock, FileText, MessageSquare, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroContact from "@/assets/hero-contact.jpg";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const expectations = [
  { icon: Clock, text: "Initial consultation within 48 hours" },
  { icon: FileText, text: "Detailed proposal within one week" },
  { icon: MessageSquare, text: "Rapid project mobilization" },
  { icon: RefreshCw, text: "Continuous communication and updates" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) { toast.error("Please fix the errors below"); return; }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() || null,
        subject: form.subject.trim(), message: form.message.trim(), is_read: false,
      });
      if (error) throw error;
      toast.success("Thank you! Your message has been sent. We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    } finally { setSubmitting(false); }
  };

  const renderField = (id: string, label: string, placeholder: string, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {errors[id] && <span className="text-red-500">*</span>}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={(form as any)[id]}
        onChange={(e) => { setForm({ ...form, [id]: e.target.value }); if (errors[id]) setErrors({ ...errors, [id]: "" }); }}
        className={errors[id] ? "border-red-500" : ""} />
      {errors[id] && <div className="flex items-center gap-2 text-sm text-red-500 mt-1"><AlertCircle className="h-4 w-4" />{errors[id]}</div>}
    </div>
  );

  return (
    <div>
      <PageHero title="Let's Transform Your Next Challenge" subtitle="Into an Opportunity" backgroundImage={heroContact} />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Whether you're a corporate looking to expand across Africa, a development partner seeking local implementation expertise, or a government institution aiming to improve service delivery, MNSS Consulting has the contextual intelligence and proven methodologies to drive your success.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-5">
                {renderField("name", "Full Name", "Your full name")}
                <div className="grid sm:grid-cols-2 gap-4">
                  {renderField("email", "Email", "you@example.com", "email")}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+234..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                {renderField("subject", "Subject", "How can we help?")}
                <div className="space-y-2">
                  <Label htmlFor="message">Message {errors.message && <span className="text-red-500">*</span>}</Label>
                  <Textarea id="message" placeholder="Tell us about your project..." rows={5} value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: "" }); }}
                    className={errors.message ? "border-red-500" : ""} />
                  {errors.message && <div className="flex items-center gap-2 text-sm text-red-500 mt-1"><AlertCircle className="h-4 w-4" />{errors.message}</div>}
                </div>
                <Button type="submit" disabled={submitting} size="lg" className="w-full bg-gold text-foreground hover:bg-gold-dark font-semibold">
                  {submitting ? "Sending..." : <><Send className="h-4 w-4 mr-2" /> Request a Consultation</>}
                </Button>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <div className="bg-navy rounded-xl p-8 text-primary-foreground">
                  <h3 className="text-xl font-bold mb-8">Contact Details</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center shrink-0"><Phone className="h-5 w-5 text-gold" /></div>
                      <div><p className="font-semibold">Phone</p><p className="text-primary-foreground/70">(+234) 814 546 2355</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center shrink-0"><Mail className="h-5 w-5 text-gold" /></div>
                      <div><p className="font-semibold">Email</p><p className="text-primary-foreground/70">contact@mnssconsulting.com</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-gold" /></div>
                      <div><p className="font-semibold">Location</p><p className="text-primary-foreground/70">Lagos, Nigeria / Global</p></div>
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-primary-foreground/10">
                    <p className="font-semibold mb-4">Follow Us</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="LinkedIn"><Linkedin size={20} className="text-primary-foreground/70 hover:text-gold" /></a>
                      <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="Twitter"><Twitter size={20} className="text-primary-foreground/70 hover:text-gold" /></a>
                      <a href="#" className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="Instagram"><Instagram size={20} className="text-primary-foreground/70 hover:text-gold" /></a>
                    </div>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="bg-muted rounded-xl p-8 border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4">What to Expect</h3>
                  <div className="space-y-3">
                    {expectations.map((e) => (
                      <div key={e.text} className="flex items-center gap-3">
                        <e.icon className="h-5 w-5 text-gold shrink-0" />
                        <span className="text-muted-foreground text-sm">{e.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="mt-16 max-w-5xl mx-auto rounded-xl overflow-hidden border border-border shadow-lg">
              <iframe
                src="https://www.google.com/maps?q=Lagos%20Nigeria&z=12&output=embed"
                width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="MNSS Location" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
