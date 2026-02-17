import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { Link } from "wouter";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
          <Construction className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl font-display font-bold text-primary mb-4">{title}</h1>
        <p className="text-muted-foreground max-w-lg mb-8 text-lg">{description}</p>
        <div className="flex gap-4">
          <Link href="/">
             <Button variant="outline">Go Home</Button>
          </Link>
          <Button className="bg-primary text-white">Notify Me When Ready</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
