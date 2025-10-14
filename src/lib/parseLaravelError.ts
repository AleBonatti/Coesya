// src/lib/parseLaravelError.ts
import axios, { type AxiosError } from "axios";

export type FieldErrors = Record<string, string>;

export type ParsedError = {
    formMessage: string | null; // banner top-level
    fields: FieldErrors; // errori per campo (email, password, ...)
    status?: number;
};

// Payload tipico di Laravel 422
export type LaravelErrorPayload = {
    message?: string;
    errors?: Record<string, string[] | string>;
};

// Type guard: capiamo se un valore è LaravelErrorPayload
function isLaravelErrorPayload(x: unknown): x is LaravelErrorPayload {
    if (typeof x !== "object" || x === null) return false;
    const rec = x as Record<string, unknown>;
    const hasMessage = !("message" in rec) || typeof rec.message === "string";
    const hasErrors =
        !("errors" in rec) ||
        (typeof rec.errors === "object" &&
            rec.errors !== null &&
            // Verifica rapida chiave → array/string
            Object.values(rec.errors as Record<string, unknown>).every((v) => typeof v === "string" || (Array.isArray(v) && v.every((s) => typeof s === "string"))));
    return hasMessage && hasErrors;
}

export function parseLaravelError(e: unknown): ParsedError {
    // Default
    const base: ParsedError = { formMessage: null, fields: {}, status: undefined };

    // Caso Axios
    if (axios.isAxiosError(e)) {
        const err = e as AxiosError<unknown>; // data è “unknown”
        const status = err.response?.status;
        const payload = err.response?.data;

        let formMessage: string | null = null;
        const fields: FieldErrors = {};

        if (!formMessage && status === 403) {
            formMessage = "Dati di accessi non validi";
        } else if (isLaravelErrorPayload(payload)) {
            if (payload.errors) {
                for (const [key, val] of Object.entries(payload.errors)) {
                    if (Array.isArray(val)) {
                        // prendi il primo messaggio (o usa join(" ") se vuoi tutti)
                        fields[key] = val[0] ?? "";
                    } else if (typeof val === "string") {
                        fields[key] = val;
                    }
                }
            }
        }

        // ulteriore fallback: usa err.message se presente
        if (status !== 422 && !formMessage && typeof err.message === "string" && err.message.length > 0) {
            formMessage = err.message;
        }

        return { formMessage, fields, status };
    }

    // Non-Axios: Error standard
    if (e instanceof Error) {
        return { ...base, formMessage: e.message };
    }

    // Ultimo fallback: stringhe o sconosciuti
    if (typeof e === "string") {
        return { ...base, formMessage: e };
    }

    return base;
}
