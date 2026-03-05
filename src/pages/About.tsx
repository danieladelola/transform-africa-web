import { Brain, Zap, Target, Handshake, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroAbout from "@/assets/hero-about.jpg";
import workRetreat from "@/assets/work-retreat.jpg";
import workTraining from "@/assets/work-training.jpg";
import workBizdev from "@/assets/work-bizdev.jpg";

const values = [
  { icon: Brain, title: "Contextual Intelligence", desc: "We understand that successful solutions must be grounded in local realities." },
  { icon: Zap, title: "Entrepreneurial Agility", desc: "We move fast, think creatively, and deliver results without unnecessary complexity." },
  { icon: Target, title: "Sustainable Impact", desc: "We focus on long-term value creation and systemic change." },
  { icon: Handshake, title: "Partnership Approach", desc: "We work alongside our clients as trusted advisors, not distant consultants." },
  { icon: Award, title: "Excellence in Execution", desc: "We deliver high-quality outcomes that exceed expectations." },
];

const stats = [
  { value: "Since 2013", label: "Established" },
  { value: "100+", label: "Clients Served" },
  { value: "10+", label: "Sectors Covered" },
];

const works = [
  { image: workRetreat, title: "Strategic Planning" },
  { image: workTraining, title: "Capacity Building" },
  { image: workBizdev, title: "Partnership Facilitation" },
];

const About = () => (
  <div>
    <PageHero title="About Us" subtitle="Founded on Vision, Built on Results" backgroundImage={heroAbout} />

    {/* Company Story */}
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Our Story</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">Founded on Vision, Built on Results</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              MNSS Consulting Ltd. was incorporated in 2013 with a bold vision: to become a globally trusted catalyst for market system transformation and organizational excellence. What began as an entrepreneurial venture has evolved into a respected consulting practice, serving a diverse ecosystem of clients across corporate, public, and development sectors.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our journey reflects the dynamic spirit of African entrepreneurship—nimble, innovative, and deeply connected to the markets we serve. This startup DNA remains at our core, enabling us to deliver fresh perspectives and rapid solutions that larger, traditional firms often cannot match.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mt-14">
          <ScrollReveal delay={0.1}>
            <div className="bg-muted rounded-xl p-8 border border-border hover:shadow-lg transition-shadow h-full">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses, civil society, and public institutions to innovate, scale impact, and thrive in an ever-evolving world through strategic consulting, market intelligence, and sustainable development solutions.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-muted rounded-xl p-8 border border-border hover:shadow-lg transition-shadow h-full">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-5">
                <Brain className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a globally trusted catalyst for market system transformation, organizational excellence, and sustainable development across Africa and emerging economies.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full" />
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="text-center bg-card rounded-xl p-8 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center mx-auto mb-6">
                  <v.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/50 to-transparent" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center gap-16 md:gap-24">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold">{s.value}</div>
                <div className="text-primary-foreground/60 mt-3 tracking-wide">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Our Work */}
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Portfolio</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Our Work</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full" />
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {works.map((w, i) => (
            <ScrollReveal key={w.title} delay={i * 0.15}>
              <div className="rounded-xl overflow-hidden shadow-md group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={w.image} alt={w.title} className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent group-hover:from-navy/60 transition-colors" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-bold text-primary-foreground">{w.title}</h3>
                    <div className="w-10 h-0.5 bg-gold mt-2 group-hover:w-20 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-navy">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to work with us?</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our contextual intelligence and proven methodologies can help transform your organization.
          </p>
          <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-10 rounded-full shadow-lg shadow-gold/20">
            <Link to="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default About;
