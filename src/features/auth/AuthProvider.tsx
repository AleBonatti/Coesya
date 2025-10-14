import { useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { AuthContext, type AuthContextValue } from "./AuthContext";
import { getToken, setToken, clearToken } from "@/lib/api";
import { meRequest, loginRequest, logoutRequest } from "./api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const qc = useQueryClient();
    const router = useRouter();

    const { data: user, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: meRequest,
        enabled: !!getToken(),
        staleTime: 60_000,
        retry: false,
    });

    const isAuthenticated = !!user;

    const login = useCallback(
        async ({ email, password }: { email: string; password: string }) => {
            const { token } = await loginRequest({ email, password });
            setToken(token);

            // 1) invalida eventuali cache
            await qc.invalidateQueries({ queryKey: ["me"] });

            // 2) ricarica forzatamente i dati utente (bypassa `enabled`)
            const fresh = await qc.fetchQuery({ queryKey: ["me"], queryFn: meRequest });

            // 3) ora la UI rilegge `user` => isAuthenticated diventa true
            if (fresh) router.navigate({ to: "/dashboard" });
        },
        [qc, router]
    );

    const logout = useCallback(async () => {
        try {
            await logoutRequest().catch(() => {});
        } finally {
            clearToken();
            // azzera subito i dati della query `me` per forzare il rerender
            qc.setQueryData(["me"], null);
            // opzionale: rimuovi del tutto la query dalla cache
            qc.removeQueries({ queryKey: ["me"] });
            router.navigate({ to: "/" });
        }
    }, [qc, router]);

    const refresh = useCallback(async () => {
        if (!getToken()) return;
        await qc.invalidateQueries({ queryKey: ["me"] });
        await qc.fetchQuery({ queryKey: ["me"], queryFn: meRequest });
    }, [qc]);

    const value = useMemo<AuthContextValue>(() => ({ user: user ?? null, isAuthenticated, isLoading, login, logout, refresh }), [user, isAuthenticated, isLoading, login, logout, refresh]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
