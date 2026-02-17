import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, User, LogOut, Briefcase, 
  Plane, Hotel, Car, Train, Ship, MapPin, 
  Wifi, Package, LayoutDashboard
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/vols", label: "Flights", icon: Plane },
    { href: "/hotels", label: "Hotels", icon: Hotel },
    { href: "/location-voitures", label: "Cars", icon: Car },
    { href: "/packages", label: "Packages", icon: Package },
    { href: "/tours-activites", label: "Activities", icon: MapPin },
  ];

  const moreLinks = [
    { href: "/trains-bus", label: "Trains & Bus", icon: Train },
    { href: "/croisieres", label: "Cruises", icon: Ship },
    { href: "/transferts", label: "Transfers", icon: Car },
    { href: "/esim", label: "eSIM", icon: Wifi },
    { href: "/assurance", label: "Insurance", icon: Briefcase },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ? "bg-primary/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Plane className="text-white w-6 h-6 transform -rotate-45" />
          </div>
          <span className={`text-2xl font-display font-bold tracking-tight ${scrolled || !isHome ? "text-white" : "text-white"}`}>
            Travel<span className="text-secondary">BigPack</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
                ${location === link.href 
                  ? "bg-secondary text-primary-foreground font-bold" 
                  : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </div>
            </Link>
          ))}
          
          <DropdownMenu>
            <DropdownMenuTrigger className="px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors focus:outline-none">
              More
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-xl border-white/20">
              {moreLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <link.icon className="w-4 h-4 text-primary" />
                    {link.label}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/20 hover:bg-white/10">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.profileImageUrl || ""} alt={user.firstName || "User"} />
                    <AvatarFallback className="bg-secondary text-white">
                      {user.firstName?.charAt(0) || <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard">
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-red-600 cursor-pointer gap-2">
                  <LogOut className="w-4 h-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <a href="/api/login">
              <Button className="bg-secondary hover:bg-secondary/90 text-primary-foreground font-semibold rounded-full px-6 shadow-lg shadow-secondary/20">
                Sign In
              </Button>
            </a>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-2">
              {[...navLinks, ...moreLinks].map((link) => (
                <Link key={link.href} href={link.href}>
                  <div 
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${
                      location === link.href 
                        ? "bg-secondary text-white" 
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </div>
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              {user ? (
                <>
                  <Link href="/dashboard">
                    <div className="px-4 py-3 text-white/80 hover:bg-white/10 rounded-xl flex items-center gap-3">
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </div>
                  </Link>
                  <button 
                    onClick={() => logout()}
                    className="px-4 py-3 text-red-400 hover:bg-white/10 rounded-xl flex items-center gap-3 w-full text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <a href="/api/login" className="px-4 py-3 bg-secondary text-white rounded-xl text-center font-bold shadow-lg mt-2">
                  Sign In
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
