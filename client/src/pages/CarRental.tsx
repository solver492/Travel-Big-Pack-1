import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Search, MapPin, Calendar, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { api } from "@shared/routes";

export default function CarRental() {
  const [location, setLocation] = useState("");
  const { data: cars, isLoading, refetch } = useQuery({
    queryKey: ["/api/cars/search", location],
    queryFn: async () => {
      const res = await fetch(`/api/cars/search?location=${location}`);
      return res.json();
    },
    enabled: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary py-20 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Freedom to Roam</h1>
            <p className="text-xl opacity-90 mb-8 text-white/80">World-class car rentals at guaranteed best prices.</p>
            
            <Card className="bg-white text-primary max-w-4xl">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="location">Pick-up Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="location" 
                        placeholder="City or Airport" 
                        className="pl-9"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dates">Pick-up Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="dates" type="date" className="pl-9" />
                    </div>
                  </div>
                  <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-11">
                    <Search className="w-4 h-4 mr-2" /> Find Cars
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-10">Searching for available cars...</div>
          ) : cars && cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car: any) => (
                <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{car.brand} {car.model}</CardTitle>
                        <p className="text-muted-foreground">{car.type} • {car.transmission}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary">${car.pricePerDay}</span>
                        <p className="text-xs text-muted-foreground">per day</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-primary text-white">Book Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-3xl">
              <Car className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
              <h3 className="text-xl font-medium">No cars found</h3>
              <p className="text-muted-foreground">Try searching for a different location like "Rome".</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
