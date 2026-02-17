import { z } from 'zod';
import { insertBookingSchema, flights, hotels, activities, bookings, cars, transport } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  flights: {
    search: {
      method: 'GET' as const,
      path: '/api/flights/search' as const,
      input: z.object({
        origin: z.string().optional(),
        destination: z.string().optional(),
        date: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof flights.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/flights/:id' as const,
      responses: {
        200: z.custom<typeof flights.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  hotels: {
    search: {
      method: 'GET' as const,
      path: '/api/hotels/search' as const,
      input: z.object({
        location: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof hotels.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/hotels/:id' as const,
      responses: {
        200: z.custom<typeof hotels.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  activities: {
    search: {
      method: 'GET' as const,
      path: '/api/activities/search' as const,
      input: z.object({
        location: z.string().optional(),
        category: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof activities.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/activities/:id' as const,
      responses: {
        200: z.custom<typeof activities.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  cars: {
    search: {
      method: 'GET' as const,
      path: '/api/cars/search' as const,
      input: z.object({
        location: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof cars.$inferSelect>()),
      },
    },
  },
  transport: {
    search: {
      method: 'GET' as const,
      path: '/api/transport/search' as const,
      input: z.object({
        type: z.enum(['train', 'bus']).optional(),
        origin: z.string().optional(),
        destination: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof transport.$inferSelect>()),
      },
    },
  },
  bookings: {
    list: {
      method: 'GET' as const,
      path: '/api/bookings' as const,
      responses: {
        200: z.array(z.custom<typeof bookings.$inferSelect>()),
        401: errorSchemas.validation,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/bookings' as const,
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
