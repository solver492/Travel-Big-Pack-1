import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Hotel, Car, Calendar as CalendarIcon, MapPin, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function SearchWidget({ defaultTab = "flights" }: { defaultTab?: string }) {
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full max-w-5xl mx-auto -mt-24 relative z-20 px-4">
      <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden rounded-2xl">
        <Tabs defaultValue={defaultTab} className="w-full">
          <div className="bg-primary/5 p-2 overflow-x-auto">
            <TabsList className="w-full justify-start md:justify-center h-auto bg-transparent gap-2">
              <TabsTrigger 
                value="flights" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-full px-6 py-3 gap-2 transition-all"
              >
                <Plane className="w-4 h-4" /> Flights
              </TabsTrigger>
              <TabsTrigger 
                value="hotels" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-full px-6 py-3 gap-2 transition-all"
              >
                <Hotel className="w-4 h-4" /> Hotels
              </TabsTrigger>
              <TabsTrigger 
                value="cars" 
                className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-full px-6 py-3 gap-2 transition-all"
              >
                <Car className="w-4 h-4" /> Rentals
              </TabsTrigger>
            </TabsList>
          </div>

          <CardContent className="p-6 md:p-8">
            <TabsContent value="flights" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <Label>From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City or Airport" className="pl-9 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City or Airport" className="pl-9 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Departure</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal rounded-xl",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold text-lg shadow-lg shadow-secondary/20">
                  Search Flights
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="hotels" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2 lg:col-span-2">
                  <Label>Destination</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City, Hotel, or Place" className="pl-9 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Check-in / Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-12 justify-start text-left font-normal rounded-xl",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select dates</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="h-12 rounded-xl bg-secondary hover:bg-secondary/90 text-primary-foreground font-bold text-lg shadow-lg shadow-secondary/20">
                  Find Hotels
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="cars" className="mt-0">
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                 <p className="text-muted-foreground">Find the best car rental deals worldwide.</p>
                 <Button variant="outline" className="h-12 px-8 rounded-xl border-2 hover:bg-accent/5 hover:border-accent hover:text-accent transition-all">
                    Coming Soon
                 </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
