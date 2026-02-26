import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts as staticPosts } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (data) {
        setPost(data);
      } else {
        // Fallback to static
        const staticPost = staticPosts.find((p) => p.slug === slug);
        if (staticPost) setPost({ ...staticPost, image_url: staticPost.image });
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
    </div>
  );

  if (!post) return <Navigate to="/blog" replace />;

  // Get static image fallback
  const staticPost = staticPosts.find((p) => p.slug === slug);
  const imageUrl = post.image_url || staticPost?.image || "/placeholder.svg";

  return (
    <div>
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <img src={imageUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
          <div className="container mx-auto max-w-3xl">
            <span className="text-xs font-semibold text-gold uppercase tracking-wider bg-navy/50 px-3 py-1 rounded-full">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mt-4 leading-tight">{post.title}</h1>
          </div>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10 pb-8 border-b border-border">
              <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
              </Button>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="font-medium">{post.author}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {post.content.split("\n\n").map((paragraph: string, i: number) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <h3 key={i} className="text-xl font-bold text-foreground mt-10 mb-4">{paragraph.replace(/\*\*/g, "")}</h3>;
                }
                if (paragraph.startsWith("*") && paragraph.includes("*:")) {
                  return <p key={i} className="mb-4"><em className="font-semibold text-foreground not-italic">{paragraph.replace(/\*/g, "")}</em></p>;
                }
                return <p key={i} className="mb-6 text-muted-foreground leading-relaxed text-base">{paragraph}</p>;
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
