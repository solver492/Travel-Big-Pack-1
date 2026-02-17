import { pgTable, text, serial, integer, boolean, timestamp, jsonb, date, real, doublePrecision } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export * from "./models/auth";

// === FLIGHTS ===
export const flights = pgTable("flights", {
  id: serial("id").primaryKey(),
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departureDate: timestamp("departure_date").notNull(),
  returnDate: timestamp("return_date"),
  airline: text("airline").notNull(),
  flightNumber: text("flight_number").notNull(),
  price: doublePrecision("price").notNull(),
  duration: text("duration").notNull(),
  stops: integer("stops").default(0),
  cabinClass: text("cabin_class").default("Economy"),
});

// === HOTELS ===
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  pricePerNight: doublePrecision("price_per_night").notNull(),
  rating: real("rating").default(0),
  imageUrl: text("image_url"),
  amenities: jsonb("amenities").$type<string[]>(),
});

// === ACTIVITIES ===
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  rating: real("rating").default(0),
  imageUrl: text("image_url"),
  category: text("category"),
  duration: text("duration"),
});

// === CAR RENTALS ===
export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  model: text("model").notNull(),
  brand: text("brand").notNull(),
  type: text("type").notNull(), // Economy, SUV, etc.
  transmission: text("transmission").notNull(),
  pricePerDay: doublePrecision("price_per_day").notNull(),
  imageUrl: text("image_url"),
  location: text("location").notNull(),
});

// === TRAINS & BUSES ===
export const transport = pgTable("transport", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // train, bus
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  departureTime: timestamp("departure_time").notNull(),
  price: doublePrecision("price").notNull(),
  operator: text("operator").notNull(),
});

// === BOOKINGS ===
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(), // flight, hotel, activity, car, transport
  itemId: integer("item_id").notNull(),
  status: text("status").default("confirmed"),
  bookingDate: timestamp("booking_date").defaultNow(),
  details: jsonb("details"),
  totalPrice: doublePrecision("total_price").notNull(),
});

// === SCHEMAS ===
export const insertFlightSchema = createInsertSchema(flights).omit({ id: true });
export const insertHotelSchema = createInsertSchema(hotels).omit({ id: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true });
export const insertCarSchema = createInsertSchema(cars).omit({ id: true });
export const insertTransportSchema = createInsertSchema(transport).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, bookingDate: true });

// === TYPES ===
export type Flight = typeof flights.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type Car = typeof cars.$inferSelect;
export type Transport = typeof transport.$inferSelect;
export type Booking = typeof bookings.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
