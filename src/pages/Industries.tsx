import { Link } from "react-router-dom";
import { Banknote, Leaf, Building, Cpu, Heart, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroIndustries from "@/assets/hero-industries.jpg";

const sectors = [
  {
    icon: Banknote,
    title: "Financial Services & Fintech",
    desc: "Navigate regulatory complexities, market penetration strategies, and digital financial inclusion initiatives across diverse African markets.",
  },
  {
    icon: Leaf,
    title: "Agriculture & Food Security",
    desc: "Transform agricultural value chains through market system development, smallholder integration, and sustainable practices.",
  },
  {
    icon: Building,
    title: "Infrastructure & Energy",
    desc: "Support infrastructure development projects, renewable energy initiatives, and public-private partnerships that drive economic growth.",
  },
  {
    icon: Cpu,
    title: "Technology & Digital Innovation",
    desc: "Accelerate technology adoption, digital ecosystem development, and innovation hub establishment across emerging markets.",
  },
  {
    icon: Heart,
    title: "Healthcare & Social Services",
    desc: "Strengthen healthcare systems, improve service delivery, and develop sustainable financing mechanisms for social impact.",
  },
  {
    icon: GraduationCap,
    title: "Education & Skills Development",
    desc: "Design education programs, vocational training initiatives, and skills development frameworks that meet market demands.",
  },
];

const Industries = () => (
  <div>
    <PageHero title="Industry Expertise" subtitle="Deep sector knowledge across Africa's key industries" backgroundImage={heroIndustries} />

    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Sectors We Serve</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto mb-6 rounded-full" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our team brings specialized knowledge across Africa's most dynamic and impactful sectors, enabling us to deliver solutions grounded in real market understanding.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((s, i) => (
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6">Need sector-specific expertise?</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
            Our team's deep industry knowledge ensures solutions that are both innovative and grounded in market realities.
          </p>
          <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-10 h-12 text-base shadow-lg shadow-gold/20 rounded-full">
            <Link to="/contact">Discuss Your Sector <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default Industries;
