import { useState, type FormEvent } from "react";
import { useRegistration } from "@/features/auth/useRegistration";
import { type ParsedError } from "@/lib/parseLaravelError";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "@tanstack/react-router";

export function RegisterForm() {
    const [values, setValues] = useState({ nome: "", cognome: "", email: "", password: "", password_confirmation: "", privacy: "" });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string | null>(null);

    const navigate = useNavigate({ from: "/" });
    const { mutate, isPending } = useRegistration(1000);

    function onSubmit(ev: FormEvent) {
        ev.preventDefault();
        // pulisci errori precedenti, poi invia
        setFormError(null);
        setFieldErrors({});

        mutate(values, {
            onSuccess: () => {
                navigate({ to: "/dashboard" });
            },
            onError: (err) => {
                const { formMessage, fields } = err as ParsedError;
                if (formMessage) setFormError(formMessage);
                setFieldErrors(fields);

                values.password = "";
                values.password_confirmation = "";
            },
        });
    }

    return (
        <div>
            {/* FormError generico */}
            {formError && (
                <div
                    role="alert"
                    className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {formError}
                </div>
            )}

            <form
                onSubmit={onSubmit}
                noValidate>
                <div className="space-y-8">
                    <div className="space-y-3">
                        <Input
                            id="nome"
                            label="Nome"
                            value={values.nome}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, nome: e.target.value }))}
                            placeholder="Il tuo nome"
                            aria-invalid={Boolean(fieldErrors.nome) || undefined}
                            aria-describedby={fieldErrors.nome ? "password-error" : undefined}
                            error={fieldErrors.nome}
                        />
                    </div>
                    <div className="space-y-3">
                        <Input
                            id="cognome"
                            label="Cognome"
                            value={values.cognome}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, cognome: e.target.value }))}
                            placeholder="Il tuo cognome"
                            aria-invalid={Boolean(fieldErrors.cognome) || undefined}
                            aria-describedby={fieldErrors.cognome ? "cognome-error" : undefined}
                            error={fieldErrors.cognome}
                        />
                    </div>
                    <div className="space-y-3">
                        <Input
                            id="email-reg"
                            type="email"
                            label="Email"
                            value={values.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, email: e.target.value }))}
                            placeholder="Inserisci la tua email"
                            aria-invalid={Boolean(fieldErrors.email) || undefined}
                            aria-describedby={fieldErrors.email ? "email-error" : undefined}
                            error={fieldErrors.email}
                        />
                    </div>
                    <div className="space-y-3">
                        <Input
                            id="password-reg"
                            type="password"
                            label="Password"
                            value={values.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, password: e.target.value }))}
                            placeholder="Inserisci la tua password"
                            aria-invalid={Boolean(fieldErrors.password) || undefined}
                            aria-describedby={fieldErrors.password ? "password-error" : undefined}
                            error={fieldErrors.password}
                        />
                    </div>
                    <div className="space-y-3">
                        <Input
                            id="password_confirmation"
                            type="password"
                            label="Conferma password"
                            value={values.password_confirmation}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, password_confirmation: e.target.value }))}
                            placeholder="Conferma la password"
                            aria-invalid={Boolean(fieldErrors.password_confirmation) || undefined}
                            aria-describedby={fieldErrors.password_confirmation ? "password-error" : undefined}
                            error={fieldErrors.password_confirmation}
                        />
                    </div>

                    <Checkbox
                        id="privacy"
                        label='Accettando, confermi di aver letto e compreso la nostra <a href="#" class="text-primary">
                            informativa sulla Privacy
                        </a>
                        . I tuoi dati saranno trattati in modo sicuro e riservato.'
                        onChange={(e) => setValues((s) => ({ ...s, privacy: e.target.checked ? "1" : "" }))}
                        error={fieldErrors.privacy}
                    />
                </div>

                <Button
                    size="lg"
                    type="submit"
                    variant="secondary"
                    disabled={isPending}
                    loading={isPending}
                    className="w-full my-6">
                    Registrati
                </Button>
            </form>
        </div>
    );
}
