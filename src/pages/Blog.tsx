import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { supabase } from "@/integrations/supabase/client";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import heroBlog from "@/assets/hero-blog.jpg";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setPosts(data);
      } else {
        // Fallback to static posts
        setPosts(staticPosts.map((p) => ({ ...p, image_url: p.image })));
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Map static images by slug for fallback
  const staticImageMap: Record<string, string> = {};
  staticPosts.forEach((p) => { staticImageMap[p.slug] = p.image; });

  return (
    <div>
      <PageHero title="Insights & Updates" subtitle="Expert perspectives on consulting, development, and business transformation" backgroundImage={heroBlog} />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.1}>
                  <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border h-full flex flex-col group">
                    <div className="overflow-hidden">
                      <img
                        src={post.image_url || staticImageMap[post.slug] || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-xs font-semibold text-gold uppercase tracking-wider">{post.category}</span>
                      <h3 className="text-lg font-bold text-foreground mt-2 mb-3 line-clamp-2 group-hover:text-gold transition-colors">{post.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div>
                          <span className="font-medium">{post.author}</span> · <span>{post.date}</span>
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
