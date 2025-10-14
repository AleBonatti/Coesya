import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/features/auth/guards";

export const Route = createFileRoute("/dashboard")({
    beforeLoad: async ({ context }) => {
        await requireAuth(context.queryClient);
    },
    component: Dashboard,
});

function Dashboard() {
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-[393px]">
                <div className="flex flex-col gap-6">
                    <div className="bg-muted rounded-xl overflow-hidden">
                        <div className="p-10">Dashboard A</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
