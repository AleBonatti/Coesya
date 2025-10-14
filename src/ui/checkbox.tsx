import * as React from "react";
import { cn } from "@/lib/cn";
import { Check, CircleAlert } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
}

/**
 * Componente Checkbox con label opzionale e messaggio di errore.
 * Stile coerente con gli altri controlli UI (Input, Button, ecc.)
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ id, label, error, className, disabled, ...props }, ref) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor={id}
                className={cn("flex items-center gap-3 text-medium-gray text-sm font-medium cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed")}>
                {/* Box */}
                <span className={cn("relative flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors", "border-gray-300 bg-white focus-within:ring-2 focus-within:ring-[--color-brand] focus-within:ring-offset-2", "hover:border-gray-400", disabled && "pointer-events-none", error ? "border-primary" : "", className)}>
                    <input
                        ref={ref}
                        id={id}
                        type="checkbox"
                        disabled={disabled}
                        className="peer absolute inset-0 cursor-pointer opacity-0"
                        {...props}
                    />
                    <Check
                        className={cn("h-3.5 w-3.5 opacity-0 transition-opacity", "peer-checked:opacity-100")}
                        strokeWidth={3}
                        aria-hidden="true"
                    />
                </span>

                {/* Label text */}
                {label && (
                    <span
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                )}
            </label>

            {/* Messaggio di errore */}
            {error && (
                <div className="flex space-x-2">
                    <CircleAlert className="h-5 w-5 text-primary" />
                    <span className="text-sm text-primary font-semibold">{error}</span>
                </div>
            )}
        </div>
    );
});

Checkbox.displayName = "Checkbox";
