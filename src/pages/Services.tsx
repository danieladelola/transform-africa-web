import { Link } from "react-router-dom";
import { Globe, Briefcase, BarChart3, Link2, Smartphone, Monitor, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroServices from "@/assets/hero-services.jpg";

const services = [
  {
    icon: Globe,
    title: "International Development Consulting",
    desc: "MNSS partners with governments and organizations across the globe, leveraging deep knowledge of local challenges in targeted countries. We design and implement development programs that create measurable, sustainable impact.",
  },
  {
    icon: Briefcase,
    title: "Project and Program Management",
    desc: "Tailored strategies combining local realities with global standards for successful project delivery. Our experienced project managers ensure complex, multi-stakeholder programs are delivered on time and to the highest quality.",
  },
  {
    icon: BarChart3,
    title: "Business Management Advisory",
    desc: "With 20 years in Nigeria's fast-paced economy, we're skilled at navigating complex business dynamics, helping businesses scale while ensuring local relevance. From strategy to operations, we provide guidance to thrive.",
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
  {
    icon: Leaf,
    title: "Agritech",
    desc: (
      <>
        <p>
          MNSS delivers smart, data-driven Agritech solutions that enhance agricultural productivity, efficiency, and sustainability. We integrate technology and analytics into farming and agribusiness operations to support better decision-making and improved outcomes across the value chain.
        </p>
        <ul className="mt-3 list-disc list-inside text-muted-foreground">
          <li><strong>Precision Agriculture:</strong> Data and monitoring tools to optimize planting, irrigation, and harvesting.</li>
          <li><strong>Farm Data Analytics:</strong> Yield forecasting, performance tracking, and risk management.</li>
          <li><strong>Supply Chain Optimization:</strong> Technology-driven systems to streamline farm-to-market processes.</li>
          <li><strong>Agricultural Consulting:</strong> Operational improvement and cost-efficiency strategies for agribusinesses.</li>
        </ul>
        <p className="mt-3">MNSS empowers farmers and agribusinesses to transition into smart agriculture— increasing yields, reducing waste, and driving profitability.</p>
      </>
    ),
  },
];

const Services = () => (
  <div>
    <PageHero title="What We Do" subtitle="Comprehensive consulting services tailored to your needs" backgroundImage={heroServices} />

    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-16 leading-relaxed">
            We offer a full range of consulting services tailored to each market's unique needs. Our expertise spans international development, business transformation, technology, and beyond.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                  <s.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-gold transition-colors">{s.title}</h3>
                  {typeof s.desc === "string" ? (
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  ) : (
                    <div className="text-muted-foreground leading-relaxed">{s.desc}</div>
                  )}
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
            Let's discuss how our services can help you achieve your goals.
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
