import { useState, type FormEvent } from "react";

import { useAuth } from "@/features/auth";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { parseLaravelError } from "@/lib/parseLaravelError";

export function LoginForm() {
    const navigate = useNavigate({ from: "/" });
    const { login } = useAuth();

    const [values, setValues] = useState({ email: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    async function onSubmit(ev: FormEvent) {
        ev.preventDefault();
        setFormError(null);
        setFieldErrors({});
        setPending(true);

        try {
            await login(values); // fa setToken + fetchQuery(['me']) + navigate('/dashboard') se l’hai previsto lì
            navigate({ to: "/dashboard" }); // opzionale se non navighi già dentro login()
        } catch (e) {
            const parsed = parseLaravelError(e);
            //console.log(parsed);

            /* if (e instanceof Error) {
                setFormError(e.message);
            } else {
                setFormError("Login failed");
            } */
            if (parsed.formMessage) setFormError(parsed.formMessage);
            setFieldErrors(parsed.fields);

            /* const { formMessage, fields } = err as ParsedError;
                if (formMessage) setFormError(formMessage);
                setFieldErrors(fields); */

            // reset password
            setValues((s) => ({ ...s, password: "" }));
        } finally {
            setPending(false);
        }
    }

    return (
        <div>
            <div className="space-y-3">
                <Button
                    variant="white"
                    size="lg"
                    className="w-full">
                    <div className="flex gap-x-2 items-center">
                        <img
                            src="apple-black-logo-svgrepo-com.svg"
                            height={18}
                            width={18}
                        />
                        <span className="font-semibold">Accedi con Apple</span>
                    </div>
                </Button>
                <Button
                    variant="white"
                    size="lg"
                    className="w-full">
                    <div className="flex gap-x-2 items-center ">
                        <img
                            src="google-icon-logo-svgrepo-com.svg"
                            height={16}
                            width={16}
                        />
                        <span className="font-semibold">Accedi con Google</span>
                    </div>
                </Button>
            </div>

            <p className="text-sm py-10 text-center">oppure procedi tramite email</p>

            <form
                onSubmit={onSubmit}
                noValidate>
                {/* FormError generico */}
                {formError && (
                    <div
                        role="alert"
                        className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {formError}
                    </div>
                )}
                <div className="space-y-8">
                    <div className="space-y-3">
                        <Input
                            id="email"
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
                            id="password"
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
                    <a
                        href="#"
                        className="text-sm text-main!">
                        Password dimenticata?
                    </a>
                </div>
                <Button
                    size="lg"
                    type="submit"
                    disabled={pending}
                    loading={pending}
                    className="w-full my-6">
                    Accedi
                </Button>
            </form>
            <p className="text-sm">
                Accedendo, accetti la nostra{" "}
                <a
                    href="#"
                    className="text-primary">
                    informativa sulla privacy
                </a>
            </p>
        </div>
    );
}
