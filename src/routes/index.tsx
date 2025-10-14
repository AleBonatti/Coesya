import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/cn";

//import type { QueryClient } from "@tanstack/react-query";
import { meRequest } from "@/features/auth/api";
import { getToken, clearToken } from "@/lib/api";

import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

type TabKey = "login" | "register";

export const Route = createFileRoute("/")({
    beforeLoad: async ({ context }) => {
        const token = getToken();
        if (!token) return;

        try {
            await context.queryClient.ensureQueryData({ queryKey: ["me"], queryFn: meRequest });
        } catch {
            clearToken();
            return;
        }

        throw redirect({ to: "/dashboard" });
    },
    component: Index,
});

function Index() {
    const [tab, setTab] = useState<TabKey>("login");

    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-[393px]">
                <div className="flex flex-col gap-6">
                    <div className="bg-muted rounded-xl overflow-hidden">
                        {/* Header */}
                        <div className="text-center space-y-10 pt-12">
                            <div className="text-center">
                                <img
                                    src="/Logo.svg"
                                    alt="Coesya"
                                    className="mx-auto  h-10 sm:h-12"
                                />
                            </div>
                            <div className="space-y-6">
                                <h1 className="text-xl text-center font-medium">Benvenuto in Coesya</h1>
                                <p className="text-sm">
                                    Sei pronto a semplificare la gestione familiare?
                                    <br />
                                    Accedi o crea un account e scopri come!
                                </p>
                            </div>
                            {/* Tabs */}
                            <div
                                role="tablist"
                                aria-label="Seleziona modalità accesso"
                                className="flex border-b border-gray-200">
                                <TabButton
                                    id="tab-login"
                                    active={tab === "login"}
                                    onClick={() => setTab("login")}>
                                    Accedi
                                </TabButton>

                                <TabButton
                                    id="tab-register"
                                    active={tab === "register"}
                                    onClick={() => setTab("register")}>
                                    Registrati
                                </TabButton>
                            </div>
                        </div>
                        <div className="bg-light-gray p-10 grid">
                            <div
                                id="panel-login"
                                role="tabpanel"
                                aria-labelledby="tab-login"
                                aria-hidden={tab !== "login"}
                                className={cn(
                                    "col-start-1 row-start-1", // sovrappone i pannelli
                                    "transition-opacity duration-300", // anima opacità
                                    tab === "login" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none" // niente click sul pannello nascosto
                                )}>
                                <LoginForm />
                            </div>

                            <div
                                id="panel-register"
                                role="tabpanel"
                                aria-labelledby="tab-register"
                                aria-hidden={tab !== "register"}
                                className={cn("col-start-1 row-start-1", "transition-opacity duration-300", tab === "register" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
                                <RegisterForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabButton({ id, active, onClick, children }: { id: string; active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            id={id}
            role="tab"
            tabIndex={active ? 0 : -1}
            onClick={onClick}
            className={cn(
                "w-1/2 px-3 py-3 text-sm sm:text-base font-medium",
                // baseline: bordo sempre presente per evitare shift
                "border-b-2",
                // stato
                active ? "text-primary border-primary font-semibold" : "text-medium-gray border-transparent",
                // focus elegante
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand] focus-visible:ring-offset-2"
            )}>
            <span className="inline-flex items-center justify-center gap-2">{children}</span>
        </button>
    );
}
