import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-navy-dark text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img src={logo} alt="MNSS" className="h-10 brightness-0 invert mb-4" />
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            Transforming Global Solutions with Local Expertise. Over 20 years of strategic consulting.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            {["Home", "About", "Services", "Blog", "Contact"].map((l) => (
              <Link
                key={l}
                to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
                className="text-primary-foreground/70 hover:text-gold text-sm transition-colors"
              >
                {l}
              </Link>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <li>International Development</li>
            <li>Project Management</li>
            <li>Business Advisory</li>
            <li>Value Chain Development</li>
            <li>App Development</li>
            <li>IT Consulting</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="flex flex-col gap-2 text-sm text-primary-foreground/70">
            <li>(+234) 814 546 2355</li>
            <li>contact@mnssconsulting.com</li>
            <li>Nigeria / Global</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
        ©2025 MNSS Consult LTD | Powered by MNSS Tech | Legal
      </div>
    </div>
  </footer>
);

export default Footer;
