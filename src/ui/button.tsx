import * as React from "react";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "white" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    fullWidth?: boolean;
};

const base = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary-darker",
    secondary: "bg-secondary text-white hover:bg-secondary-darker",
    white: "bg-white hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-14 px-5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "md", loading = false, fullWidth = false, children, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
            aria-busy={loading || undefined}
            {...props}>
            {/* Spinner semplice quando loading */}
            {loading ? (
                <Loader2
                    className="h-5 w-5 animate-spin"
                    aria-hidden
                />
            ) : (
                <span>{children}</span>
            )}
        </button>
    );
});
Button.displayName = "Button";
