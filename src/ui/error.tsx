import * as React from "react";
import { cn } from "@/lib/cn";

export type FieldErrorProps = React.HTMLAttributes<HTMLParagraphElement> & {
    id?: string;
};

export function Error({ className, id, children, ...props }: FieldErrorProps) {
    return (
        <p
            id={id}
            role="alert"
            className={cn("text-sm text-red-600", className)}
            {...props}>
            {children}
        </p>
    );
}
