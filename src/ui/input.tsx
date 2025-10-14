import * as React from "react";
import { cn } from "@/lib/cn";
import { Label } from "./label";
import { CircleAlert } from "lucide-react";

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    label?: string;
    hint?: string;
    error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, label, hint, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    return (
        <div className="space-y-3">
            {label && <Label htmlFor={inputId}>{label}</Label>}

            <input
                id={inputId}
                ref={ref}
                aria-invalid={!!error || undefined}
                aria-describedby={describedBy}
                className={cn("w-full rounded-md bg-white px-6 py-4 outline-none transition", "placeholder:text-medium-gray", error ? "ring-2 ring-primary" : "focus-visible:ring-2 focus-visible:ring-medium-gray focus-visible:ring-offset-2", className)}
                {...props}
            />

            {/* hint o error */}
            {error ? (
                <div className="flex space-x-2">
                    <CircleAlert className="h-5 w-5 text-primary" />
                    <span
                        id={errorId}
                        className="text-sm text-primary font-semibold">
                        {error}
                    </span>
                </div>
            ) : hint ? (
                <p
                    id={hintId}
                    className="text-sm text-medium-gray">
                    {hint}
                </p>
            ) : null}
        </div>
    );
});
Input.displayName = "Input";
