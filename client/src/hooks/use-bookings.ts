import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertBooking } from "@shared/routes";

export function useBookings() {
  return useQuery({
    queryKey: [api.bookings.list.path],
    queryFn: async () => {
      const res = await fetch(api.bookings.list.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return api.bookings.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (booking: InsertBooking) => {
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        const error = await res.json();
        throw new Error(error.message || "Failed to create booking");
      }
      
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.bookings.list.path] });
    },
  });
}
