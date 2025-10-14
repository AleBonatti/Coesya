import { redirect, isRedirect } from "@tanstack/react-router";
import { getToken, clearToken } from "@/lib/api";
import { meRequest } from "@/features/auth/api";
import type { QueryClient } from "@tanstack/react-query";

export async function requireAuth(qc: QueryClient) {
    const token = getToken();
    if (!token) throw redirect({ to: "/" }); // niente token -> login

    try {
        await qc.ensureQueryData({ queryKey: ["me"], queryFn: meRequest });
    } catch (err) {
        clearToken();
        if (isRedirect(err)) throw err;
        throw redirect({ to: "/" }); // token invalido -> login
    }
}
