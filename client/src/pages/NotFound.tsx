import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <MapPin className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-6xl font-display font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Lost in exploration?</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="gap-2 bg-secondary text-primary-foreground font-bold px-8 py-6 rounded-xl hover:bg-secondary/90 shadow-lg">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
