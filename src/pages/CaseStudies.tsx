import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import heroIndustries from "@/assets/hero-industries.jpg";
import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";

const caseStudies = [
  {
    image: caseStudy1,
    client: "International Development Finance Institution",
    title: "Financial Inclusion Initiative",
    challenge: "Expand digital financial services to underserved rural communities across three African countries while ensuring regulatory compliance and sustainable adoption.",
    solution: "Developed comprehensive market entry strategy including regulatory navigation, partnership facilitation with local mobile operators, and community engagement programs.",
    impacts: [
      "2.3 million previously unbanked individuals reached within 18 months",
      "67% sustained usage rates",
      "Full regulatory compliance across all markets",
    ],
  },
  {
    image: caseStudy2,
    client: "Regional NGO and Government Partnership",
    title: "Agricultural Value Chain Transformation",
    challenge: "Strengthen smallholder farmer integration into modern agricultural value chains while improving food security and rural incomes.",
    solution: "Designed market-driven approach connecting farmers with processors, implemented digital platforms for market information, and established farmer training programs.",
    impacts: [
      "Farmer incomes increased by 45% on average",
      "Improved food security for 150,000 households",
      "Sustainable market linkages across the value chain",
    ],
  },
  {
    image: caseStudy3,
    client: "Nigerian Fintech Startup",
    title: "Technology Startup Scaling",
    challenge: "Scale operations across five African markets while maintaining product-market fit and regulatory compliance.",
    solution: "Developed market-specific expansion strategies, regulatory compliance frameworks, and partnership models tailored to each target market.",
    impacts: [
      "Successful expansion to four additional markets within 12 months",
      "300% revenue growth",
      "Successful Series A funding round",
    ],
  },
];

const CaseStudies = () => (
  <div>
    <PageHero title="Case Studies" subtitle="Real results from real partnerships" backgroundImage={heroIndustries} />

    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-[0.15em]">Our Impact</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">Featured Success Stories</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-gold-light mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        <div className="space-y-16 max-w-5xl mx-auto">
          {caseStudies.map((cs, i) => (
            <ScrollReveal key={cs.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="overflow-hidden">
                    <img src={cs.image} alt={cs.title} className="w-full h-full min-h-[300px] object-cover" />
                  </div>
                  <div className="p-8 lg:p-10">
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider">{cs.client}</span>
                    <h3 className="text-2xl font-bold text-foreground mt-2 mb-4">{cs.title}</h3>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-1">Challenge</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{cs.challenge}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-foreground mb-1">Solution</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{cs.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Impact</h4>
                      <ul className="space-y-2">
                        {cs.impacts.map((impact) => (
                          <li key={impact} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <TrendingUp className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-3 mb-6">Ready to write your success story?</h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-2xl mx-auto">
            Let's discuss how MNSS Consulting can deliver similar transformative results for your organization.
          </p>
          <Button asChild size="lg" className="bg-gold text-foreground hover:bg-gold-dark font-semibold px-10 h-12 text-base shadow-lg shadow-gold/20 rounded-full">
            <Link to="/contact">Start Your Project <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default CaseStudies;
