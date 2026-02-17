import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Train, Bus, MapPin, Calendar, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Transport() {
  const [type, setType] = useState("train");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const { data: results, isLoading, refetch } = useQuery({
    queryKey: ["/api/transport/search", type, origin, destination],
    queryFn: async () => {
      const res = await fetch(`/api/transport/search?type=${type}&origin=${origin}&destination=${destination}`);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Way to Travel</h1>
            <p className="text-xl opacity-90 mb-8 text-white/80">Tickets for trains and buses worldwide at your fingertips.</p>
            
            <Card className="bg-white text-primary max-w-4xl">
              <CardContent className="p-6">
                <Tabs defaultValue="train" onValueChange={setType} className="w-full mb-6">
                  <TabsList className="grid w-full max-w-xs grid-cols-2">
                    <TabsTrigger value="train" className="flex gap-2"><Train className="w-4 h-4" /> Train</TabsTrigger>
                    <TabsTrigger value="bus" className="flex gap-2"><Bus className="w-4 h-4" /> Bus</TabsTrigger>
                  </TabsList>
                </Tabs>

                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="origin">From</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="origin" 
                        placeholder="Departure City" 
                        className="pl-9"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dest">To</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="dest" 
                        placeholder="Destination City" 
                        className="pl-9"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="date" type="date" className="pl-9" />
                    </div>
                  </div>
                  <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-primary font-bold h-11">
                    <Search className="w-4 h-4 mr-2" /> Search
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-10">Searching for schedules...</div>
          ) : results && results.length > 0 ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {results.map((item: any) => (
                <Card key={item.id} className="hover-elevate cursor-pointer">
                  <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="bg-primary/5 p-4 rounded-2xl text-primary">
                        {item.type === 'train' ? <Train className="w-8 h-8" /> : <Bus className="w-8 h-8" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-lg">{item.origin} → {item.destination}</span>
                          <span className="text-secondary font-bold">{item.operator}</span>
                        </div>
                        <p className="text-muted-foreground text-sm">Departure: {new Date(item.departureTime).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-center md:text-right border-t md:border-t-0 md:border-l pl-0 md:pl-6 pt-4 md:pt-0 w-full md:w-auto">
                      <div className="text-2xl font-bold text-primary mb-2">${item.price}</div>
                      <Button className="w-full md:w-auto">Select</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-3xl">
              <Train className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
              <h3 className="text-xl font-medium">No routes found</h3>
              <p className="text-muted-foreground">Try searching from "London" to "Paris".</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
