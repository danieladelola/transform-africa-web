import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Briefcase, BarChart3, ChevronDown } from "lucide-react";
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
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-6"
            >
              Strategic Consulting · Since 2005
            </motion.span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Transforming Global Solutions
              <br />
              <span className="text-gradient">with Local Expertise</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed px-2">
              MNSS Consult LTD brings over 20 years of strategic consulting expertise delivering impactful results across International Development, Business Transformation, and Project Management.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0"
          >
            <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-8 sm:px-10 h-12 text-base shadow-lg shadow-gold/20 w-full sm:w-auto">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-gold/60 text-gold hover:bg-gold hover:text-foreground font-semibold px-8 sm:px-10 h-12 text-base transition-colors w-full sm:w-auto">
              <Link to="/services">Our Services</Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="h-6 w-6 text-primary-foreground/40 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/50 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-wrap justify-center gap-10 sm:gap-16 md:gap-24">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gold">{s.value}</div>
                  <div className="text-sm text-primary-foreground/60 mt-2 tracking-wide">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">About MNSS</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">Who We Are</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto mb-8 rounded-full" />
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                At MNSS Consult, we combine contextual intelligence with global reach. Our team understands the cultural, economic, and environmental factors shaping the markets we serve — from Nigeria to the broader African continent and beyond. We equip our clients with the insights, tools, and capabilities to navigate emerging challenges and deliver long-term impact.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8">
                <Link to="/about">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">What We Do</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Our Services</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.15}>
                <div className="bg-card rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border group hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-xl bg-navy flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                    <s.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-navy-light rounded-full px-8">
              <Link to="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Our Blog</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Latest Insights</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {recentPosts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.15}>
                <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border group hover:-translate-y-1">
                  <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">{post.category}</span>
                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-gold transition-colors">{post.title}</h3>
                    </Link>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
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
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/50 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Let's Connect</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6">
              Let's talk about your next project
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
              Whether in Nigeria, across Africa, or globally — we're ready to help you achieve transformative results.
            </p>
            <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-10 h-12 text-base shadow-lg shadow-gold/20 rounded-full">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Index;
