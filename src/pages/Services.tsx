import { Link } from "react-router-dom";
import { Globe, Briefcase, BarChart3, Link2, Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroServices from "@/assets/hero-services.jpg";

const services = [
  {
    icon: Globe,
    title: "International Development Consulting",
    desc: "MNSS partners with governments and organizations across the globe, leveraging deep knowledge of local challenges in targeted countries. We design and implement development programs that create measurable, sustainable impact in even the most complex environments.",
  },
  {
    icon: Briefcase,
    title: "Project and Program Management",
    desc: "Tailored strategies combining local realities with global standards for successful project delivery. Our experienced project managers ensure that complex, multi-stakeholder programs are delivered on time, within budget, and to the highest quality standards.",
  },
  {
    icon: BarChart3,
    title: "Business Management Advisory",
    desc: "With 20 years in Nigeria's fast-paced economy, we're skilled at navigating complex business dynamics, helping businesses scale while ensuring local relevance. From strategy to operations, we provide the guidance businesses need to thrive.",
  },
  {
    icon: Link2,
    title: "Value Chain Development",
    desc: "From the heart of Nigeria's growing sectors to the global marketplace, we create inclusive, market-driven solutions that benefit all stakeholders. Our approach strengthens connections between producers, processors, and markets.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Apps that run on mobile and everywhere else can take a business to another level. MNSS can help achieve this with modern, scalable applications designed for your specific needs and target audience.",
  },
  {
    icon: Monitor,
    title: "IT Consulting",
    desc: "Fast turnaround times for your IT concerns because we iterate quickly and collect much-needed requirements. From digital transformation to infrastructure modernization, we help businesses leverage technology effectively.",
  },
];

const Services = () => (
  <div>
    <PageHero title="What We Do" backgroundImage={heroServices} />

    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            We offer a full range of consulting services tailored to each market's unique needs. Our expertise spans international development, business transformation, technology, and beyond.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-lg p-8 h-full hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 rounded-lg bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                  <s.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to get started?</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your goals.
          </p>
          <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-8">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default Services;
