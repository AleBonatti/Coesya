import * as React from "react";
import { cn } from "@/lib/cn";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    required?: boolean;
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, required = false, children, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn("block text-sm font-medium text-medium-gray", className)}
            {...props}>
            <span className="inline-flex items-center gap-0.5">
                {children}
                {required && <span className="text-primary">*</span>}
            </span>
        </label>
    );
});
Label.displayName = "Label";
