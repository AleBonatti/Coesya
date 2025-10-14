import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: () => (
        <section className="space-y-3">
            <h1 className="text-2xl font-bold">About</h1>
            <p className="text-slate-700">Setup base con Tailwind v4 (plugin Vite) e TanStack Router.</p>
        </section>
    ),
});
