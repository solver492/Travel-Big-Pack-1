import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Shield, CreditCard, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 z-0" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">{title}</h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">{description}</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-full px-8">
                  Obtenir un Devis
                </Button>
                <Button variant="outline" className="rounded-full px-8 text-white border-white/20 hover:bg-white/10">
                  En Savoir Plus
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Pourquoi choisir notre service {title} ?</h2>
              <div className="space-y-4">
                {[
                  "Couverture mondiale dans plus de 200 pays",
                  "Support client dédié 24h/24 et 7j/7",
                  "Garantie du meilleur prix sans frais cachés",
                  "Confirmation instantanée et bons numériques"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070&auto=format&fit=crop" 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">Sécurisé & Fiable</p>
                    <p className="text-xs text-muted-foreground">Utilisé par 1M+ voyageurs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 border-none shadow-none bg-transparent">
                <Globe className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-2">Accès Mondial</h3>
                <p className="text-muted-foreground">Accédez à nos services partout dans le monde, 24h/24 et 7j/7.</p>
              </Card>
              <Card className="p-8 border-none shadow-none bg-transparent">
                <Shield className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-2">Protection Totale</h3>
                <p className="text-muted-foreground">Votre sécurité et la protection de vos données sont nos priorités.</p>
              </Card>
              <Card className="p-8 border-none shadow-none bg-transparent">
                <CreditCard className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-xl font-bold mb-2">Paiements Faciles</h3>
                <p className="text-muted-foreground">Options de paiement sécurisées et flexibles pour chaque voyageur.</p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
