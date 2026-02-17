import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { useHotelsSearch } from "@/hooks/use-hotels";
import { ServiceCard } from "@/components/ServiceCard";
import { Loader2, MapPin, Star } from "lucide-react";

export default function Hotels() {
  const { data: hotels, isLoading, error } = useHotelsSearch({ location: "Paris" }); 

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-primary pt-32 pb-20 px-4">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Book Best Hotels</h1>
          <p className="text-white/70 max-w-xl mx-auto">Discover luxury resorts, cozy airbnbs, and comfortable stays worldwide.</p>
        </div>
      </div>
      
      <div className="-mt-12 mb-12 relative z-20">
        <SearchWidget defaultTab="hotels" />
      </div>

      <div className="container-custom pb-24 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-secondary mb-4" />
            <p className="text-muted-foreground">Finding perfect stays...</p>
          </div>
        ) : error ? (
           <div className="text-center py-20 text-red-500">Failed to load hotels.</div>
        ) : !hotels || hotels.length === 0 ? (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold font-display text-primary">Trending Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
                "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
              ].map((img, i) => (
                <ServiceCard
                  key={i}
                  id={i}
                  type="hotel"
                  title={`Grand Hotel ${i+1}`}
                  subtitle="City Center, Paris"
                  price={250 + (i*50)}
                  rating={4.8}
                  image={img}
                  badges={i === 0 ? ["Luxury", "Spa"] : []}
                  details={[
                    { label: "Rating", value: "Excellent", icon: Star }
                  ]}
                  actionLabel="View Rooms"
                />
              ))}
            </div>
          </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {hotels.map(hotel => (
               <ServiceCard
                 key={hotel.id}
                 id={hotel.id}
                 type="hotel"
                 title={hotel.name}
                 subtitle={hotel.location}
                 price={hotel.pricePerNight}
                 rating={hotel.rating || 0}
                 image={hotel.imageUrl || undefined}
                 actionLabel="View Details"
               />
             ))}
           </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
