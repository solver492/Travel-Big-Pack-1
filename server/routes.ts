import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // === Flights ===
  app.get(api.flights.search.path, async (req, res) => {
    const { origin, destination, date } = req.query as { origin?: string, destination?: string, date?: string };
    const flights = await storage.searchFlights(origin, destination, date);
    res.json(flights);
  });

  app.get(api.flights.get.path, async (req, res) => {
    const flight = await storage.getFlight(Number(req.params.id));
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  });

  // === Hotels ===
  app.get(api.hotels.search.path, async (req, res) => {
    const { location } = req.query as { location?: string };
    const hotels = await storage.searchHotels(location);
    res.json(hotels);
  });

  app.get(api.hotels.get.path, async (req, res) => {
    const hotel = await storage.getHotel(Number(req.params.id));
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  });

  // === Activities ===
  app.get(api.activities.search.path, async (req, res) => {
    const { location, category } = req.query as { location?: string, category?: string };
    const activities = await storage.searchActivities(location, category);
    res.json(activities);
  });

  app.get(api.activities.get.path, async (req, res) => {
    const activity = await storage.getActivity(Number(req.params.id));
    if (!activity) return res.status(404).json({ message: "Activity not found" });
    res.json(activity);
  });

  // === Cars ===
  app.get(api.cars.search.path, async (req, res) => {
    const { location } = req.query as { location?: string };
    const cars = await storage.searchCars(location);
    res.json(cars);
  });

  // === Transport ===
  app.get(api.transport.search.path, async (req, res) => {
    const { type, origin, destination } = req.query as { type?: string, origin?: string, destination?: string };
    const results = await storage.searchTransport(type, origin, destination);
    res.json(results);
  });

  // === Bookings ===
  app.get(api.bookings.list.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const userId = (req.user as any).claims.sub;
    const bookings = await storage.getBookingsByUser(userId);
    res.json(bookings);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingFlights = await storage.searchFlights();
  if (existingFlights.length === 0) {
    console.log("Seeding database...");
    
    // Seed Flights
    await storage.createFlight({
      origin: "Paris (CDG)",
      destination: "New York (JFK)",
      departureDate: new Date("2025-06-15T10:00:00Z"),
      returnDate: new Date("2025-06-25T18:00:00Z"),
      airline: "Air France",
      flightNumber: "AF006",
      price: 850,
      duration: "8h 30m",
      stops: 0,
      cabinClass: "Economy"
    });
    
    // Seed Hotels
    await storage.createHotel({
      name: "Grand Hotel Plaza",
      location: "Rome, Italy",
      description: "Historic hotel in the heart of Rome.",
      pricePerNight: 350,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
      amenities: ["WiFi", "Spa", "Restaurant"]
    });

    // Seed Activities
    await storage.createActivity({
      title: "Eiffel Tower Summit Tour",
      location: "Paris, France",
      description: "Skip-the-line access to the top of the Eiffel Tower.",
      price: 65,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?auto=format&fit=crop&q=80&w=1000",
      category: "Tour",
      duration: "3 hours"
    });

    // Seed Cars
    await storage.createCar({
      model: "Fiat 500",
      brand: "Fiat",
      type: "Economy",
      transmission: "Manual",
      pricePerDay: 45,
      imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
      location: "Rome, Italy"
    });

    // Seed Transport
    await storage.createTransport({
      type: "train",
      origin: "London",
      destination: "Paris",
      departureTime: new Date("2025-08-10T09:00:00Z"),
      price: 95,
      operator: "Eurostar"
    });
    
    console.log("Database seeded successfully.");
  }
}
