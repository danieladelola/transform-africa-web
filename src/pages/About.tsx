import { Shield, Award, Lightbulb, Target } from "lucide-react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroAbout from "@/assets/hero-about.jpg";
import workRetreat from "@/assets/work-retreat.jpg";
import workTraining from "@/assets/work-training.jpg";
import workBizdev from "@/assets/work-bizdev.jpg";

const values = [
  { icon: Shield, title: "Integrity", desc: "We uphold the highest ethical standards in every engagement, building trust through transparency and accountability." },
  { icon: Award, title: "Excellence", desc: "We pursue the highest quality in our work, constantly raising the bar for performance and outcomes." },
  { icon: Lightbulb, title: "Innovation", desc: "We embrace creative thinking and cutting-edge approaches to solve complex challenges." },
  { icon: Target, title: "Impact", desc: "We measure our success by the tangible, lasting impact we create for our clients and communities." },
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "100+", label: "Clients Served" },
  { value: "10+", label: "Sectors Covered" },
];

const works = [
  { image: workRetreat, title: "Strategic Retreat" },
  { image: workTraining, title: "Training" },
  { image: workBizdev, title: "Business Development" },
];

const About = () => (
  <div>
    <PageHero title="About Us" backgroundImage={heroAbout} />

    {/* Who We Are */}
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Who We Are</h2>
            <div className="w-16 h-1 bg-gold mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              For over 20 years, MNSS has been deeply rooted in the global dynamic landscape. We understand the cultural, economic, and environmental factors shaping the markets we serve, including the complexities of doing business across developed and emerging economies.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 mt-12">
          <ScrollReveal delay={0.1}>
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To equip our clients with the insights, tools, and capabilities needed to navigate emerging challenges, unlock market potential, and deliver long-term impact through expert consulting, stakeholder engagement, knowledge systems, and adaptive program design.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="bg-muted rounded-lg p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a globally trusted catalyst for market system transformation, organizational excellence, and sustainable development — empowering businesses, civil society, and public institutions to innovate, scale impact, and thrive in an ever-evolving world.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Our Values</h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-12" />
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.1}>
              <div className="text-center bg-card rounded-lg p-8 border border-border">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mx-auto mb-5">
                  <v.icon className="h-7 w-7 text-gold" />
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
    <section className="py-16 bg-navy">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {stats.map((s) => (
            <ScrollReveal key={s.label}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold">{s.value}</div>
                <div className="text-primary-foreground/70 mt-2">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* Our Work */}
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Our Work</h2>
          <div className="w-16 h-1 bg-gold mx-auto mb-12" />
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {works.map((w, i) => (
            <ScrollReveal key={w.title} delay={i * 0.15}>
              <div className="rounded-lg overflow-hidden shadow-md group">
                <div className="relative overflow-hidden">
                  <img src={w.image} alt={w.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/20 transition-colors" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-primary-foreground">{w.title}</h3>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
