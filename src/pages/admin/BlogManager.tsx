import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", deleteId);
    if (error) {
      toast.error("Failed to delete post");
    } else {
      toast.success("Post deleted");
      fetchPosts();
    }
    setDeleteId(null);
  };

  const filteredPosts = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      String(p.title).toLowerCase().includes(q) ||
      String(p.category).toLowerCase().includes(q) ||
      String(p.date).toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage drafts and published posts — review and edit content.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="bg-primary-foreground/5 text-primary-foreground text-sm px-2 py-1 rounded-full">{posts.length}</span>
            {query && (
              <span className="ml-2 text-sm text-muted-foreground">Showing {filteredPosts.length}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-input border border-border rounded-md px-3 py-2 w-full sm:w-64">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, categories, dates..."
              className="bg-transparent outline-none w-full text-sm text-foreground"
            />
          </div>
          <Button asChild className="bg-gold text-foreground hover:bg-gold-dark">
            <Link to="/admin/blog/new"><Plus className="h-4 w-4 mr-2" /> New Post</Link>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-[300px]">
                  <div className="flex flex-col sm:block">
                    <span className="truncate block max-w-[300px]">{post.title}</span>
                    <span className={`text-xs mt-2 sm:mt-0 px-2 py-1 rounded-full font-medium sm:hidden ${
                      post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{post.category}</TableCell>
                <TableCell className="hidden sm:table-cell">{post.date}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {post.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to={`/admin/blog/edit/${post.id}`}><Pencil className="h-4 w-4" /></Link>
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => setDeleteId(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No blog posts yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>

        {/* Mobile card list */}
        <div className="block sm:hidden p-4 space-y-3">
          {filteredPosts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">No blog posts yet.</div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 pr-3 min-w-0">
                    <h3 className="text-base font-semibold text-foreground truncate">{post.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="px-2 py-1 bg-muted/20 text-muted-foreground rounded-md">Category: <span className="text-foreground font-medium">{post.category}</span></span>
                      <span className="px-2 py-1 bg-muted/20 text-muted-foreground rounded-md">Date: <span className="text-foreground font-medium">{post.date}</span></span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2 text-right">
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                      post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>{post.status}</span>
                  </div>
                </div>
                <div className="mt-3 flex flex-col sm:flex-row items-center gap-2">
                  <Button asChild size="sm" className="bg-gold text-foreground w-full">
                    <Link to={`/admin/blog/edit/${post.id}`} className="w-full text-center py-2"><Pencil className="h-4 w-4 inline mr-2" />Edit</Link>
                  </Button>
                  <Button size="sm" variant="outline" className="text-destructive w-full sm:w-auto" onClick={() => setDeleteId(post.id)}>
                    <Trash2 className="h-4 w-4 mr-2 inline" /> Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this blog post?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogManager;
