import {
  users, type User, type InsertUser,
  flights, type Flight,
  hotels, type Hotel,
  activities, type Activity,
  bookings, type Booking, type InsertBooking,
  cars, type Car,
  transport, type Transport
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and } from "drizzle-orm";

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

  // Cars
  searchCars(location?: string): Promise<Car[]>;
  createCar(car: any): Promise<Car>;

  // Transport
  searchTransport(type?: string, origin?: string, destination?: string): Promise<Transport[]>;
  createTransport(transportItem: any): Promise<Transport>;

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

  async searchFlights(origin?: string, destination?: string, _date?: string): Promise<Flight[]> {
    const conditions = [];
    if (origin) conditions.push(like(flights.origin, `%${origin}%`));
    if (destination) conditions.push(like(flights.destination, `%${destination}%`));
    return await db.select().from(flights).where(conditions.length > 0 ? and(...conditions) : undefined);
  }

  async getFlight(id: number): Promise<Flight | undefined> {
    const [flight] = await db.select().from(flights).where(eq(flights.id, id));
    return flight;
  }

  async createFlight(flight: any): Promise<Flight> {
    const [newFlight] = await db.insert(flights).values(flight).returning();
    return newFlight;
  }

  async searchHotels(location?: string): Promise<Hotel[]> {
    if (location) return await db.select().from(hotels).where(like(hotels.location, `%${location}%`));
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

  async searchActivities(location?: string, category?: string): Promise<Activity[]> {
    const conditions = [];
    if (location) conditions.push(like(activities.location, `%${location}%`));
    if (category) conditions.push(eq(activities.category, category));
    return await db.select().from(activities).where(conditions.length > 0 ? and(...conditions) : undefined);
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    const [activity] = await db.select().from(activities).where(eq(activities.id, id));
    return activity;
  }

  async createActivity(activity: any): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activity).returning();
    return newActivity;
  }

  async searchCars(location?: string): Promise<Car[]> {
    if (location) return await db.select().from(cars).where(like(cars.location, `%${location}%`));
    return await db.select().from(cars);
  }

  async createCar(car: any): Promise<Car> {
    const [newCar] = await db.insert(cars).values(car).returning();
    return newCar;
  }

  async searchTransport(type?: string, origin?: string, destination?: string): Promise<Transport[]> {
    const conditions = [];
    if (type) conditions.push(eq(transport.type, type));
    if (origin) conditions.push(like(transport.origin, `%${origin}%`));
    if (destination) conditions.push(like(transport.destination, `%${destination}%`));
    return await db.select().from(transport).where(conditions.length > 0 ? and(...conditions) : undefined);
  }

  async createTransport(transportItem: any): Promise<Transport> {
    const [newTransport] = await db.insert(transport).values(transportItem).returning();
    return newTransport;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }
}

export const storage = new DatabaseStorage();
