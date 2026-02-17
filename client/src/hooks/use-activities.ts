import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useActivitiesSearch(params: { location?: string; category?: string } = {}) {
  return useQuery({
    queryKey: [api.activities.search.path, params],
    queryFn: async () => {
      const validParams: Record<string, string> = {};
      if (params.location) validParams.location = params.location;
      if (params.category) validParams.category = params.category;

      const queryString = new URLSearchParams(validParams).toString();
      const url = `${api.activities.search.path}?${queryString}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch activities");
      return api.activities.search.responses[200].parse(await res.json());
    },
    enabled: !!params.location,
  });
}

export function useActivity(id: number) {
  return useQuery({
    queryKey: [api.activities.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.activities.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch activity");
      return api.activities.get.responses[200].parse(await res.json());
    },
  });
}
