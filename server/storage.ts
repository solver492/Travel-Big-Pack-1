import {
  users, type User, type InsertUser,
  flights, type Flight,
  hotels, type Hotel,
  activities, type Activity,
  bookings, type Booking, type InsertBooking
} from "@shared/schema";
import { db } from "./db";
import { eq, like, or, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Flights
  searchFlights(origin?: string, destination?: string, date?: string): Promise<Flight[]>;
  getFlight(id: number): Promise<Flight | undefined>;
  createFlight(flight: any): Promise<Flight>;

  // Hotels
  searchHotels(location?: string): Promise<Hotel[]>;
  getHotel(id: number): Promise<Hotel | undefined>;
  createHotel(hotel: any): Promise<Hotel>;

  // Activities
  searchActivities(location?: string, category?: string): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: any): Promise<Activity>;

  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Flights
  async searchFlights(origin?: string, destination?: string, date?: string): Promise<Flight[]> {
    const conditions = [];
    if (origin) conditions.push(like(flights.origin, `%${origin}%`));
    if (destination) conditions.push(like(flights.destination, `%${destination}%`));
    // Date filtering would be more complex in real app, simplified here
    
    if (conditions.length > 0) {
      return await db.select().from(flights).where(and(...conditions));
    }
    return await db.select().from(flights);
  }

  async getFlight(id: number): Promise<Flight | undefined> {
    const [flight] = await db.select().from(flights).where(eq(flights.id, id));
    return flight;
  }

  async createFlight(flight: any): Promise<Flight> {
    const [newFlight] = await db.insert(flights).values(flight).returning();
    return newFlight;
  }

  // Hotels
  async searchHotels(location?: string): Promise<Hotel[]> {
    if (location) {
      return await db.select().from(hotels).where(like(hotels.location, `%${location}%`));
    }
    return await db.select().from(hotels);
  }

  async getHotel(id: number): Promise<Hotel | undefined> {
    const [hotel] = await db.select().from(hotels).where(eq(hotels.id, id));
    return hotel;
  }

  async createHotel(hotel: any): Promise<Hotel> {
    const [newHotel] = await db.insert(hotels).values(hotel).returning();
    return newHotel;
  }

  // Activities
  async searchActivities(location?: string, category?: string): Promise<Activity[]> {
    const conditions = [];
    if (location) conditions.push(like(activities.location, `%${location}%`));
    if (category) conditions.push(eq(activities.category, category));

    if (conditions.length > 0) {
      return await db.select().from(activities).where(and(...conditions));
    }
    return await db.select().from(activities);
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    const [activity] = await db.select().from(activities).where(eq(activities.id, id));
    return activity;
  }

  async createActivity(activity: any): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activity).returning();
    return newActivity;
  }

  // Bookings
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }
}

export const storage = new DatabaseStorage();
