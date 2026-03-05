import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroLeadership from "@/assets/hero-leadership.jpg";

const Leadership = () => (
  <div>
    <PageHero title="Our Leadership" subtitle="Meet the team driving transformative results" backgroundImage={heroLeadership} />

    {/* Leadership Message */}
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Leadership Message</span>
            <div className="mt-8 bg-muted rounded-xl p-8 lg:p-12 border border-border relative">
              <Quote className="h-12 w-12 text-gold/20 absolute top-6 left-6" />
              <blockquote className="relative z-10 text-lg md:text-xl text-foreground leading-relaxed italic pl-8">
                "At MNSS Consulting, we believe that the most powerful solutions emerge from the intersection of global expertise and local insight. Our team combines international experience with deep African market knowledge, startup agility with proven consulting methodologies, and strategic thinking with hands-on execution."
              </blockquote>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>

    {/* Our Expertise */}
    <section className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <ScrollReveal delay={0.1}>
            <div className="bg-card rounded-xl p-8 border border-border h-full">
              <h3 className="text-xl font-bold text-foreground mb-4">Our Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our leadership team brings together decades of experience across management consulting, development finance, technology innovation, and public sector engagement. This diverse background enables us to serve our equally diverse client base with credibility and insight.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-card rounded-xl p-8 border border-border h-full">
              <h3 className="text-xl font-bold text-foreground mb-4">Commitment to Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                We maintain the highest standards of professional excellence while preserving the entrepreneurial spirit that has driven our success since 2013. Every engagement reflects our commitment to delivering measurable impact and sustainable value.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/50 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6">Work with our team</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
            Connect with our leadership to discuss how MNSS Consulting can support your strategic objectives.
          </p>
          <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-10 h-12 text-base shadow-lg shadow-gold/20 rounded-full">
            <Link to="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default Leadership;
