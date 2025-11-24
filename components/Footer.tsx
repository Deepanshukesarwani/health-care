import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "/#features" },
      { label: "Doctors", href: "/#doctors" },
      { label: "Pricing", href: "/#pricing" },
    ],
    company: [
      { label: "About Us", href: "/#about" },
      { label: "Careers", href: "/#careers" },
      { label: "Contact", href: "/#contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/#privacy" },
      { label: "Terms of Service", href: "/#terms" },
      { label: "Cookie Policy", href: "/#cookies" },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary rounded-lg p-2">
                <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="font-bold text-xl text-foreground">HealthCare+</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Making quality healthcare accessible to everyone, everywhere.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} HealthCare+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;