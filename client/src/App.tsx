import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/Home";
import Flights from "@/pages/Flights";
import Hotels from "@/pages/Hotels";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import PlaceholderPage from "@/pages/PlaceholderPage";
import CarRental from "@/pages/CarRental";
import Transport from "@/pages/Transport";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/vols" component={Flights} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/location-voitures" component={CarRental} />
      <Route path="/trains-bus" component={Transport} />
      
      {/* Informational Pages */}
      <Route path="/transferts">
        {() => <PlaceholderPage title="Airport Transfers" description="Seamless transfers from airport to hotel. Coming soon!" />}
      </Route>
      <Route path="/tours-activites">
        {() => <PlaceholderPage title="Tours & Activities" description="Unforgettable experiences tailored for you." />}
      </Route>
      <Route path="/croisieres">
        {() => <PlaceholderPage title="Cruises" description="Sail the seven seas in luxury and comfort." />}
      </Route>
      <Route path="/assurance">
        {() => <PlaceholderPage title="Travel Insurance" description="Stay protected wherever you go." />}
      </Route>
      <Route path="/esim">
        {() => <PlaceholderPage title="eSIM & Connectivity" description="Stay connected in over 200+ countries." />}
      </Route>
      <Route path="/packages">
        {() => <PlaceholderPage title="Holiday Packages" description="All-in-one travel packages for hassle-free vacations." />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
