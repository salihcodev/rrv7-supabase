import * as React from "react";
import { useNavigation } from "react-router-dom";
import { LoadingSpinner } from "~/components/ui/loading-spinner";

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const LoadingContext = React.createContext<LoadingContextType | undefined>(
    undefined
);

export function useLoading() {
    const context = React.useContext(LoadingContext);
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [manualLoading, setManualLoading] = React.useState(false);
    const navigation = useNavigation();
    const isNavigating = navigation.state !== "idle";

    // Combine manual loading state with navigation state
    const isLoading = manualLoading || isNavigating;

    const value = React.useMemo(
        () => ({
            isLoading,
            setLoading: setManualLoading,
        }),
        [isLoading]
    );

    return (
        <LoadingContext.Provider value={value}>
            {children}
            {isLoading && <LoadingSpinner fullscreen size="lg" />}
        </LoadingContext.Provider>
    );
}
