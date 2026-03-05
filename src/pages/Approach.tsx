import { Link } from "react-router-dom";
import { Search, PenTool, Users, RefreshCw, Zap, Globe, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroApproach from "@/assets/hero-approach.jpg";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Contextual Analysis",
    desc: "We begin every engagement with deep immersion in your specific market, cultural, and operational context. This includes stakeholder mapping, regulatory analysis, and competitive landscape assessment.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Strategic Design",
    desc: "Our team develops tailored solutions that balance global best practices with local market realities, ensuring strategies are both innovative and implementable.",
  },
  {
    icon: Users,
    num: "03",
    title: "Collaborative Implementation",
    desc: "We work alongside your team as embedded advisors, providing hands-on support while building internal capabilities for sustained success.",
  },
  {
    icon: RefreshCw,
    num: "04",
    title: "Continuous Learning",
    desc: "Our agile approach includes regular review cycles, adaptive management, and knowledge capture to ensure continuous improvement and maximum impact.",
  },
];

const reasons = [
  {
    icon: Zap,
    title: "Startup Agility, Proven Results",
    desc: "Our entrepreneurial foundation means we move fast, think creatively, and deliver results without bureaucratic delays. Yet our decade-plus track record demonstrates proven capability across diverse sectors and client types.",
  },
  {
    icon: Globe,
    title: "Africa-Focused Expertise",
    desc: "While we operate globally, our deep expertise in African markets provides unique insights into regulatory environments, cultural dynamics, and business practices that drive success.",
  },
  {
    icon: Handshake,
    title: "Partnership Approach",
    desc: "We don't just deliver reports—we build lasting partnerships that create sustainable value for our clients and their stakeholders.",
  },
];

const Approach = () => (
  <div>
    <PageHero title="Our Approach" subtitle="The MNSS Methodology for Transformative Results" backgroundImage={heroApproach} />

    {/* Methodology Steps */}
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">How We Work</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">The MNSS Methodology</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-navy flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                    <step.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <span className="text-4xl font-bold text-gold/30">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose MNSS */}
    <section className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Our Difference</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Why Choose MNSS</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.1}>
              <div className="text-center bg-card rounded-xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center mx-auto mb-6">
                  <r.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/50 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6">Ready to experience the MNSS difference?</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
            Schedule a complimentary consultation to discuss your specific challenges and explore how we can support your objectives.
          </p>
          <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-10 h-12 text-base shadow-lg shadow-gold/20 rounded-full">
            <Link to="/contact">Request a Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default Approach;
