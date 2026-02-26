import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((s) => { map[s.key] = s.value; });
        setSettings(map);
      }
    });
  }, []);

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(settings)) {
        await supabase.from("site_settings").update({ value }).eq("key", key);
      }
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={settings.phone || ""} onChange={(e) => updateSetting("phone", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={settings.email || ""} onChange={(e) => updateSetting("email", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input value={settings.address || ""} onChange={(e) => updateSetting("address", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>LinkedIn URL</Label>
            <Input value={settings.linkedin || ""} onChange={(e) => updateSetting("linkedin", e.target.value)} placeholder="https://linkedin.com/company/..." />
          </div>
          <div className="space-y-2">
            <Label>Twitter/X URL</Label>
            <Input value={settings.twitter || ""} onChange={(e) => updateSetting("twitter", e.target.value)} placeholder="https://x.com/..." />
          </div>
          <div className="space-y-2">
            <Label>Instagram URL</Label>
            <Input value={settings.instagram || ""} onChange={(e) => updateSetting("instagram", e.target.value)} placeholder="https://instagram.com/..." />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="bg-gold text-foreground hover:bg-gold-dark font-semibold">
        {saving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
};

export default AdminSettings;
