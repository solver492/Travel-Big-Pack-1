import { Link } from "wouter";
import { Plane, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Plane className="text-white w-6 h-6 transform -rotate-45" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight text-white">
                Travel<span className="text-secondary">BigPack</span>
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed">
              Your ultimate travel companion. We help you discover the world's most beautiful destinations with ease and comfort.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold font-display mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { label: "Flights", href: "/vols" },
                { label: "Hotels", href: "/hotels" },
                { label: "Car Rental", href: "/location-voitures" },
                { label: "Holiday Packages", href: "/packages" },
                { label: "Travel Insurance", href: "/assurance" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-secondary transition-colors inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary/50"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold font-display mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-white/70 hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-white">Cookie Policy</Link></li>
              <li><Link href="#" className="text-white/70 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold font-display mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>123 Travel Street, Adventure City, AC 56789</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span>hello@travelbigpack.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; 2024 Travel Big Pack. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
