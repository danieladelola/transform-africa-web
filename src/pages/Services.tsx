import { Link } from "react-router-dom";
import { Globe, Building2, BarChart3, Monitor, Landmark, BookOpen, Users, ClipboardCheck, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroServices from "@/assets/hero-services.jpg";

const strategicServices = [
  {
    icon: Globe,
    title: "Market Entry & Expansion Strategy",
    desc: "Navigate complex regulatory environments, cultural nuances, and competitive landscapes across Africa and emerging markets. Our contextual intelligence ensures your expansion strategy is both ambitious and achievable.",
  },
  {
    icon: Building2,
    title: "Organizational Development & Change Management",
    desc: "Transform your organization's capabilities, culture, and performance through structured change programs designed for African business environments and emerging market dynamics.",
  },
  {
    icon: BarChart3,
    title: "Financial Advisory & Investment Support",
    desc: "Bridge the gap between investors and opportunities through comprehensive due diligence, market analysis, and investment structuring services tailored for development finance institutions and private investors.",
  },
  {
    icon: Monitor,
    title: "Digital Transformation & Technology Integration",
    desc: "Accelerate your digital journey with strategies that account for infrastructure realities, regulatory frameworks, and user behaviours across diverse African markets.",
  },
  {
    icon: Landmark,
    title: "Public Sector Consulting",
    desc: "Support government institutions and state entities in policy development, programme design, and implementation strategies that deliver measurable sustainable impact.",
  },
];

const developmentServices = [
  {
    icon: BookOpen,
    title: "Programme Design & Implementation",
    desc: "Develop and execute development programs that create sustainable impact through market-driven approaches and local ownership models.",
  },
  {
    icon: Users,
    title: "Capacity Building & Training",
    desc: "Strengthen institutional capabilities through customized training programs, mentorship initiatives, and knowledge transfer mechanisms.",
  },
  {
    icon: ClipboardCheck,
    title: "Monitoring, Evaluation & Learning",
    desc: "Implement robust M&E systems that capture impact, inform adaptive management, and demonstrate value to stakeholders and donors.",
  },
  {
    icon: Handshake,
    title: "Partnership Facilitation",
    desc: "Broker strategic partnerships between development partners, private sector, and government entities to amplify value derivation, impact and sustainability.",
  },
];

const Services = () => (
  <div>
    <PageHero title="Our Services" subtitle="Comprehensive consulting services tailored to your needs" backgroundImage={heroServices} />

    {/* Strategic Consulting */}
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Core Offerings</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Strategic Consulting Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We offer a full range of consulting services tailored to each market's unique needs. Our expertise spans market entry, organizational transformation, financial advisory, and beyond.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategicServices.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                  <s.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Development Partner Services */}
    <section className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">For Development Partners</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Specialized Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tailored services for development partners, NGOs, and international organizations seeking local implementation expertise and sustainable impact.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {developmentServices.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                  <s.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
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
          <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Start Today</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6">Ready to get started?</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your goals across Africa and emerging markets.
          </p>
          <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-10 h-12 text-base shadow-lg shadow-gold/20 rounded-full">
            <Link to="/contact">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default Services;
