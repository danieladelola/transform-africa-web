import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Login = () => {
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
    </div>
  );

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      toast.success("Welcome back!");
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="MNSS" className="h-12 brightness-0 invert mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
          <p className="text-primary-foreground/60 text-sm mt-1">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 shadow-2xl space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mnssconsulting.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-gold text-foreground hover:bg-gold-dark font-semibold"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
