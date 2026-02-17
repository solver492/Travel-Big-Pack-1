import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Globe, Shield, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary/30 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          {/* landing page hero scenic mountain landscape */}
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" 
            alt="Beautiful landscape" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container-custom text-center text-white space-y-6 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight hero-text-shadow"
          >
            Discover Your Next <br/>
            <span className="text-secondary">Big Adventure</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
          >
            Explore the world with Travel Big Pack. Best deals on flights, hotels, and holiday packages tailored just for you.
          </motion.p>
        </div>
      </section>

      {/* Search Widget Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <SearchWidget />
      </motion.div>

      {/* Popular Destinations */}
      <section className="py-24 bg-background">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-wider text-sm uppercase">Top Destinations</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mt-2">Popular Places</h2>
            </div>
            <Link href="/packages">
              <Button variant="outline" className="hidden md:flex gap-2 rounded-full border-primary/20 hover:border-primary">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", price: 899 },
              { name: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800", price: 1250 },
              { name: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800", price: 1499 },
              { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", price: 799 },
            ].map((place, idx) => (
              <motion.div 
                key={place.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-xl"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                  <h3 className="text-2xl font-bold font-display">{place.name}</h3>
                  <div className="flex justify-between items-center mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-sm font-medium bg-secondary px-2 py-1 rounded text-primary-foreground">From ${place.price}</span>
                    <ArrowRight className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">Why Travel With Us?</h2>
            <p className="text-muted-foreground text-lg">We provide the best travel experience with full support, best prices, and exclusive deals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "World Class Service", desc: "Access to over 1000+ destinations worldwide with premium support." },
              { icon: Shield, title: "Best Price Guarantee", desc: "We ensure you get the best competitive prices for all your bookings." },
              { icon: CreditCard, title: "Secure Payments", desc: "100% secure payment gateways with multiple options for your convenience." },
            ].map((feature, idx) => (
              <div key={idx} className="bg-background p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="container-custom">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Subscribe To Our Newsletter</h2>
              <p className="text-white/80 mb-8 text-lg">Get the latest updates, exclusive offers, and travel tips delivered straight to your inbox.</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 backdrop-blur-sm"
                />
                <Button className="px-8 py-4 rounded-full bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg h-auto">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
