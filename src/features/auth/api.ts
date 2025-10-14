import axios, { AxiosError } from "axios";
import { api } from "@/lib/api";
import type { User } from "./types";

// Ottieni i dati utente correnti
export async function meRequest(): Promise<User> {
    try {
        const res = await api.get<User>("/me");
        return res.data;
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
            throw new Error("Unauthorized");
        }
        throw new Error(err.message || "Error fetching user");
    }
}

// Effettua il login e restituisce il token
export async function loginRequest(params: { email: string; password: string }): Promise<{ token: string }> {
    try {
        const res = await api.post<{ token: string }>("/login", params);
        return res.data;
    } catch (error: unknown) {
        // Mantieni l'errore Axios originale
        if (axios.isAxiosError(error)) {
            // opzionale: messaggio più chiaro per la UI
            if (error.response?.status === 401 || error.response?.status === 403) {
                error.message = "Dati di accesso non validi";
            }
            // Rilancia l'OGGETTO AxiosError, non crearne uno nuovo
            throw error;
        }

        // Fallback per errori non-Axios
        const err = error as Error;
        throw new Error(err?.message || "Login failed");
    }
}

// Effettua il logout (best effort)
export async function logoutRequest(): Promise<void> {
    try {
        await api.post("/logout");
    } catch (error) {
        const err = error as AxiosError;
        // Logout non critico: logga ma non interrompe il flusso
        console.warn("Logout failed:", err.response?.status || err.message);
    }
}
