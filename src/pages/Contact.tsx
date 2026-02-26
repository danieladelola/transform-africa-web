import { useState } from "react";
import { Phone, Mail, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroContact from "@/assets/hero-contact.jpg";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent. We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      <PageHero title="Get In Touch" backgroundImage={heroContact} />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
              Let's talk about your next project — whether in Nigeria, across Africa, or globally.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <ScrollReveal>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
                <Input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
                <Button type="submit" size="lg" className="w-full bg-gold text-foreground hover:bg-gold-dark font-semibold">
                  Send Message
                </Button>
              </form>
            </ScrollReveal>

            {/* Contact Info */}
            <ScrollReveal delay={0.2}>
              <div className="bg-navy rounded-lg p-8 text-primary-foreground h-full">
                <h3 className="text-xl font-bold mb-8">Contact Details</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-primary-foreground/70">(+234) 814 546 2355</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-primary-foreground/70">contact@mnssconsulting.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-gold mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-primary-foreground/70">Nigeria / Global</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="font-semibold mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="LinkedIn"><Linkedin size={22} /></a>
                    <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="Twitter"><Twitter size={22} /></a>
                    <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="Instagram"><Instagram size={22} /></a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Map Placeholder */}
          <ScrollReveal>
            <div className="mt-16 max-w-5xl mx-auto rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.45932557996!2d3.1191397!3d6.548055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MNSS Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
