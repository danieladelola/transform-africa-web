import { useState } from "react";
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Settings, LogOut, Mail, Menu, X } from "lucide-react";
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold" />
    </div>
  );

  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className={`min-h-screen flex bg-muted ${drawerOpen ? "overflow-hidden" : ""}`}>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-navy min-h-screen flex flex-col shrink-0">
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
                onClick={() => setDrawerOpen(false)}
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
        <header className="bg-card border-b border-border px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="md:hidden mr-2 p-2"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold text-foreground">
              {navItems.find((n) => n.path === location.pathname)?.label || "Admin"}
            </h2>
          </div>
          <span className="text-sm text-muted-foreground hidden md:inline">{user.email}</span>
        </header>
        <main className="flex-1 p-8">
          <Outlet />

      {/* Mobile drawer/backdrop */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
        </div>
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-navy p-6 z-50 transform transition-transform duration-200 ease-in-out md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center mb-4">
          <Link to="/" onClick={() => setDrawerOpen(false)}>
            <img src={logo} alt="MNSS" className="h-9 brightness-0 invert" />
          </Link>
          <button
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="ml-auto p-2 rounded hover:bg-primary-foreground/5"
          >
            <X className="h-5 w-5 text-primary-foreground/70" />
          </button>
        </div>
        <nav className="flex-1 space-y-1">
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
                onClick={() => setDrawerOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 border-t border-primary-foreground/10 pt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setDrawerOpen(false);
              signOut();
            }}
            className="w-full justify-start text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
