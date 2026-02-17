import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  id: number;
  type: "flight" | "hotel" | "activity";
  title: string;
  subtitle?: string;
  price: number;
  rating?: number;
  image?: string;
  badges?: string[];
  details?: { label: string; value: string; icon?: any }[];
  actionLabel?: string;
}

export function ServiceCard({ 
  id, type, title, subtitle, price, rating, image, badges, details, actionLabel = "View Details" 
}: ServiceCardProps) {
  
  const linkHref = `/${type}s/${id}`; // Simplified link logic

  return (
    <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <img 
          src={image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {badges && (
          <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
            {badges.map(b => (
              <Badge key={b} className="bg-white/90 text-primary hover:bg-white backdrop-blur-md shadow-sm">
                {b}
              </Badge>
            ))}
          </div>
        )}
        <div className="absolute bottom-3 left-3 z-20 text-white">
          <p className="text-2xl font-bold font-display">${price}<span className="text-sm font-normal opacity-80">/person</span></p>
        </div>
      </div>
      
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold font-display text-primary line-clamp-1">{title}</h3>
            {subtitle && <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {subtitle}</p>}
          </div>
          {rating && (
            <div className="flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-md">
              <Star className="w-3 h-3 text-secondary fill-current" />
              <span className="text-sm font-bold text-secondary-foreground">{rating}</span>
            </div>
          )}
        </div>

        {details && (
          <div className="mt-4 space-y-2 mb-6 flex-1">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                {detail.icon && <detail.icon className="w-4 h-4 text-accent" />}
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
        )}
        
        <Link href={linkHref}>
           <Button className="w-full mt-auto rounded-xl font-semibold group-hover:bg-primary group-hover:text-white transition-colors">
             {actionLabel}
           </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
