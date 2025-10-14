import { createRootRouteWithContext, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { AuthProvider } from "@/features/auth";

type RouterContext = {
    queryClient: QueryClient;
};

// --- Contenuto che usa il context ---
function RootLayoutInner() {
    const { isAuthenticated, logout /*, isLoading*/ } = useAuth();
    // if (isLoading) return null;

    return (
        <div className="min-h-dvh text-slate-900 antialiased">
            <header className="border-b bg-white">
                <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
                    <Logo />
                    <div className="ml-auto flex items-center gap-3">
                        {isAuthenticated ? <NavLink to="/dashboard">Dashboard</NavLink> : <NavLink to="/">Home</NavLink>}
                        <NavLink to="/about">About</NavLink>
                        <NavLink to="/posts">Posts</NavLink>
                        {isAuthenticated && (
                            <>
                                <button
                                    onClick={logout}
                                    className="px-2 py-1 text-slate-700 hover:text-red-600 font-medium">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="mx-auto max-w-7xl">
                <Outlet />
            </main>

            <TanStackRouterDevtools position="bottom-right" />
        </div>
    );
}

// --- Guscio che fornisce il provider ---
function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutInner />
        </AuthProvider>
    );
}

function Logo() {
    return (
        <div className="font-semibold tracking-tight">
            <span className="rounded bg-cyan-500 px-2 py-1 text-white">RVT</span> <span className="hidden sm:inline">React + Vite + TS</span>
        </div>
    );
}

function NavLink(props: { to: string; children: React.ReactNode }) {
    return (
        <Link
            to={props.to}
            activeProps={{ className: "active" }}
            className="px-2 py-1 text-slate-700 hover:text-slate-900 [&.active]:font-semibold [&.active]:text-cyan-700">
            {props.children}
        </Link>
    );
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
});
