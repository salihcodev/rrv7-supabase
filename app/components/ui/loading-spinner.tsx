import * as React from "react";
import { cn } from "~/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "default" | "lg" | "xl";
    fullscreen?: boolean;
}

const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
};

export function LoadingSpinner({
    size = "default",
    fullscreen = false,
    className,
    ...props
}: LoadingSpinnerProps) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        if (fullscreen) {
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    {children}
                </div>
            );
        }
        return <>{children}</>;
    };

    return (
        <Wrapper>
            <div
                className={cn(
                    "flex items-center justify-center gap-2",
                    className
                )}
                {...props}
            >
                <Loader2
                    className={cn(
                        "animate-spin text-muted-foreground",
                        sizeClasses[size]
                    )}
                />
            </div>
        </Wrapper>
    );
}
