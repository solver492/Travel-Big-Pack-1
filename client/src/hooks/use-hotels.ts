import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useHotelsSearch(params: { location?: string } = {}) {
  return useQuery({
    queryKey: [api.hotels.search.path, params],
    queryFn: async () => {
      const validParams: Record<string, string> = {};
      if (params.location) validParams.location = params.location;

      const queryString = new URLSearchParams(validParams).toString();
      const url = `${api.hotels.search.path}?${queryString}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch hotels");
      return api.hotels.search.responses[200].parse(await res.json());
    },
    enabled: !!params.location,
  });
}

export function useHotel(id: number) {
  return useQuery({
    queryKey: [api.hotels.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.hotels.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch hotel");
      return api.hotels.get.responses[200].parse(await res.json());
    },
  });
}
