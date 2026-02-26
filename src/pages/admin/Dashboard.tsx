import { useEffect, useState } from "react";
import { FileText, Mail, MailOpen, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [stats, setStats] = useState({ posts: 0, submissions: 0, unread: 0 });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [postsRes, subsRes, unreadRes] = await Promise.all([
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
      ]);

      setStats({
        posts: postsRes.count || 0,
        submissions: subsRes.count || 0,
        unread: unreadRes.count || 0,
      });

      const { data: posts } = await supabase
        .from("blog_posts")
        .select("title, slug, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentPosts(posts || []);

      const { data: messages } = await supabase
        .from("contact_submissions")
        .select("name, subject, is_read, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentMessages(messages || []);
    };
    fetchData();
  }, []);

  const cards = [
    { label: "Total Blog Posts", value: stats.posts, icon: FileText, color: "text-blue-500" },
    { label: "Contact Submissions", value: stats.submissions, icon: Mail, color: "text-green-500" },
    { label: "Unread Messages", value: stats.unread, icon: MailOpen, color: "text-gold" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{c.value}</p>
                </div>
                <c.icon className={`h-10 w-10 ${c.color} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No posts yet.</p>
            ) : (
              <div className="space-y-3">
                {recentPosts.map((post) => (
                  <div key={post.slug} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {recentMessages.length === 0 ? (
              <p className="text-muted-foreground text-sm">No messages yet.</p>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((msg, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{msg.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{msg.subject}</p>
                    </div>
                    {!msg.is_read && (
                      <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
