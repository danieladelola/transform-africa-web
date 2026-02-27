import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Blog Manager", path: "/admin/blog", icon: FileText },
  { label: "Messages", path: "/admin/messages", icon: Mail },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const { user, loading, signOut } = useAuth();
  const location = useLocation();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
    </div>
  );

  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className="w-64 bg-navy min-h-screen flex flex-col shrink-0">
        <div className="p-6 border-b border-primary-foreground/10">
          <Link to="/">
            <img src={logo} alt="MNSS" className="h-9 brightness-0 invert" />
          </Link>
          <p className="text-primary-foreground/50 text-xs mt-2">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-gold/20 text-gold"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <Button
            variant="ghost"
            onClick={signOut}
            className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-auto">
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            {navItems.find((n) => n.path === location.pathname)?.label || "Admin"}
          </h2>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
