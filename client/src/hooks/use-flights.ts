import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useFlightsSearch(params: { origin?: string; destination?: string; date?: string } = {}) {
  const queryKey = [api.flights.search.path, params];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      // Filter out undefined params
      const validParams: Record<string, string> = {};
      if (params.origin) validParams.origin = params.origin;
      if (params.destination) validParams.destination = params.destination;
      if (params.date) validParams.date = params.date;

      const queryString = new URLSearchParams(validParams).toString();
      const url = `${api.flights.search.path}?${queryString}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch flights");
      return api.flights.search.responses[200].parse(await res.json());
    },
    enabled: !!(params.origin || params.destination), // Only search if criteria provided
  });
}

export function useFlight(id: number) {
  return useQuery({
    queryKey: [api.flights.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.flights.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch flight");
      return api.flights.get.responses[200].parse(await res.json());
    },
  });
}
