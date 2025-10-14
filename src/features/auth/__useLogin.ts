import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, setToken } from "@/lib/api";
import { parseLaravelError, type ParsedError } from "@/lib/parseLaravelError";

export type LoginPayload = { email: string; password: string };
export type LoginResponse = { token?: string; user?: unknown };

async function loginRequest(payload: LoginPayload) {
    const { data } = await api.post<LoginResponse>("/login", payload);
    return data;
}

export function useLogin(delay?: number) {
    const qc = useQueryClient();

    return useMutation<LoginResponse, ParsedError, LoginPayload>({
        mutationKey: ["login"],
        mutationFn: async (payload) => {
            try {
                if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
                return await loginRequest(payload);
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
