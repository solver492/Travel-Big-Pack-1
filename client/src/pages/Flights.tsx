import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchWidget } from "@/components/SearchWidget";
import { useFlightsSearch } from "@/hooks/use-flights";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Loader2, Plane } from "lucide-react";

export default function Flights() {
  const { data: flights, isLoading, error } = useFlightsSearch({ origin: "New York" }); // Mock default search

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Mini Hero */}
      <div className="bg-primary pt-32 pb-20 px-4">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Find Cheap Flights</h1>
          <p className="text-white/70 max-w-xl mx-auto">Compare airline prices and book the best flight deals today.</p>
        </div>
      </div>
      
      <div className="-mt-12 mb-12 relative z-20">
        <SearchWidget defaultTab="flights" />
      </div>

      <div className="container-custom pb-24 flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-secondary mb-4" />
            <p className="text-muted-foreground">Searching for the best flights...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">Failed to load flights. Please try again.</div>
        ) : !flights || flights.length === 0 ? (
          // Empty State / Demo Data
          <div className="space-y-8">
            <h2 className="text-2xl font-bold font-display text-primary">Popular Flights Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ServiceCard
                  key={i}
                  id={i}
                  type="flight"
                  title={`Flight to Destination ${i}`}
                  subtitle="Multiple Airlines"
                  price={150 * i}
                  rating={4.5}
                  image={`https://images.unsplash.com/photo-1542296332-2e44a4037213?w=800&q=80`}
                  badges={i % 2 === 0 ? ["Direct", "Best Value"] : ["Deal"]}
                  details={[
                    { label: "Duration", value: "5h 30m", icon: Plane },
                    { label: "Stops", value: "Non-stop", icon: Plane }
                  ]}
                  actionLabel="Select Flight"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {flights.map(flight => (
                <ServiceCard
                  key={flight.id}
                  id={flight.id}
                  type="flight"
                  title={`${flight.airline} to ${flight.destination}`}
                  subtitle={`From ${flight.origin}`}
                  price={flight.price}
                  details={[
                    { label: "Duration", value: flight.duration, icon: Plane },
                    { label: "Stops", value: flight.stops === 0 ? "Direct" : `${flight.stops} stops`, icon: Plane }
                  ]}
                  actionLabel="Book Now"
                />
             ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
