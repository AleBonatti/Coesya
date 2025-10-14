import { AxiosError } from "axios";
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
    } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 401) {
            throw new Error("Credenziali non validde");
        }
        throw error; //new Error(err.message || "Login failed");
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
