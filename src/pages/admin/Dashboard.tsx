import { useEffect, useState } from "react";
import { FileText, Mail, MailOpen, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({ posts: 0, submissions: 0, unread: 0 });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  // analytics data for charts - initialize with fallback data
  const [trafficSources, setTrafficSources] = useState<{ name: string; value: number }[]>([
    { name: "Google", value: 4900 },
    { name: "Social", value: 2600 },
    { name: "Direct", value: 1400 },
    { name: "Referral", value: 500 },
  ]);
  const [countryTimes, setCountryTimes] = useState<{ country: string; time: number }[]>([
    { country: "Nigeria", time: 5.2 },
    { country: "USA", time: 4.8 },
    { country: "UK", time: 4.1 },
    { country: "India", time: 3.9 },
  ]);

  useEffect(() => {
    fetchData();

    // Set up real-time subscriptions
    const blogsSubscription = supabase
      .channel("blog_posts_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_posts",
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    const messagesSubscription = supabase
      .channel("contact_submissions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contact_submissions",
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      blogsSubscription.unsubscribe();
      messagesSubscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    try {
      // Fetch blog posts count and recent posts
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

      // load analytics (if table exists) or use defaults
      try {
        const { data: analytics } = await (supabase.from("analytics" as any).select("source, count, country, avg_time") as any);
        if (analytics && analytics.length) {
          // group by source and country
          const bySource: Record<string, number> = {};
          const byCountry: Record<string, number> = {};
          analytics.forEach((row: any) => {
            if (row.source) bySource[row.source] = (bySource[row.source] || 0) + row.count;
            if (row.country) byCountry[row.country] = row.avg_time; // assume one per country
          });
          setTrafficSources(Object.entries(bySource).map(([name, value]) => ({ name, value })));
          setCountryTimes(Object.entries(byCountry).map(([country, time]) => ({ country, time })));  // fixed parentheses
        }
      } catch (e) {
        // no analytics table - keep fallback data already set
        console.log("Analytics table not found, using fallback data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

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

      {/* Charts for analytics */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div style={{ width: "100%", height: "350px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSources.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => value.toString()} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Avg Time by Country (mins)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div style={{ width: "100%", height: "350px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={countryTimes}
                  margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="time" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
