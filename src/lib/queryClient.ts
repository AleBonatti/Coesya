import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000, // 30s: evita refetch troppo frequenti
            gcTime: 5 * 60_000, // 5 min di garbage collection
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
