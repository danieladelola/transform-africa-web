import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Briefcase, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { blogPosts } from "@/data/blogPosts";
import heroHome from "@/assets/hero-home.jpg";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "100+", label: "Clients Served" },
  { value: "10+", label: "Sectors Covered" },
];

const services = [
  { icon: Globe, title: "International Development Consulting", desc: "Partnering with governments and organizations across the globe with deep local knowledge." },
  { icon: Briefcase, title: "Project & Program Management", desc: "Tailored strategies combining local realities with global standards for successful delivery." },
  { icon: BarChart3, title: "Business Management Advisory", desc: "Navigating complex business dynamics to help businesses scale with local relevance." },
];

const Index = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroHome} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Transforming Global Solutions
              <br />
              <span className="text-gradient">with Local Expertise</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              MNSS Consult LTD brings over 20 years of strategic consulting expertise delivering impactful results across International Development, Business Transformation, and Project Management.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold">{s.value}</div>
                <div className="text-sm text-primary-foreground/70 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-8">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8">
              <Link to="/services">Our Services</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Who We Are</h2>
              <div className="w-16 h-1 bg-gold mx-auto mb-8" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                At MNSS Consult, we combine contextual intelligence with global reach. Our team understands the cultural, economic, and environmental factors shaping the markets we serve — from Nigeria to the broader African continent and beyond. We equip our clients with the insights, tools, and capabilities to navigate emerging challenges and deliver long-term impact.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/about">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Our Services</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-12" />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.15}>
                <div className="bg-card rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow border border-border group">
                  <div className="w-14 h-14 rounded-lg bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                    <s.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-navy-light">
              <Link to="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Latest Insights</h2>
            <div className="w-16 h-1 bg-gold mx-auto mb-12" />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.15}>
                <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border">
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">{post.category}</span>
                    <h3 className="text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Let's talk about your next project
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether in Nigeria, across Africa, or globally — we're ready to help you achieve transformative results.
            </p>
            <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-8">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
