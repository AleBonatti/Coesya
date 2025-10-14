import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, setToken } from "@/lib/api";
import { parseLaravelError, type ParsedError } from "@/lib/parseLaravelError";

export type RegisterPayload = { nome: string; cognome: string; email: string; password: string; password_confirmation: string };
export type RegisterResponse = { token?: string; user?: unknown };

async function registerRequest(payload: RegisterPayload) {
    const { data } = await api.post<RegisterResponse>("/register", payload);
    return data;
}

export function useRegistration(delay?: number) {
    const qc = useQueryClient();

    return useMutation<RegisterResponse, ParsedError, RegisterPayload>({
        mutationKey: ["register"],
        mutationFn: async (payload) => {
            try {
                if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
                return await registerRequest(payload);
            } catch (e) {
                // Rilancia SEMPRE un ParsedError
                throw parseLaravelError(e);
            }
        },
        onSuccess: (data) => {
            if (data.token) setToken(data.token);
            qc.invalidateQueries({ queryKey: ["me"] });
        },
    });
}
