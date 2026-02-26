import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="pt-20">
      {/* Hero image */}
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <ScrollReveal>
            <Button asChild variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
            </Button>

            <span className="text-xs font-semibold text-gold uppercase tracking-wider">{post.category}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
              <span>{post.author}</span>
              <span>·</span>
              <span>{post.date}</span>
            </div>

            <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return <h3 key={i} className="text-xl font-bold text-foreground mt-8 mb-4">{paragraph.replace(/\*\*/g, "")}</h3>;
                }
                if (paragraph.startsWith("*") && paragraph.includes("*:")) {
                  return <p key={i} className="mb-4"><em className="font-semibold text-foreground not-italic">{paragraph.replace(/\*/g, "")}</em></p>;
                }
                return <p key={i} className="mb-6 text-muted-foreground leading-relaxed">{paragraph}</p>;
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
