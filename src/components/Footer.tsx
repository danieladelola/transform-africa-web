import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-navy-dark text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img src={logo} alt="MNSS" className="h-10 brightness-0 invert mb-4" />
          <p className="text-primary-foreground/60 text-sm leading-relaxed">
            Since 2013, MNSS Consulting has been transforming challenges into opportunities across Africa and emerging markets. We serve corporates, startups, MSMEs, development partners, DFIs, NGOs, and state governments with strategic consulting, market intelligence, and sustainable development solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
          <nav className="flex flex-col gap-3">
            {[
              { label: "Home", path: "/" },
              { label: "About Us", path: "/about" },
              { label: "Services", path: "/services" },
              { label: "Industries", path: "/industries" },
              { label: "Our Approach", path: "/approach" },
              { label: "Case Studies", path: "/case-studies" },
              { label: "Blog", path: "/blog" },
              { label: "Contact", path: "/contact" },
            ].map((l) => (
              <Link key={l.path} to={l.path} className="text-primary-foreground/60 hover:text-gold text-sm transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-5">Services</h4>
          <ul className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <li>Market Entry Strategy</li>
            <li>Organizational Development</li>
            <li>Financial Advisory</li>
            <li>Digital Transformation</li>
            <li>Public Sector Consulting</li>
            <li>Programme Design</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-5">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm text-primary-foreground/60">
            <li>(+234) 814 546 2355</li>
            <li>contact@mnssconsulting.com</li>
            <li>Lagos, Nigeria / Global</li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/5 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="LinkedIn"><Linkedin size={18} className="text-primary-foreground/60" /></a>
            <a href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/5 flex items-center justify-center hover:bg-gold/20 transition-colors" aria-label="Twitter"><Twitter size={18} className="text-primary-foreground/60" /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-14 pt-8 text-center text-xs text-primary-foreground/40">
        © 2024 MNSS Consulting Ltd. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
