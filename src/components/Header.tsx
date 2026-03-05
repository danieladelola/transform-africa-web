import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "All Services", path: "/services" },
      { label: "Industries", path: "/industries" },
      { label: "Our Approach", path: "/approach" },
    ],
  },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [location]);

  const solid = !isHome || scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${solid ? "bg-navy shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="MNSS Consulting" className="h-10 brightness-0 invert" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.path} className="relative group">
                <button
                  className={`text-sm font-medium tracking-wide uppercase transition-colors flex items-center gap-1 ${
                    ["/services", "/industries", "/approach"].includes(location.pathname)
                      ? "text-gold"
                      : "text-primary-foreground/90 hover:text-gold"
                  }`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                >
                  {link.label} <ChevronDown className="h-3 w-3" />
                </button>
                <div
                  className={`absolute top-full left-0 mt-2 bg-navy rounded-lg shadow-xl border border-primary-foreground/10 min-w-[180px] transition-all duration-200 ${
                    dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className="block px-4 py-3 text-sm text-primary-foreground/80 hover:text-gold hover:bg-primary-foreground/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  location.pathname === link.path ? "text-gold" : "text-primary-foreground/90 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-primary-foreground" aria-label="Toggle menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-primary-foreground/10">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.path}>
                  <span className="text-sm font-medium uppercase tracking-wide text-primary-foreground/60">{link.label}</span>
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    {link.children.map((child) => (
                      <Link key={child.path} to={child.path}
                        className={`text-sm font-medium uppercase tracking-wide ${location.pathname === child.path ? "text-gold" : "text-primary-foreground/90 hover:text-gold"}`}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={link.path} to={link.path}
                  className={`text-sm font-medium uppercase tracking-wide ${location.pathname === link.path ? "text-gold" : "text-primary-foreground/90 hover:text-gold"}`}>
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
