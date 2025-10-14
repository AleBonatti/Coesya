// src/lib/api.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://api.coesia.it.test/api";

// Token management — semplice wrapper su localStorage
const TOKEN_KEY = "auth_token";

export function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
}

// Axios instance (riutilizzabile ovunque)
export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
});

// Aggiunge automaticamente il token se presente
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

// 🔹 Response interceptor: intercetta errori 401
api.interceptors.response.use(
    (response) => response, // se va bene, passa il risultato
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Token scaduto o non valido. Ciao ciao.");
            clearToken();

            // Reindirizza solo se siamo in ambiente browser
            if (typeof window !== "undefined") {
                window.location.href = "/";
            }
        }

        // Rilancia comunque l'errore per eventuali gestioni locali
        return Promise.reject(error);
    }
);
