import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Upload, X, ImageIcon } from "lucide-react";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    author: "MNSS Team",
    image_url: "",
    content: "",
    status: "draft" as "draft" | "published",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            category: data.category,
            date: data.date,
            author: data.author,
            image_url: data.image_url || "",
            content: data.content,
            status: data.status as "draft" | "published",
          });
          if (data.image_url) setPreviewUrl(data.image_url);
        }
      });
    }
  }, [id]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({ ...f, title, slug: isNew ? generateSlug(title) : f.slug }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setForm((f) => ({ ...f, image_url: publicUrl }));
      setPreviewUrl(publicUrl);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setForm((f) => ({ ...f, image_url: "" }));
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        const { error } = await supabase.from("blog_posts").insert(form);
        if (error) throw error;
        toast.success("Post created!");
      } else {
        const { error } = await supabase.from("blog_posts").update(form).eq("id", id);
        if (error) throw error;
        toast.success("Post updated!");
      }
      navigate("/admin/blog");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <Button variant="ghost" onClick={() => navigate("/admin/blog")} className="text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog Manager
      </Button>

      <h1 className="text-2xl font-bold text-foreground">
        {isNew ? "New Blog Post" : "Edit Blog Post"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Category</Label>
            <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Author</Label>
          <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required className="max-w-sm" />
        </div>

        {/* Cover Image Upload */}
        <div className="space-y-3">
          <Label>Cover Image</Label>
          {previewUrl ? (
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img src={previewUrl} alt="Cover preview" className="w-full h-48 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-gold/50 hover:bg-muted/50 transition-colors"
            >
              <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground font-medium">
                {uploading ? "Uploading..." : "Click to upload cover image"}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPG, WEBP up to 5MB</p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {previewUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Replace Image"}
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label>Excerpt</Label>
          <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} required />
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={15} required className="font-mono text-sm" />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={form.status === "published"}
            onCheckedChange={(checked) => setForm({ ...form, status: checked ? "published" : "draft" })}
          />
          <Label>{form.status === "published" ? "Published" : "Draft"}</Label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={saving} className="bg-gold text-foreground hover:bg-gold-dark font-semibold">
            {saving ? "Saving..." : isNew ? "Create Post" : "Update Post"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate("/admin/blog")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
