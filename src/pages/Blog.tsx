import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { blogPosts } from "@/data/blogPosts";
import heroBlog from "@/assets/hero-blog.jpg";

const Blog = () => (
  <div>
    <PageHero title="Insights & Updates" subtitle="Expert perspectives on consulting, development, and business transformation" backgroundImage={heroBlog} />

    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border h-full flex flex-col">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-gold uppercase tracking-wider">{post.category}</span>
                  <h3 className="text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <div>
                      <span>{post.author}</span> · <span>{post.date}</span>
                    </div>
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
  </div>
);

export default Blog;
