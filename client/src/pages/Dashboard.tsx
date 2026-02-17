import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/use-auth";
import { useBookings } from "@/hooks/use-bookings";
import { useLocation } from "wouter";
import { Loader2, Package, Calendar, MapPin, CreditCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      setLocation("/api/login");
    }
  }, [user, authLoading, setLocation]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Navbar />
      
      <div className="pt-24 pb-12 bg-primary">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-6 text-white">
            <img 
              src={user.profileImageUrl || "https://github.com/shadcn.png"} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-display font-bold">Welcome back, {user.firstName}!</h1>
              <p className="text-white/70">{user.email}</p>
            </div>
            <div className="md:ml-auto">
              <Button 
                onClick={() => logout()} 
                variant="destructive" 
                className="gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 flex-1">
        <h2 className="text-2xl font-bold font-display text-primary mb-6">My Bookings</h2>
        
        {bookingsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        ) : !bookings || bookings.length === 0 ? (
          <Card className="text-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold text-primary">No bookings yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Looks like you haven't booked any trips yet. Start exploring our packages!
              </p>
              <Button 
                className="mt-4 bg-secondary text-primary-foreground font-semibold"
                onClick={() => setLocation("/packages")}
              >
                Explore Packages
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-primary/5 p-6 flex flex-col justify-center items-center w-full md:w-48 text-center border-r border-border/50">
                    <span className="text-3xl font-bold text-primary">
                      {booking.bookingDate ? format(new Date(booking.bookingDate), "dd") : "--"}
                    </span>
                    <span className="text-sm font-bold uppercase text-muted-foreground">
                      {booking.bookingDate ? format(new Date(booking.bookingDate), "MMM yyyy") : "--"}
                    </span>
                    <span className={`mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary capitalize mb-2">
                          {booking.type} Booking #{booking.id}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Booked on {booking.bookingDate ? format(new Date(booking.bookingDate), "PP") : "Unknown"}
                          </div>
                          <div className="flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            Total: ${booking.totalPrice}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline">View Receipt</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
